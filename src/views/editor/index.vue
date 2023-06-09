<template>
  <section class="editor">
    <div class="header flex-row main-between">
      <el-input class="title" clearable
                placeholder="文章标题"
                v-model="title" />

      <div class="write-operate flex-row">
        <el-button @click="save">保 存 草
          稿</el-button>
        <el-popover placement="top-start"
                    width="200" trigger="hover"
                    :content="switchTitle"
                    class="switch-btn">
          <svg-icon slot="reference"
                    icon-class="switch"
                    @click="toggleEditor" />
        </el-popover>

        <el-popover placement="top" width="560"
                    :appendToBody="false"
                    trigger="click" title="发布文章"
                    v-model="popoverVisible">
          <el-form label-position="left"
                   ref="elForm"
                   :model="formModel">
            <el-form-item label="分类" required
                          prop="categoryId"
                          :rules="[
                            { required: true, message: '请选择分类'}
                          ]">
              <div class="category-list">
                <label class="radio"
                       :class="[formModel.categoryId === articleCategory.categoryId ? 'selected' : '']"
                       v-for="(articleCategory, index) of articleCategoryList"
                       :key="index"
                       @click="selectArticleCategory(articleCategory)">
                  <span>{{ articleCategory.categoryName }}</span>
                </label>
              </div>
            </el-form-item>

            <el-form-item label="文章封面">
              <upload @change="handleChange"
                      :url="coverUrl">
                上传封面
              </upload>
            </el-form-item>

            <el-form-item label="编辑摘要" required
                          prop="description"
                          :rules="[
                            { required: true, message: '请填写摘要'}
                          ]">
              <el-input type="textarea"
                        resize="none"
                        maxlength="100" :rows="5"
                        show-word-limit
                        v-model="formModel.description" />
            </el-form-item>

            <el-form-item class="form-footer">
              <el-button
                         @click="onCancel">取消</el-button>
              <el-button type="primary"
                         :loading="loading"
                         @click="onSubmit">确定并发布</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     slot="reference">发
            布</el-button>
        </el-popover>
      </div>
    </div>

    <section class="content">
      <markdown-editor v-if="!editorType"
                       @addImage="addImage"
                       v-model="markdownVal" />

      <TinymceEditor v-if="editorType"
                     :uploadImage="uploadImage"
                     :uploadFile="uploadMedia"
                     v-model="richText" />
    </section>
  </section>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import TinymceEditor from '@/components/TinymceEditor'
import Upload from '@/components/Upload'

import { mapGetters } from 'vuex'

import { Uploader } from '@/utils/simple-upload'

import { addArticle, editArticle, getArticleByArticleId } from '@/apis'
import { uploadSingleFile } from '@/apis/upload'

export default {
  name: 'Editor',
  components: {
    MarkdownEditor,
    TinymceEditor,
    Upload
  },
  data () {
    return {
      loading: false,
      popoverVisible: false,
      title: '',
      switchTitle: '切换为富文本编辑器',
      markdownVal: '',
      richText: '',
      coverId: null,
      coverUrl: '',
      editorType: 0,
      formModel: {
        categoryId: null,
        description: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('business', ['articleCategoryList'])
  },
  watch: {
    editorType (newVal) {
      this.switchTitle = newVal ? '切换为Markdown编辑器' : '切换为富文本编辑器'
    },
    markdownVal (newVal) {
      console.log('markdownVal: ', newVal)
    },
    richText (newVal) {
      console.log('richText: ', newVal)
    },
  },
  asyncData ({ store }) {
    return store.dispatch('business/updateArticleCategoryList')
  },
  created () {
    this.editorType = isNaN(parseInt(this.$route.query.editorType)) ? 0 : parseInt(this.$route.query.editorType)
  },
  methods: {
    handleUploader (files, success, fail) {
      this.uploader = new Uploader({
        files: files,
        language: 'EN',
        beforeUpload: (uploader) => {
          console.log('回调uploader', uploader)

          for (let i = 0; i < uploader.fileList.length; i++) {
            uploader.fileList[i].start()
          }
        },
        uploading: (file) => {
          console.log('回调uploading', file)
        },
        uploadSuccess: (file) => {
          console.log('回调uploadSuccess', file)

          success(`${process.env.IMAGE_PREFIX}${file.url}`)
        },
        uploadFailed: function (file) {
          console.log('回调uploadFailed', file)
        }
      })
    },
    toggleEditor () {
      this.editorType = this.editorType === 0 ? 1 : 0

      console.log('editorType: ', this.editorType)

      this.$router.replace({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          editorType: this.editorType
        }
      })
    },
    save () { },
    onCancel () {
      this.popoverVisible = false
    },
    onSubmit () {
      this.$refs.elForm.validate((validated) => {
        if (validated) {
          this.loading = true
          this.addArticle().finally(() => {
            this.loading = false
            this.popoverVisible = false
          })
        }
      })
    },
    selectArticleCategory (articleCategory) {
      this.formModel.categoryId = articleCategory.categoryId
    },
    addImage (filename, image, callback) {
      console.log(filename, image)
      this.uploadSingleFile([image]).then(({ file }) => {
        callback(filename, file)
      })
    },
    uploadImage (file, success, fail) {
      console.log(file)

      this.handleUploader([file], success, fail)
    },
    uploadMedia (file, callback) {
      this.handleUploader([file], callback)
    },
    handleChange (files) {
      this.uploadSingleFile(files).then(({ file }) => {
        this.coverUrl = file.fileUrl
        this.coverId = file.id
      })
    },
    uploadSingleFile (files) {
      let formData = new FormData()
      formData.append('file', files[0])

      return new Promise((resolve, reject) => {
        uploadSingleFile(formData, this.userInfo.userId).then(({ code, data }) => {
          if (code === 200) {
            resolve(data)
          }
        })
      })
    },
    addArticle () {
      const params = {
        userId: this.userInfo.userId,
        type: this.editorType,
        title: this.title,
        description: this.formModel.description,
        content: this.editorType === 0 ? this.markdownVal : this.richText,
        coverId: this.coverId,
        categoryId: this.formModel.categoryId
      }

      return new Promise((resolve, reject) => {
        addArticle(params).then(({ code }) => {
          if (code === 200) {
            resolve()
          }
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  background-color: #fff;
  height: 100vh;
  .header {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    height: 40px;

    .title {
      ::v-deep .el-input__inner {
        border: none;
        font-size: 24px;
      }
    }

    .switch-btn {
      width: 80px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      .svg-icon {
        font-size: 16px;
      }
    }
  }

  .content {
    height: calc(100vh - 60px);
  }

  .el-form {
    border-top: 1px solid #e5e6eb;
    padding-top: 20px;
    .el-form-item {
      display: flex;
    }

    ::v-deep .el-form-item__label {
      width: 85px;
      line-height: 28px;
      text-align: right;
    }

    ::v-deep .el-form-item__content {
      flex: auto;
      line-height: 20px;
    }

    ::v-deep .el-form-item__error {
      padding-top: 0;
    }

    ::v-deep .el-textarea__inner {
      background-color: #fafafa;
    }

    ::v-deep .el-input__count {
      bottom: 8px;
      line-height: 1;
      color: rgb(238, 77, 56);
    }

    .el-textarea {
      margin-bottom: 10px;
    }

    .form-footer {
      text-align: right;
    }

    .category-list {
      height: 100%;
      .radio {
        display: inline-block;
        margin-right: 5px;
        margin-bottom: 10px;
        padding: 0 8px;
        font-size: 14px;
        line-height: 28px;
        width: 88px;
        height: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        border-radius: 2px;
        cursor: pointer;
        color: #86909c;
        background-color: #f4f5f5;
        &:hover {
          background-color: #e5e6eb;
        }
        &.selected {
          color: #1d7dfa;
          background-color: #e8f3ff;
        }
      }
    }
  }
}
</style>
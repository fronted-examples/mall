<template>
  <section class="upload">
    <label class="select-content flex-row secondary-center"
           v-if="!imgUrl" @change="onChange">
      <input class="upload-input" type="file" />
      <div class="content-slot">
        <svg-icon icon-class="plus" />
        <span class="content-txt">
          <slot></slot>
        </span>
      </div>
    </label>
    <div class="preview-content" v-else>
      <img class="preview-image"
           :src="`${prefix}${imgUrl}`" />
      <svg-icon icon-class="delete-fill"
                @click="onDelete" />
    </div>
    <label class="tip-txt">
      <slot name="footer">
        {{ tip }}
      </slot>
    </label>
  </section>
</template>

<script>
export default {
  name: 'Upload',
  props: {
    prefix: {
      type: String,
      default: process.env.IMAGE_PREFIX
    },
    url: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '建议尺寸：1303*734px'
    }
  },
  data () {
    return {
      imgUrl: this.url
    }
  },
  watch: {
    url: {
      handler (newVal) {
        this.imgUrl = newVal
      },
      immediate: true
    }
  },
  methods: {
    onChange (e) {
      console.log('onChange: ', e)
      let files = e.target.files

      this.$emit('change', files, e)
    },
    onDelete () {
      this.imgUrl = ''
      this.$emit('delete', this.imgUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  display: inline-flex;
  flex-direction: column;
  .select-content,
  .preview-content {
    width: 160px;
    height: 86px;
    background-color: #fafafa;
    border: 1px dashed #e5e6eb;
    margin-bottom: 16px;
    position: relative;
    .upload-input {
      display: none;
    }
    .content-slot {
      cursor: pointer;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
    }
    .content-txt {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #86909c;
      margin-top: 10px;
    }
  }
  .tip-txt {
    line-height: 1;
    text-align: center;
    font-size: 14px;
    white-space: nowrap;
    color: #909090;
  }

  .preview-content {
    .preview-image {
      width: 100%;
      height: 100%;
    }
    .svg-icon {
      border: 1px solid #121212;
      border-radius: 2px;
      padding: 4px 6px;
      font-size: 12px;
      color: #121212;
      background-color: buttonface;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 9;
      cursor: pointer;
      &:hover {
        background-color: #dcdcdc;
        border-color: #dcdcdc;
      }
    }
  }
}
</style>
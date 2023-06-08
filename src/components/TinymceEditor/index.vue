<template>
  <editor class="tinymce-editor" v-if="!reloading"
          v-model="richText" :init="init"
          :disabled="disabled" @onClick="onClick">
  </editor>
</template>

<script>

import Editor from '@tinymce/tinymce-vue'
import { getTimeId } from '@/utils/utils.js'

let tinymce
if (process.env.VUE_ENV === 'client') {
  tinymce = require('tinymce/tinymce')
  require('tinymce/themes/silver/theme')
  require('tinymce/icons/default')

  require('~/static/tinymce/plugins/image')
  require('~/static/tinymce/plugins/link')
  require('~/static/tinymce/plugins/media')
  require('~/static/tinymce/plugins/table')
  require('~/static/tinymce/plugins/lists')
  require('~/static/tinymce/plugins/contextmenu')
  require('~/static/tinymce/plugins/wordcount')
  require('~/static/tinymce/plugins/colorpicker')
  require('~/static/tinymce/plugins/textcolor')
  require('~/static/tinymce/plugins/fullscreen')
  require('~/static/tinymce/plugins/code')
  require('~/static/tinymce/plugins/imagetools')
  require('~/static/tinymce/plugins/paste')
  require('~/static/tinymce/plugins/emoticons')
  require('~/static/tinymce/plugins/emoticons/js/emojis')
  require('~/static/tinymce/plugins/importword')
  require('~/static/tinymce/plugins/lineheight')
  require('~/static/tinymce/plugins/letterspacing')
  require('~/static/tinymce/plugins/insertdatetime')
  require('~/static/tinymce/plugins/preview')
  require('~/static/tinymce/plugins/hr')
  require('~/static/tinymce/plugins/anchor')
  require('~/static/tinymce/plugins/pagebreak')
  require('~/static/tinymce/plugins/indent2em')
  require('~/static/tinymce/plugins/searchreplace')
  require('~/static/tinymce/plugins/directionality')
  require('~/static/tinymce/plugins/autolink')
}

export default {
  name: 'VEditor',
  components: {
    Editor,
  },
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
    uploadImage: {
      type: Function,
      require: false,
      default: function () { }
    },
    uploadFile: {
      type: Function,
      require: false,
      default: function () { }
    },
    triggerChange: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fonts: {
      type: String,
      default: `
          微软雅黑=微软雅黑;
          宋体=宋体;
          黑体=黑体;
          仿宋=仿宋;
          楷体=楷体;
          隶书=隶书;
          幼圆=幼圆;
          Andale Mono=andale mono,times;
          Arial=arial, helvetica, sans-serif;
          Arial Black=arial black, avant garde;
          Book Antiqua=book antiqua,palatino;
          Comic Sans MS=comic sans ms,sans-serif;
          Courier New=courier new,courier;
          Georgia=georgia,palatino;
          Helvetica=helvetica;
          Impact=impact,chicago;
          Symbol=symbol;
          Tahoma=tahoma,arial,helvetica,sans-serif;
          Terminal=terminal,monaco;
          Times New Roman=times new roman,times;
          Trebuchet MS=trebuchet ms,geneva;
          Verdana=verdana,geneva;
          Webdings=webdings;
          Wingdings=wingdings,zapf dingbats`,
    },
    plugins: {
      type: [String, Array],
      default:
        'anchor link lists image imagetools media autolink directionality hr searchreplace pagebreak indent2em importword code table wordcount paste emoticons fullscreen lineheight letterspacing insertdatetime preview'
    },
    toolbar: {
      type: [String, Array],
      default:
        `| undo redo
         | importword preview fullscreen searchreplace code
         | paste anchor hr pagebreak
         | fontsizeselect
         | fontselect
         | formatselect
         | ltr rtl
         | subscript superscript
         | emoticons
         | insertdatetime
         | forecolor backcolor bold italic underline strikethrough
         | lineheight letterspacing
         | alignleft aligncenter alignright alignjustify
         | bullist numlist outdent indent indent2em
         | image media table
         | removeformat blockquote link unlink`,
      branding: false,
    },
    width: {
      type: Number | String,
      default: 'auto',
    },
    height: {
      type: [String, Number],
      default: '95%',
    },
  },
  data () {
    return {
      //初始化配置
      init: {
        width: this.width,
        height: this.height,
        font_formats: this.fonts,
        plugins: this.plugins,
        toolbar: this.toolbar,
        draggable_modal: true,
        menubar: false,
        auto_focus: true,
        branding: false,
        image_advtab: true,
        statusbar: true, // 隐藏底部状态栏
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        placeholder: '请输入正文...',
        selector: 'tinymce-editor',
        cache_suffix: `?v=${new Date().getTime()}`,
        language: 'zh_CN',
        language_url: '/dist/static/tinymce/langs/zh_CN.js',
        skin_url: '/dist/static/tinymce/skins/ui/oxide',
        content_css: '/dist/static/tinymce/skins/content/default/content.min.css',
        content_security_policy: `worker-src blob:;
                                  child-src blob: gap:;
                                  img-src * 'self' blob: data:;
                                  default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: gap: content:"`,
        content_style: `
          .mce-content-body {
            width: ${this.width};
            overflow-x: hidden;
          }
          .mce-content-body table {
            width: auto !important;
          }
          html, body                { height:100%; }
          img                       { max-width:100%; height:auto; }
          a                         { text-decoration: none; }
          iframe                    { width: 100%; }
          p                         { line-height:1.6; margin: 0px; }
          table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
          .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
          ul,ol                     { list-style-position:inside; }
        `,
        lineheight_val: '1 1.1 1.2 1.3 1.4 1.5 2', // 非官方插件用法
        fontsize_formats: '5px 5.5px 6.5px 7.5px 8px 9px 10px 10.5px 11px 12px 14px 16px 18px 20px 24px 26px 28px 36px 48px 56px 72px',
        // file_picker_types: 'file image media',
        // 监听tinymce初始化完成事件
        setup: (editor) => {
          editor.on('init', (e) => {
            editor.setContent(this.richText)
          })
        },
        // 监听input与change事件，实时更新value
        init_instance_callback: (editor) => {
          editor.on('input', (e) => {
            this.$emit('input', e.target.innerHTML)
          })
          editor.on('change', (e) => {
            console.log('change: ', e)
            this.$emit('input', e.level.content)
          })
        },
        //预防xss攻击，同时不希望用户直接粘贴进来一些富文本,在你的 init 里面，添加以下属性
        paste_preprocess: (pl, o) => {
          // o.content = $stripTags(o.content, 'sup,sub')
          o.content = o.content
        },
        images_upload_handler: (blobInfo, success, fail) => {
          let file = blobInfo.blob()

          if (Object.prototype.toString.call(blobInfo.blob()) === '[object Blob]') {
            console.log('file: ', this.blobtoFile(file))
            file = this.blobtoFile(file)
          }

          this.uploadImage(file, success, fail)
        },
        file_picker_callback: (callback, value, meta) => {
          // Provide file and text for the link dialog
          let input = document.createElement('input')
          input.setAttribute('type', 'file')
          if (meta.filetype == 'file') {
            // callback('mypage.html', { text: 'My text' })
          }
          // Provide image and alt text for the image dialog
          if (meta.filetype == 'image') {
            // callback('myimage.jpg', { alt: 'My alt text' })
          }
          // Provide alternative source and posted for the media dialog
          if (meta.filetype == 'media') {
            input.setAttribute('accept', 'video/mp4')
            input.click()

            input.onchange = (e) => {
              let file = e.target.files[0]
              let ext = file.name.split('.')[1]
              if (
                ext !== 'mp4' &&
                ext !== 'AVI' &&
                ext !== 'mov' &&
                ext !== 'FLV' &&
                ext !== 'rmvb'
              ) {
                return this.$message.error('上传资源只能是 AVI/mov/rmvb/xlsx/FLV/mp4 格式的视频!')
              }

              this.uploadFile(file, callback, value)
            }
            // callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' })
          }
        },
        video_template_callback: data => {
          return `<video width="300" height="250" controls="controls" src=${data.source} />`
        },
        // media_url_resolver: (data, resolve) => {
        //   try {
        //     let videoUri = encodeURI(data.url)
        //     let embedHtml = `<p>
        //           <span
        //             data-mce-selected="1"
        //             data-mce-object="video"
        //             data-mce-p-controls="controls"
        //             data-mce-p-controlslist="nodownload"
        //             data-mce-p-allowfullscreen="true"
        //             data-mce-p-src=${videoUri}
        //             data-mce-p-width="300"
        //             data-mce-p-height="200"
        //             style="width:300px;height:200px;display:inline-block">
        //             <video src=${data.url} width="300" height="200" controls="controls" controlslist="nodownload"></video>
        //           </span>
        //         </p>
        //         <p style="text-align: left;"></p>`
        //     resolve({ html: embedHtml })
        //   } catch (e) {
        //     resolve({ html: '' })
        //   }
        // }
      },
      richText: this.value,
      reloading: false
    }
  },
  mounted () {
  },
  methods: {
    reload () {
      this.reloading = true
      this.$nextTick(() => (this.reloading = false))
    },
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear () {
      this.richText = ''
    },
    blobtoFile (blob) {
      const { type } = blob
      const filename = `${getTimeId(8, 12)}.${type.split('/')[1]}`
      return new File([blob], filename, { type })
    }//调用上面的dataURLtoBlob方法生成测试的dataURLvar blob = dataURLtoBlob('data:image/png;base64,XXXXXXXX');console.log(blobtoFile(blob))
  }
}
</script>
<style lang="scss" scoped>
.mce-object {
  height: 150px;
}
</style>

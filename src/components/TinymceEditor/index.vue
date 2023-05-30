<template>
  <div class="tinymce-editor">
    <editor v-if="!reloading" v-model="richText"
            :init="init" :disabled="disabled"
            @onClick="onClick"></editor>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

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
}

// import { getFileAccessHttpUrl } from '~/assets/js/utils/tools'

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
    triggerChange: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default:
        'link lists image imagetools importword media code table textcolor wordcount contextmenu paste colorpicker emoticons fullscreen lineheight letterspacing insertdatetime'
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo | fullscreen | importword | fontsizeselect | fontselect | emoticons | insertdatetime | bold italic underline strikethrough | lineheight letterspacing | formatselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image imagetools_toolbar media table | removeformat | forecolor backcolor | blockquote | link unlink code',
      branding: false,
    },
    width: {
      type: Number | String,
      default: 'auto',
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  data () {
    return {
      //初始化配置
      init: {
        language_url: '/dist/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/dist/static/tinymce/skins/ui/oxide',
        width: this.width,
        height: this.height,
        object_resizing: false,
        selector: 'tinymce-editor',
        content_css: '/dist/static/tinymce/skins/ui/oxide/content.min.css',
        content_style: `
          .mce-content-body {
            width: ${this.width};
            overflow-x: hidden;
          }
          .mce-content-body table {
            width: auto !important;
          }
          html, body                { height:100%; }
          img                       { max-width:100%; display:block;height:auto; }
          a                         { text-decoration: none; }
          iframe                    { width: 100%; }
          p                         { line-height:1.6; margin: 0px; }
          table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
          .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
          ul,ol                     { list-style-position:inside; }
        `,
        fontsize_formats: '5px 5.5px 6.5px 7.5px 8px 9px 10px 10.5px 11px 12px 14px 16px 18px 20px 24px 26px 28px 36px 48px 56px 72px',
        font_formats: `
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
        file_picker_types: 'image media',
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        toolbar_drawer: false,
        statusbar: true, // 隐藏底部状态栏
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        // 监听tinymce初始化完成事件
        setup: (editor) => {
          editor.on('init', (e) => {
            editor.setContent(this.richText)
          })
        },
        //预防xss攻击，同时不希望用户直接粘贴进来一些富文本,在你的 init 里面，添加以下属性
        paste_preprocess: (pl, o) => {
          // o.content = $stripTags(o.content, 'sup,sub')
          o.content = o.content
        },
        images_upload_handler: (blobInfo, success, fail) => {
          var xhr, formData
          var file = blobInfo.blob()//转化为易于理解的file对象
          xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', '/demo/upimg.php')
          xhr.onload = function () {
            var json
            if (xhr.status != 200) {
              fail('HTTP Error: ' + xhr.status)
              return
            }
            json = JSON.parse(xhr.responseText)
            if (!json || typeof json.location != 'string') {
              fail('Invalid JSON: ' + xhr.responseText)
              return
            }
            success(json.location)
          }
          formData = new FormData()
          formData.append('file', file, file.name)//此处与源文档不一样
          xhr.send(formData)
        },
        file_picker_callback: function (callback, value, meta) {
          // Provide file and text for the link dialog
          if (meta.filetype == 'file') {
            callback('mypage.html', { text: 'My text' })
          }
          // Provide image and alt text for the image dialog
          if (meta.filetype == 'image') {
            callback('myimage.jpg', { alt: 'My alt text' })
          }
          // Provide alternative source and posted for the media dialog
          if (meta.filetype == 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' })
          }
        },
      },
      richText: this.value,
      reloading: false,
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
  },
  watch: {
    // value (newValue) {
    //   this.myValue = newValue == null ? '' : newValue
    // },
    richText (newValue) {
      if (this.triggerChange) {
        this.$emit('change', newValue)
      } else {
        this.$emit('input', newValue)
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>

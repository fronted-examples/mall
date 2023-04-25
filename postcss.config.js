/**
 * 要想postcss.config.js被自动引入，必须在配置文件里配置postcss-loader
 * 同时postcss-loader的版本必须和webpack的版本保持一致
 */
module.exports = {    
  "plugins": {        
      "postcss-px2rem": {     
            //UI图片的基准值 750px就是75,640px就是64,默认为75       
            remUnit: 192,        
            remPrecision: 6, //准换成rem后的小数点精确数位 默认为6      
            baseDpr: 2, //基准device pixel ratio值 默认为2      
            //当然npm上还有很多options 按需求配置      
      },         
      // to edit target browsers: use "browserslist" field in package.json   
     //一般package.json中会有browserslist的配置,这里直接写出来就好        
     "autoprefixer": {}    
  }
}


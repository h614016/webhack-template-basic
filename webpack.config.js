const path = require('path') // path : node.js에서 기본적으로 제공하는 전역 모듈
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './main.js', // 파일을 읽어들이기 시작하는 진입점 설정, 보통 js파일로 한다.
  output: { // 결과물(번들)을 반환하는 설정
    path: path.resolve(__dirname, 'dist'), // node.js 방식이라서 상대경로가 아닌 절대경로 지정이 필요
    // resolve : 1, 2번 인수로 지정된 각 경로를 합친다.
    // __dirname :  node.js 환경의 전역변수, 현재 파일이 있는 경로
    // path: path.resolve(__dirname, 'dist') >> 현재 파일이 있는 경로의 dist 폴더에 저장한다는 의미
    filename: 'main.js', // entry 파일과 동일하게 설정
    clean: true // 이전에 생성했던 파일을 삭제
    // path와 filename이 없어도 정상적으로 동작 가능
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        // 정규표현식 // 안에 마침표 \.(이스케이프 문자인 마침표는 임의의 한 문자를 의미하므로, 진짜 마침표를 의미하기 위해 백슬래시 사용)
        // $ : $ 앞에 있는 문구로 끝나는 것을 찾는다.
        // 결과적으로 .css로 끝나는 파일을 찾는다.
        use: [
          'style-loader', // 나중에 해석 : css-loader에서 해석된 css를 html의 style 태그에 삽입하는 역할
          'css-loader' // 먼저 해석 : JS에서 CSS를 해석
        ]
      }
    ]
  },

  plugins: [ // 번들링 후 결과물의 처리 방식 등 다양한 플러그인을 설정
    new HtmlPlugin({
      template : './index.html' // 번들링 후 index.html 파일도 함께 dist 폴더로 저장한다는 의미
    }),
    new CopyPlugin({
      patterns: [
        {from : 'static'} // static 폴더 안의 내용부터 복사해서 dist 폴더로 저장한다
      ]
    })
  ],

  devServer: {
    host : 'localhost'
  }
}
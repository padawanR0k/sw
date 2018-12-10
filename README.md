# create-react-app 서비스워커등록

## 1. eject를 하여 webpack 설정파일이 있을 경우
`create-react-app`에 서비스워커 등록을 도와주는 `sw-precache-webpack-plugin`가 기본 탑재돼있음.

`index.tsx`
```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import { BrowserRouter, Switch } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker'; 해당 주석을 풀기만 하면됨
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>
  ,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();  해당 주석을 풀기만 하면됨
```


`webpack.config.prod.js`에는 `SWPrecacheWebpackPlugin`가 이미 세팅되어있다.

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');
...

/* 서비스워커에서 사용할 manifest파일에서 캐싱할 파일들 웹팩 해시값 달아서 service-worker.js를 만든다 */
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js', // 서비스 워커로 사용할(to be)이름
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message);
      },
      minify: true,
      navigateFallback: publicUrl + '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    /* /src/static/assets에 있는 파일들을 build/static으로 옮겨서 manifest에서 사용한다 */
    new CopyWebpackPlugin([
      { from: './src/static/assets/', to: 'static/' },
    ], {
      copyUnmodified: true
    }),
```


---



## 2. eject를 안한 경우
루트에 `sw-precache-config.js` 파일 생성

```js
module.exports = {
    handleFetch: false,
    importScripts: (['./service-worker-custom.js']), // 사용할 서비스워커 파일 /public 폴더에 위치시킴
    staticFileGlobs: [ // 캐싱할 파일 설정
        'build/static/css/**.css',
        'build/static/js/**.js',
        'build/static/media/**.jpg',
        'build/static/media/**.svg',
    ],
    stripPrefix: 'build/',
    swFilePath: './build/service-worker.js',
}
```



## 3. 주의할점

1. sw-precache는 2mb이하의 파일만 캐시한다. 하지만  MaximumFileSizeToCacheInBytes 세팅으로 조절이 가능하다.
2. 서비스워커는 url을 통해 자원을 캐시한다.


## 참고링크
[Progressive Web App (feat. React, Django)](https://www.slideshare.net/jayjin0427/progressive-web-app-feat-react-django-82499585)
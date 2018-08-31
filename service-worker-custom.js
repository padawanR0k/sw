importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

var CACHE_NAME = '캐시-스토리지1';
// 캐시하고 싶은 리소스
var urlsToCache = [
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    // '/public/css/font-awesome.min.css'
];

// 서비스워커가 설치될 때
self.addEventListener('install', event => {
    // 캐시 등록 이벤트가 끝날 때까지 기다려
    event.waitUntil(
        // '캐시-스토리지1'을 연다.
        // @return {Promise} 연결된 Cache Database를 반환한다.
        caches.open(CACHE_NAME)
            .then(cache => {
                // console.log('캐시 디비와 연결됨');
                // addAll 메소드로 내가 캐싱할 리소스를 다 넣어주자.
                return cache.addAll(urlsToCache);
            })
    );
});
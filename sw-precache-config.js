module.exports = {
    handleFetch: false,
    importScripts: (['./service-worker-custom.js']),
    staticFileGlobs: [
        'build/static/css/**.css',
        'build/static/js/**.js',
        'build/static/media/**.jpg',
        'build/static/media/**.svg',
        'https://use.fontawesome.com/releases/v5.3.1/css/all.css',

    ],
    stripPrefix: 'build/',
    swFilePath: './build/service-worker.js',
}
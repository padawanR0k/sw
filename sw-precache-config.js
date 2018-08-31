module.exports = {
    handleFetch: false,
    importScripts: (['./service-worker-custom.js']),
    staticFileGlobs: [
        'build/static/css/**.css',
        'build/static/js/**.js',
        'build/static/media/**.jpg',
        'build/static/media/**.svg',

    ],
    stripPrefix: 'build/',
    swFilePath: './build/service-worker.js',
}
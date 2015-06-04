/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

     //dist path is relative to gulpfile.js root dir
    dist:'./dist',
    assets:"./dist/assets",
    css:'./dist/css',
    js:'./dist/js',
    img:"./dist/img",
    fonts:"./dist/assets/fonts",


    app_files: {
        js: [
            './src/**/*.js'
            ],
        less: ['./src/less/app.less'],
        partials: './src/app/**/*.tpl.html',
        index:'./src/index.html',
        assets: ['!./src/assets/img/*','!./src/assets/fonts/*','./src/assets/**/*'],
        img:'./src/assets/img/**/*'
    },

  
    vendor: {
        js: [
            './vendor/jquery/dist/jquery.min.js',
            './vendor/angular/angular.js',
            './vendor/angular-ui-router/release/angular-ui-router.min.js',
            './vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './vendor/angular-bootstrap/ui-bootstrap.min.js',           
        ],
        css: [
        ],
        fonts:['./vendor/bootstrap/fonts/*']
    }
};

//npm modules
var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    jshint = require("gulp-jshint"),
    del = require("del"),
    less = require("gulp-less"),
    minify = require('gulp-minify-css'),
    html2js = require("gulp-ng-html2js"),
    minifyHtml = require("gulp-minify-html"),
    concat = require("gulp-concat"),


    /* Note: 
        yargs and gulp-if allows us to do pass in flags and evaluate them when we run gulp. This helps us decide whether or not to 
        minify/uglify something or have an expanded file.
        Try gulp vs gulp --production to see.
    */

    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    /*Note: 
        gulp-flatten copies files WITHOUT perserving directory path
        gulp-copy copies files while preserving directory path

    */
    //copy = require("gulp-copy"),
    flatten = require("gulp-flatten"),

    //other requires
    app = require("./build.config.js");

gulp.task('default', function() {

    //Remove old dist dir
    //set force option so it can delete outside the parent dir
    del([app.dist], {
        "force": true
    }, function() {

        //Copy index.html   
        gulp.src(app.app_files.index)
            .pipe(flatten())
            .pipe(gulp.dest(app.dist));

        //lint,uglify and copy files to dist/js
        gulp.src(app.app_files.js)
            .pipe(jshint({
                forin: true,
                browser: true,
                jquery: true
            }))
            .pipe(jshint.reporter('default'))
            .pipe(gulpif(!argv.dev, uglify()))
            .pipe(concat('app.js'))
            .pipe(gulp.dest(app.js));

        //compile less files
        gulp.src(app.app_files.less)
            .pipe(less())
            .pipe(gulpif(!argv.dev, minify()))
            .pipe(concat('app.css'))
            .pipe(gulp.dest(app.css));


        //copy js vendor js files
        gulp.src(app.vendor.js)
            .pipe(flatten())
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest(app.js));

        //copy vendor css files
        gulp.src(app.vendor.css)
            .pipe(flatten())
            .pipe(gulp.dest(app.css));

        //Copy assets   
        gulp.src(app.app_files.assets)
            .pipe(flatten())
            .pipe(gulp.dest(app.assets));

         //Copy fonts   
        gulp.src(app.vendor.fonts)
            .pipe(flatten())
            .pipe(gulp.dest(app.fonts));

        //Copy images   
        gulp.src(app.app_files.img)
            .pipe(flatten())
            .pipe(gulp.dest(app.img));
            

        //compile partials
        gulp.src(app.app_files.partials)
            .pipe(
                gulpif(!argv.dev, minifyHtml({
                    empty: true,
                    spare: true,
                    quotes: true
                }))

            )
            .pipe(html2js({
                moduleName: "templates-app",
                prefix: "partials/"
            }))
            .pipe(concat('partials.js'))
            .pipe(gulp.dest(app.js));



    }); //end del callback




}); //end task

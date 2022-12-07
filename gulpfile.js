const gulp = require('gulp');

// pugのコンパイル用
const pug = require('gulp-pug');

// gulpコマンドでローカルサーバを立ち上げる用
const webserver = require('gulp-webserver');

// sassのコンパイル用
const sass = require("gulp-sass")(require("sass"));


gulp.task( 'pug', function() {
	return gulp
		.src([ 'src/pug/**/*.pug', '!src/pug/**/_*.pug' ])
		.pipe(pug({
			pretty: true
		}))
		.pipe( gulp.dest( 'dist/' ) );
});

gulp.task( "default", function() {
    return gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
 
gulp.task("sass", function(){
    return gulp
        .src([ 'src/sass/**/*.scss', '!src/sass/**/_*.scss' ])
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }))
        .pipe( gulp.dest( 'dist/css' ) );
});

gulp.task("watch", function(callback){
    gulp.watch("sass/**/*.scss", gulp.series(["sass"]))
    gulp.watch("src/**/*.pug", gulp.series(["pug"]))
    callback();
});
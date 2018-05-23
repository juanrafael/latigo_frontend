const gulp 				= require('gulp');
const sass 				= require('gulp-sass');
//const pug 				= require('gulp-pug');
const autoprefixer 	= require('gulp-autoprefixer');
const browserSync		= require('browser-sync').create();

gulp.task('sass', () =>
{
	return gulp.src(['./src/sass/app.scss','./node_modules/materialize-css/sass/materialize.scss'])
		.pipe(sass({outputStyle: 'expanded'	/* compressed */}))
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(browserSync.reload({
			stream : true
		}));
});

gulp.task('js', () =>
{
	return gulp.src('./node_modules/materialize-css/dist/js/materialize.js')
		.pipe(gulp.dest('./dist/js/'))
		;
});

gulp.task('font-awesome', () =>
{
	return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('fonts', () =>
{
	return gulp.src('./node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('browserSync', () =>
{
	browserSync.init({
		server: {
			baseDir: './dist/'
		},
	});
});

gulp.task('watch', ['browserSync', 'sass'], () =>
{
	gulp.watch('./src/sass/*.scss', ['sass']);
	//refresca el navegador cuando son archivos html y js
	gulp.watch('./dist/*.html', browserSync.reload);
	gulp.watch('./dist/js/*.js', browserSync.reload);
});

gulp.task('default', ['watch', 'font-awesome', 'fonts', 'js']);
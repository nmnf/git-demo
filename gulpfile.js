//在gulpfile.js中载入gulp包
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var htmlmin = require('gulp-htmlmin');
//less编译，压缩，合并
gulp.task('style',function(){
	//此处实在执行style任务时自动执行的操作
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(reload({
		stream:true
	}));
});
//js合并，压缩，混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(reload({
		stream:true
	}));
});
//转移图片
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(reload({
		stream:true
	}));
});
//处理html文档
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(reload({
		stream:true
	}));
});
//启动WEB服务器，并监视文件变化
gulp.task('serve',function(){
	browserSync({
		server:{
			baseDir:['dist']
		}
	});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['sript']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});
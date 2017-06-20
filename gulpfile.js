var gulp = require('gulp');
var path = require('path');


var nodePath = path.join('node_modules');
var bootstrapPath = path.join(nodePath , 'bootstrap', 'dist');
var fontawesomePath = path.join(nodePath , 'font-awesome');
var ioniconsPath = path.join(nodePath , 'ionicons' , 'dist');
var adminLtePath = path.join(nodePath , 'admin-lte' , 'dist');

var bootstrapCssPath = path.join(bootstrapPath , 'css' ,'*.*');
var bootstrapFontsPath = path.join(bootstrapPath , 'fonts' ,'*.*');
var fontawesomeCssPath = path.join(fontawesomePath , 'css' ,'*.*');
var fontawesomeFontsPath = path.join(fontawesomePath , 'fonts' ,'*.*');
var ioniconsCssPath = path.join(ioniconsPath , 'css' ,'*.*');
var ioniconsFontsPath = path.join(ioniconsPath , 'fonts' ,'*.*');
var adminCssPath = path.join(adminLtePath , 'css' ,'**/*.*');
var adminImgPath = path.join(adminLtePath , 'img');

var srcCss = [bootstrapCssPath , fontawesomeCssPath , ioniconsCssPath ,adminCssPath];
var srcFonts = [bootstrapFontsPath , fontawesomeFontsPath , ioniconsFontsPath];
var imgs = ['boxed-bg.jpg' , 'boxed-bg.png' , 'default-50x50.gif' ,'icons.png'];
var dest = path.join('src' , 'assets');
var destCss = path.join(dest , 'css');
var destFonts = path.join(dest , 'fonts');
var destImg = path.join(dest, 'img');

var srcImgPath = function (imgs , adminImgPath){
    var srcImgs = [];
    imgs.forEach(function(img){
        srcImgs.push(path.join(adminImgPath , img));
    });
    return srcImgs;
};

gulp.task('css', function() {
  srcImg = srcImgPath(imgs ,adminImgPath);
  gulp.src(srcCss).pipe(gulp.dest(destCss));
  gulp.src(srcFonts).pipe(gulp.dest(destFonts));
  gulp.src(srcImg).pipe(gulp.dest(destImg));
});
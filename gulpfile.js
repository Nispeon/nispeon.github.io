const { stc, dest, src, symlink, parallel, watch } = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//browser
function browserS(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    watch('*.html').on('change', browserSync.reload);
}

// Sass (scss) to Css
function sassComp(){
    return src('./sass/style.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream());
}

//watch scss
function watcher(done){
    watch('./sass/', sassComp)
    browserSync.reload();
    done();
}


// Exports
module.exports = {
    sassComp,
    watcher,
    browser: parallel(browserS, watcher),
}
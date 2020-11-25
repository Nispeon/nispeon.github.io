const { stc, dest, src, symlink, parallel, watch } = require('gulp');
const del = require('del');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//browser
function browser(){
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
    watch('./sass/*.scss', sassComp)
    browserSync.reload();
    done();
}

//src + dest
function srcExemple(){
    return src('./index.html')
    .pipe(dest('dossier1'))
}

//symlink
function linkExemple(){
    return src('./index.html').pipe(symlink('link'))
}

//delete
function clean(){
    return del('dossier1')
}

//parallel 1
function css(log){
    console.log('Tâche 1, exemple de css')
    log();
}

//parallel 2
function sass(log){
    console.log('Tâche 2, exemple de compilation')
    log();
}

// Exports
module.exports = {
    srcExemple,
    linkExemple,
    clean,
    sassComp,
    watcher,
    browser: parallel(browser, watcher),
    build: parallel(css, sass)
}
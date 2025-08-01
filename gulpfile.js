import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import { deleteAsync } from 'del';
import fileInclude from 'gulp-file-include';
import mozjpeg from 'imagemin-mozjpeg'; // Оптимизация JPEG
import pngquant from 'imagemin-pngquant'; // Оптимизация PNG
import gifsicle from 'imagemin-gifsicle'; // Оптимизация GIF
import svgo from 'imagemin-svgo'; // Оптимизация SVG
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';




const sass = gulpSass(dartSass);
const bs = browserSync.create();


// Пути к файлам
const paths = {
  fonts: {
    src: 'src/fonts/**/*.{ttf,woff,woff2}', // Форматы шрифтов
    dest: 'dist/fonts/'
  },

  styles: {
    src: 'src/**/*.{css,scss}',
    dest: 'dist/style/',
    outputName: 'style-min.css'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/img/**/*.{jpg,jpeg,png,gif,svg}', // Все форматы
    dest: 'dist/img/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  components: {
    src: 'src/template/**/*.html' // Папка с частями HTML (header, footer и т.д.)
  }
};

// Очистка папки dist
function clean() {
  return deleteAsync(['dist/*']);
}

// Компиляция SCSS в CSS + автопрефиксы + минификация
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(paths.styles.outputName)) // Объединение в style-min.css
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream());
}

// Копирование шрифтов
function fonts() {
  gulp.src(paths.fonts.src, { encoding: false, removeBOM: false })
    .pipe(ttf2woff())
    .pipe(gulp.dest(paths.fonts.dest))


  return gulp.src(paths.fonts.src, { encoding: false, removeBOM: false })
    .pipe(ttf2woff2())
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(bs.stream());
}

// Объединение и минификация JS
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(concat('main-min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(bs.stream());
}

// Оптимизация изображений
function images() {
  return gulp.src(paths.images.src, { encoding: false })
    .pipe(imagemin([
      mozjpeg({ quality: 80 }), // Было 80 → стало 85 (менее агрессивно)
      pngquant({ quality: [0.6, 0.8] }), // Было [0.6, 0.8] → стало [0.7, 0.9]
      gifsicle({ optimizationLevel: 1 }), // Меньше сжатие для GIF
      svgo({
        plugins: [
          { name: 'removeViewBox', active: false }, // Не удалять viewBox
        ]
      }) // Не удалять viewBox у SVG
    ], {
      verbose: true // Показывает детали оптимизации
    }))
    .on('error', error => {
      console.error('Image optimization error:', error);
    })
    .pipe(gulp.dest(paths.images.dest))
    .pipe(bs.stream());
}


// Сборка HTML с вставкой компонентов (gulp-file-include)
function html() {
  return gulp.src(paths.html.src)
    .pipe(fileInclude({
      prefix: '@@', // Префикс для вставки (например, @@include('header.html'))
      basepath: '@file' // Относительные пути от текущего файла
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(bs.stream());
}

// Локальный сервер и отслеживание изменений
function serve() {
  bs.init({
    server: {
      baseDir: './dist'
    }
  });


  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.fonts.src, fonts);
  gulp.watch(paths.images.src, images);
  gulp.watch([paths.html.src, paths.components.src], html);
  gulp.watch(paths.html.src).on('change', bs.reload);
}


// Основные задачи
const build = gulp.series(clean, gulp.parallel(styles, scripts, images, fonts, html));
const dev = gulp.series(build, serve);

// Экспорт задач
export {
  clean,
  styles,
  scripts,
  images,
  fonts,
  html,
  build,
  serve as dev
};

export default dev;

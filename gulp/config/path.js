// получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
	build: {
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		images: `${buildFolder}/assets/images/`,
		fonts: `${buildFolder}/assets/fonts/`,
		files: `${buildFolder}/files/`,
		vendor: `${buildFolder}/vendor/`,
	},
	src: {
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/scss/style.scss`,
		js: `${srcFolder}/js/index.js`,
		images: `${srcFolder}/assets/images/**/*.{jpg,png,jpeg,gif,webp,ico}`,
		svg: `${srcFolder}/assets/images/**/*.svg`,
		files: `${srcFolder}/files/**/*.*`,
		vendor: `${srcFolder}/vendor/**/*.*`,
	},
	watch: {
		html: `${srcFolder}/**/*.html`,
		scss: `${srcFolder}/scss/**/*.scss`,
		js: `${srcFolder}/js/**/*.js`,
		images: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
		files: `${srcFolder}/files/**/*.*`,
		vendor: `${srcFolder}/vendor/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
}
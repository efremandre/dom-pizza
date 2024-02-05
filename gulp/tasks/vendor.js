export const vendor = () => {
	return app.gulp.src(app.path.src.vendor, {dot:true}).pipe(app.gulp.dest(app.path.build.vendor));
}
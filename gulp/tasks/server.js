export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}`,
		},
		notify: false,
		port: 3000,
		host: '192.168.1.35',
	})
}
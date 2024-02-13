'use strict'
export function showWorkTime() {
	const btn = document.querySelectorAll('.work-time')

	btn.forEach(el => {
		el.addEventListener('click', (e) => {
			const target = e.target
			const sowElement = target.querySelector('.work-time__description')

			if (sowElement) {
				sowElement.classList.toggle('_show')

				setTimeout(() => {
					if (sowElement.classList.contains('_show')) sowElement.classList.remove('_show')
				}, 5000)
			}
		})
	})
}
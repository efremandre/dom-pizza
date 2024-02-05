'use strict'
export function pressDawn() {
	const button = document.querySelector('.button-dawn')
	const fullscreen = document.querySelector('.hero')

	if (button) {
		const height = fullscreen.offsetHeight
		const getDawn = () => {
			window.scrollTo(pageXOffset, height)
		}

		button.addEventListener('click', getDawn)
	}
}
'use strict'

export function scrollHeader() {
	let screenWidth = screen.width
	const header = document.querySelector('[data-header]')
	const cart = document.querySelector('.cart')
	const hero = document.querySelector('.hero')

	if (header && hero && screenWidth > 839) {
		window.addEventListener('scroll', () => {
			if (window.pageYOffset < hero.offsetHeight) {
				// header.style.position = 'relative'
				header.classList.remove('_fix-bottom')
			} else {
				header.classList.add('_fix-bottom')
			}
		})
	}
}
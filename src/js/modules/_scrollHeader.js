'use strict'

export function scrollHeader() {
	let screenWidth = screen.width
	const header = document.querySelector('[data-header]')
	const cart = document.querySelector('.cart')
	const hero = document.querySelector('.hero')

	if (header && hero && screenWidth > 839) {
		window.addEventListener('scroll', () => {
			if (window.pageYOffset < hero.offsetHeight) {
				cart.classList.remove('_fix-bottom')
				cart.classList.add('_fix-top')
			} else {
				cart.classList.add('_fix-bottom')
				cart.classList.remove('_fix-top')
			}
		})
	}
}
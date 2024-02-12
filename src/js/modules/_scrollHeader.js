'use strict'

export function scrollHeader() {
	let lastScroll = 0
	let screenWidth = screen.width
	const header = document.querySelector('[data-header]')
	const logo = document.querySelector('[data-logo]')
	const hero = document.querySelector('.hero')

	if (header && hero && screenWidth > 639) {
		const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop
		const containHide = () => header.classList.contains('_hidden')
		window.addEventListener('scroll', () => {
			(window.pageYOffset < hero.offsetHeight) ? header.style.background = '' :
				header.style.background = '#202020'

			if (window.pageYOffset > hero.offsetHeight) {
				if (scrollPosition() > lastScroll && !containHide()) {
					header.classList.add('_hidden')
					logo.classList.add('_hidden')
				} else if (scrollPosition() < lastScroll && containHide()) {
					header.classList.remove('_hidden')
					logo.classList.remove('_hidden')
				}

				lastScroll = scrollPosition()
			}
		})

		header.addEventListener('mouseenter', () => {
			if (header.classList.contains('_hidden')) {
				header.classList.remove('_hidden')
				logo.classList.remove('_hidden')
			}
		})
	}
}
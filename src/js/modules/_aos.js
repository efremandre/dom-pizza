/// https://michalsnik.github.io/aos/

'use strict'
import AOS from 'aos'

export function aos() {
	AOS.init({
		duration: 800,
		anchorPlacement: 'top-bottom',
		once: true
	})
}
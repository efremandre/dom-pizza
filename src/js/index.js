import { showWorkTime } from './modules/_showWorkTime.js'
import { addToCart } from './modules/_addToCart.js'
import { disabledBtnForm } from './modules/_disabledBtnForm.js'
import { fancyapps } from './modules/_fancyapps.js'
import { sendForm } from './modules/_form.js'
import { hello } from './modules/_hello.js'
import { initSlider } from './modules/_initSlider.js'
import { modal } from './modules/_modal.js'
import { pressDawn } from './modules/_pressDawn.js'
import { pressUp } from './modules/_pressUp.js'
import { setColorBtn } from './modules/_setColorBtn.js'

hello()
showWorkTime()
setColorBtn()
addToCart()
modal()
initSlider()
fancyapps()
pressDawn()
pressUp()
disabledBtnForm()
sendForm()

$('.card__button-add').on('click', function () {
	var that = $(this).closest('.card').find('.card__image')
	var bascket = $(".cart")
	var w = that.width()

	that.clone()
		.css({
			'width': w,
			'position': 'absolute',
			'z-index': '9999',
			top: that.offset().top,
			left: that.offset().left
		})
		.appendTo("body")
		.animate({
			opacity: 0.05,
			left: bascket.offset()['left'],
			top: bascket.offset()['top'],
			width: 20
		}, 1000, function () {
			$(this).remove()
		})
})

document.addEventListener('DOMContentLoaded', function () {
	const menuLinks = document.querySelectorAll('.menu-navigation__link')

	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect()
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		)
	}

	function updateActiveLink() {
		menuLinks.forEach(link => {
			var sectionId = link.getAttribute('href').slice(1)
			var section = document.getElementById(sectionId)
			if (isElementInViewport(section)) {
				menuLinks.forEach(link => link.classList.remove('_active'))
				link.classList.add('_active')
			}
		})
	}

	window.addEventListener('scroll', updateActiveLink)
	updateActiveLink()
})
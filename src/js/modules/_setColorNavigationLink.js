'use strict'
export function setColorNavigationLink() {
	jQuery(window).scroll(function () {
		var $sections = $('.category')
		$sections.each(function (i, el) {
			var top = $(el).offset().top - 100
			var bottom = top + $(el).height()
			var scroll = $(window).scrollTop()
			var id = $(el).attr('id')
			if (scroll > top && scroll < bottom) {
				$('a._active').removeClass('_active')
				$('a[href="#' + id + '"]').addClass('_active')

			}
		})
	})

	$(".menu-navigation__link").on("click", "a", function (event) {
		// исключаем стандартную реакцию браузера
		event.preventDefault()

		// получем идентификатор блока из атрибута href
		var id = $(this).attr('href'),

			// находим высоту, на которой расположен блок
			top = $(id).offset().top

		// анимируем переход к блоку, время: 800 мс
		$('body,html').animate({ scrollTop: top }, 800)
	})

	// const links = document.querySelectorAll('.menu-navigation__link')

	// // Перебираем каждую ссылку
	// links.forEach(link => {
	// 	// Добавляем обработчик события клика
	// 	link.addEventListener('click', function (event) {

	// 		links.forEach(link => {
	// 			link.classList.remove('_active')
	// 		})

	// 		// Добавляем класс _active к нажатой ссылке
	// 		this.classList.add('_active')
	// 	})
	// })
}
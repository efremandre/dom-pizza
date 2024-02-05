'use strict'
export function sendForm() {
	document.addEventListener('DOMContentLoaded', () => {

		const form = document.querySelectorAll('.ajax')
		const formPreloaders = document.querySelectorAll('.form-preloader')
		const note = document.querySelectorAll('.form-callback')

		const formArr = Array.from(form)
		const formPreloader = Array.from(formPreloaders)
		const noteArr = Array.from(note)

		formArr.forEach((el) => {
			el.addEventListener('submit', formSend)
			async function formSend(e) {
				e.preventDefault()

				const formData = new FormData(el)

				const response = await fetch('../../vendor/send.php', {
					method: 'POST',
					body: formData,
				})

				formPreloader.forEach(el => el.classList.add('_preloader-active'))

				if (response.ok) {
					const result = await response.json()
					const mes = `<p>${result.message}</p>`

					el.reset()

					formPreloader.forEach(el => el.classList.remove('_preloader-active'))
					noteArr.forEach(el => {
						el.innerHTML = mes
						el.classList.add('_form-callback-active')
						setTimeout(() => {
							el.classList.remove('_form-callback-active')
						}, 2000)
					})
				} else {
					formPreloader.forEach(el => el.classList.remove('_preloader-active'))
					noteArr.forEach(el => {
						el.innerHTML = 'Что-то пошло не так и ничего не отправилось...'
						el.classList.add('_form-callback-active')
						setTimeout(() => {
							el.classList.remove('_form-callback-active')
						}, 2000)
					})
				}
			}
		})
	})

	const eventCalllback = (e) => {
		const el = e.target
		const clearVal = el.dataset.phoneClear
		const pattern = el.dataset.phonePattern
		const maskNumber = "+7(___) ___-__-__"
		const mask = pattern ? pattern : maskNumber
		let i = 0
		const def = mask.replace(/\D/g, "")
		let val = e.target.value.replace(/\D/g, "")

		if (clearVal !== 'false' && e.type === 'blur') {
			if (val.length < mask.match(/([\_\d])/g).length) {
				e.target.value = ''
				return
			}
		}

		if (def.length >= val.length) val = def
		e.target.value = mask.replace(/./g, (a) => {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		})
	}

	const phoneInputs = document.querySelectorAll('[data-phone-pattern]')
	for (let elem of phoneInputs) {
		for (let ev of ['input', 'blur', 'focus']) {
			elem.addEventListener(ev, eventCalllback)
		}
	}
}
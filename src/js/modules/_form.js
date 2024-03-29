'use strict'
export function sendForm() {
	document.addEventListener('DOMContentLoaded', () => {

		const forms = document.querySelectorAll('.ajax')
		const formPopupBodyOrder = document.querySelector('.modal-order__item-wrapper')
		const formPopupBodySuccess = document.querySelector('.messages-done')
		const formPopupBodyError = document.querySelector('.messages-error')
		const showTotlalQuantity = document.querySelector('.cart__current')
		const modalTotalSumm = document.querySelectorAll('.form__price span')

		const bodySuccess = {
			orderNumber: document.querySelector('.messages-done__order-number'),
			orderDate: document.querySelector('.messages-done__date-date'),
			orderTime: document.querySelector('.messages-done__date-time'),
		}

		forms.forEach(form => {
			form.addEventListener('submit', async (e) => {
				e.preventDefault()

				const formData = new FormData(form)
				const totalData = localStorage.getItem('totalCurrentDataDOM')
				const productList = localStorage.getItem('addToCartProductsDOM')

				formData.append('totalData', totalData)
				formData.append('productList', productList)
				formData.forEach((value, key) => {
					console.log(key + ', ' + value)
				})

				try {
					const response = await fetch('../../vendor/send.php', {
						method: 'POST',
						body: formData,
					})

					if (!response.ok) {
						throw new Error('Network response was not ok')
					}

					const result = await response.json()
					let messages = JSON.parse(result.message)

					formPopupBodyOrder.classList.add('_hidden')
					formPopupBodySuccess.classList.remove('_hidden')

					bodySuccess.orderNumber.innerText = `${messages.rand}`
					bodySuccess.orderDate.innerText = `${messages.today}`
					bodySuccess.orderTime.innerText = `${messages.time}`

					localStorage.removeItem('totalCurrentDataDOM')
					localStorage.removeItem('addToCartProductsDOM')

					showTotlalQuantity.innerText = '0'
					modalTotalSumm.forEach(el => el.innerText = '0')
					e.target.reset()

				} catch (error) {
					console.error('Error during form submission:', error)
					formPopupBodyOrder.classList.add('_hidden')
					formPopupBodyError.classList.remove('_hidden')
				}
			})
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
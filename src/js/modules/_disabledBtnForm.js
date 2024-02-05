'use strict'
export function disabledBtnForm() {
	const inputReq = document.querySelectorAll('[data-input-req]')
	const buttonSend = document.querySelectorAll('[data-button-send]')

	inputReq.forEach(el => {
		el.addEventListener('blur', ev => {
			let inputTarget = ev.target

			if (inputTarget.value.length > 2) {
				buttonSend.forEach(el => {
					el.removeAttribute('disabled')
				})
			}
		})
	})
}
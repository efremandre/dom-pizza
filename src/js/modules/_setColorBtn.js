export function setColorBtn() {
	const btnsAdd = document.querySelectorAll('.add-order')
	const productsList = JSON.parse(localStorage.getItem('addToCartProductsDOM')) || []

	btnsAdd.forEach(el => {
		const productExists = productsList.some(product => product.productId === el.dataset.productId)
		productExists ? el.classList.add('_active') : el.classList.remove('_active')
	})
}
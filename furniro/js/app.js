//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}
function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) { }

if (document.querySelector('.slider-main__body')) {
	new Swiper('.slider-main__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: '.main-controls__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-main .slider-arrow_next',
			prevEl: '.slider-main .slider-arrow_prev',
		}
	});
}

if (document.querySelector('.slider-rooms__body')) {
	new Swiper('.slider-rooms__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 24,
		speed: 800,
		loop: true,
		watchOverflow: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: '.slider-rooms__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-rooms .slider-arrow_next',
			prevEl: '.slider-rooms .slider-arrow_prev',
		}
	});
}

if (document.querySelector('.slider-tips__body')) {
	new Swiper('.slider-tips__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 32,
		speed: 800,
		loop: true,
		watchOverflow: true,
		// Dotts
		pagination: {
			el: '.slider-tips__dotts',
			clickable: true,
		},
		// Arrows
		// navigation: {
		// 	nextEl: '.slider-tips .slider-arrow_next',
		// 	prevEl: '.slider-tips .slider-arrow_prev',
		// },
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.1,
				spaceBetween: 15
			},
			// when window width is >= 768px
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 992px
			992: {
				slidesPerView: 3,
				spaceBetween: 32
			}
		}
	})
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;

//=================
//ActionsOnHash
// if (location.hash) {
// 	const hsh = location.hash.replace('#', '');
// 	if (document.querySelector('.popup_' + hsh)) {
// 		popupOpen(hsh);
// 	} else if (document.querySelector('div.' + hsh)) {
// 		_goto(document.querySelector('.' + hsh), 500, '');
// 	}
// }
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			bodyLock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menuClose() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function bodyLock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		bodyLockRemove(delay);
	} else {
		bodyLockAdd(delay);
	}
}
function bodyLockRemove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function bodyLockAdd(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}


//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}


//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение слойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}

window.addEventListener('scroll', setClassScroll);
function setClassScroll() {
	let src_value = currentScroll = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 50) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
}

window.onload = function () {

	document.addEventListener("click", documentActions);

	let header = document.querySelector('.header');
	header.addEventListener("click", openMenuItems);
	header.addEventListener("click", openSearchForm);
	header.addEventListener("click", openCart);
	header.addEventListener("click", deleteElementFromCart);
	document.querySelector('.products__more-btn').addEventListener("click", openMoreProducts);
	
	let products = document.querySelectorAll('.products');
	products.forEach(item => {
		item.addEventListener("click", clickOnProductButton)
	})
	

	function openMenuItems(e) {
		if (window.innerWidth > 768 && isMobile.any() && e.target.classList.contains('menu__arrow')) {			
			e.target.closest('.menu__item').classList.toggle('_hover');	
		}
	}
	function openSearchForm (e) {
		if (e.target.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		}
	}

	function openMoreProducts (e) {
		if (e.target.classList.contains('products__more-btn')) {
			getProducts(e.target);
			e.preventDefault();
		}
	}

	function clickOnProductButton (e) {
		if (e.target.classList.contains('product__btn')) {
			const product = e.target.closest('.product');	
			handleAddingToCard(e.target, product);
			e.preventDefault();
		}
	}

	function openCart (e) {
		if (e.target.classList.contains('cart-header__icon') || e.target.closest('.cart-header__icon')) {
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-header').classList.toggle('_active');
			}
			e.preventDefault();
		} 
	}

	function deleteElementFromCart (e) {
		if (e.target.classList.contains('cart-list__delete')) {
			const productId = e.target.closest('.cart-list__item').dataset.cartPid;			
			deleteProductFromCart(productId);
			e.preventDefault();
		}
	}



	// Actions (делегирование события click)
	function documentActions(e) {
		if (window.innerWidth > 768 && isMobile.any()) {
			if (!e.target.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				_removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
			}
		}
		if (!e.target.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}

		 if (!e.target.closest('.cart-header') && !e.target.classList.contains('product__btn')) {
			document.querySelector('.cart-header').classList.remove('_active');
		}

	}


	// Load More Products
	async function getProducts(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			const file = "json/products.json";
			let response = await fetch(file, {
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadProducts(result);
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert("Ошибка");
			}
		}
	}

	function loadProducts(data) {
		const productsItems = document.querySelector('.products__catalog');

		data.products.forEach(item => {

			const article = document.createElement("article");		
			article.className = 'products-catalog__item product';
			article.setAttribute('data-pid', item.id);

			let productLabels = document.createElement("div");
			productLabels.className = 'product__labels';

			if(item.labels) {

				item.labels.forEach(labelItem => {
					const productLabel = document.createElement("div");
					productLabel.className = `labels__item product-label product-label_${labelItem.type}`;		
					productLabel.textContent = labelItem.value;
					
					productLabels.appendChild(productLabel);

				});				

			}
			
			let productView = document.createElement("div");
			productView.className = 'product__view';
			productView.innerHTML = `	
			<div class="product__image _ibg">
				<img src="img/products/${item.image}" alt="${item.title}">
				
			</div>
			<div class="product__options">
				<button type="button" class="product__btn btn btn_light">В корзину</button>
				<div class="product__actions">
					<a href="${item.shareUrl}" class="product__action _icon-share">Share</a>
					<a href="${item.likeUrl}" class="product__action _icon-favorite">Like</a>
				</div>
			</div>
		`;

		let productLink = document.createElement("a");
		productLink.className = 'product__body';
		productLink.setAttribute('href', '#');
		productLink.innerHTML =`
			<h3 class="product__title card-title">${item.title}</h3>
			<div class="product__text text">${item.text}</div>
			<div class="product__prices">	
				<div class="product__price">${item.price}</div>
				<div class="product__price product__price_old">${item.priceOld}</div>
			</div>			
		`;		

	article.appendChild(productLabels);
	article.appendChild(productView);
	article.appendChild(productLink);

	productsItems.appendChild(article)

});

	}

	// AddToCart
	function handleAddingToCard(productButton, product) {
		
		if (!productButton.classList.contains('_hold')) {
			productButton.classList.add('_hold');
			productButton.classList.add('_fly');	
			const cart = document.querySelector('.cart-header__icon');
			const productImage = product.querySelector('.product__image');

			const productImageFly = productImage.cloneNode(true);
			productImageFly.setAttribute('class', '_fly-image _ibg');
			productImageFly.style.cssText =
				`
			opacity: 1;
			position: fixed;
			z-index: 10;				
			left: ${productImage.getBoundingClientRect().left}px;
			top: ${productImage.getBoundingClientRect().top}px;
			width: ${productImage.offsetWidth}px;
			height: ${productImage.offsetHeight}px;
			opacity:1;
		`;
			document.body.appendChild(productImageFly);

			productImageFly.style.cssText =
				`			
			position: fixed;
			transition: all 0.5s ease 0s;					
			left: ${cart.getBoundingClientRect().left}px;
			top: ${cart.getBoundingClientRect().top}px;
			width: 0px;
			height: 0px;
			opacity:0;
		`;

			productImageFly.addEventListener('transitionend', function () {
				if (productButton.classList.contains('_fly')) {
					productImageFly.remove();
					addProductToCart(productButton, product.getAttribute('data-pid'));
					productButton.classList.remove('_fly');
				}
			});	
		}
	}


	// mause scroll gallery
	const gallery = document.querySelector('.gallery__catalog');


	// if (gallery && !isMobile.any()) {
	// 	gallery.addEventListener("mousemove", function (e) {		
	// 		const galleryColumns = document.querySelectorAll('.gallery-catalog__column');
	// 		let galleryWidth = 0;
	// 		galleryColumns.forEach(element => {
	// 			galleryWidth += element.offsetWidth + 25;
	// 		});		
	// 		let coordX = e.pageX - gallery.offsetWidth/2;
	// 		let position = 0;
	// 		position = (1 - gallery.offsetWidth  / galleryWidth) * ((galleryWidth / 2) * coordX) /  (gallery.offsetWidth / 2);
	
	// 		gallery.style.cssText = `transform: translate(${ -position }px,0);`;

	// 	})		
	// }

	// Furniture Gallery
	const furniture = document.querySelector('.gallery__catalog');
	if (furniture && !isMobile.any()) {
		const furnitureItems = document.querySelector('.furniture__items');
		const furnitureColumn = document.querySelectorAll('.furniture__column');

		// Скорость анимации
		const speed = furniture.dataset.speed;

		// Объявление переменных
		let positionX = 0;
		let coordXprocent = 0;

		function setMouseGalleryStyle() {
			let furnitureItemsWidth = 0;
			furnitureColumn.forEach(element => {
				furnitureItemsWidth += element.offsetWidth;
			});

			const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
			const distX = Math.floor(coordXprocent - positionX);

			positionX = positionX + (distX * speed);
			let position = furnitureDifferent / 200 * positionX;

			furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

			if (Math.abs(distX) > 0) {
				requestAnimationFrame(setMouseGalleryStyle);
			} else {
				furniture.classList.remove('_init');
			}
		}
		furniture.addEventListener("mousemove", function (e) {
			// Получение ширины
			const furnitureWidth = furniture.offsetWidth;

			// Ноль по середине
			const coordX = e.pageX - furnitureWidth / 2;

			// Получаем проценты
			coordXprocent = coordX / furnitureWidth * 200;

			if (!furniture.classList.contains('_init')) {
				requestAnimationFrame(setMouseGalleryStyle);
				furniture.classList.add('_init');
			}
		});
	}


	function addProductToCart(productButton, productId) {
		const cart = document.querySelector('.cart-header');
		const cartIcon = cart.querySelector('.cart-header__icon');
		const cartQuantity = cartIcon.querySelector('span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		

		if (cartQuantity) {
			cartQuantity.innerHTML = ++cartQuantity.innerHTML;
		} else {
			cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
		}
		if (!cartProduct) {
			createItemInCard(productId);
		} else {
			let cartProductQuantity =  cartProduct.querySelector('.cart-list__quantity');
			cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;			
		}

		// После всех действий
		productButton.classList.remove('_hold');
	
	}

	function deleteProductFromCart(productId) {
		const cart = document.querySelector('.cart-header');
		const cartQuantity = cart.querySelector('.cart-header__icon span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		//console.log(cartProduct.querySelector('.cart-list__quantity').innerHTML);
		cartQuantity.innerHTML = cartQuantity.innerHTML - cartProduct.querySelector('.cart-list__quantity').innerHTML;
		

		if (cartProduct) {
			cartProduct.remove();
		}

		if (cartQuantity.innerHTML <= 0) {
			cartQuantity.remove();
			cart.classList.remove('_active');
		}
		
	}	

	function createItemInCard(productId) {

		const cartList = document.querySelector('.cart-list');
		const product = document.querySelector(`[data-pid="${productId}"]`);
		const cartProductImage = product.querySelector('.product__image').innerHTML;
		const cartProductTitle = product.querySelector('.product__title').innerHTML;
		const li = document.createElement('li');
		li.setAttribute('data-cart-pid',  productId);
		 li.className = 'cart-list__item';
		 li.innerHTML = `		
			<a href="" class="cart-list__image _ibg">${cartProductImage}</a>
			<div class="cart-list__body">	
				<a href="" class="cart-list__title">${cartProductTitle}</a>	
				<div class="cart-list__quantity">1</div>
				<a href="" class="cart-list__delete">Delete</a>
			</div>		
		`;
		cartList.appendChild(li);
		
	}



}

//=================
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	initGallery();
}
function initGallery() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}

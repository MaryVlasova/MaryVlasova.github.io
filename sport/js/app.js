function testEmail(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
function testPhone(input) {
	let phone = input.value;
	return /^((8|\+7)[\-]?)?(\(?\d{3}\)?[\-]?)?[\d\-]{7,10}$/.test(phone.replace(/'| /g,''));
}

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

document.querySelectorAll('.slider-single__body .slider-single__slide').forEach((slide) => {

	let dotts = document.querySelector('.slider-single__dotts');
	console.log(dotts);
	let img = slide.querySelector('img');
	console.log(img);
	if (img){
		let dot = `
		<div class="slider-single__slide">
			<div class="slider-single__dot _ibg">
				<img src="${img.getAttribute('src')}" alt="${img.getAttribute('alt')}">
			</div>	
		</div>		
		`;
		dotts.innerHTML = dotts.innerHTML + dot;
	}

})



//let sliders = document.querySelectorAll('._swiper');


// let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
// if (sliderScrollItems.length > 0) {
// 	for (let index = 0; index < sliderScrollItems.length; index++) {
// 		const sliderScrollItem = sliderScrollItems[index];
// 		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
// 		const sliderScroll = new Swiper(sliderScrollItem, {
// 			observer: true,
// 			observeParents: true,
// 			direction: 'vertical',
// 			slidesPerView: 'auto',
// 			freeMode: true,
// 			scrollbar: {
// 				el: sliderScrollBar,
// 				draggable: true,
// 				snapOnRelease: false
// 			},
// 			mousewheel: {
// 				releaseOnEdges: true,
// 			},
// 		});
// 		sliderScroll.scrollbar.updateSize();
// 	}
// }


//INDEX MAIN SLIDER
if (document.querySelector('.slider-main__body')) {
	bildSlider (document.querySelector('.slider-main__body._swiper'));
	new Swiper('.slider-main__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 1,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		// Disable preloading of all images
		preloadImages: false,
		// Enable lazy loading
		lazy: true,
		//parallax: true,
		// Dotts
		pagination: {
			el: '.slider-main__dotts',
			clickable: true,
		},
		

	});



	document.querySelectorAll('.slider-main .slider-main__dotts>span').forEach((dot, i) => {	
		let imges = document.querySelectorAll('.slider-main .slider-main__slide img');
		if (imges){
			dot.style.backgroundImage = 'url(./' + imges[i].getAttribute('src') +')';
		}

	})	

}	

// INDEX CLIENTS SLIDER
if (document.querySelector('.slider-clients__body')) {
	bildSlider (document.querySelector('.slider-clients__body._swiper'));
	new Swiper('.slider-clients__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 5,
		spaceBetween: 10,
		speed: 800,
		loop: true,
		watchOverflow: true,
		// Disable preloading of all images
		preloadImages: false,
		// Enable lazy loading
		lazy: true,		
		// Dotts
		// pagination: {
		// 	el: '.slider-clients__dotts',
		// 	clickable: true,
		// },
		// Arrows
		navigation: {
			nextEl: '.slider-clients .arrow_next',
			prevEl: '.slider-clients .arrow_prev',
		},
		breakpoints: {
			// when window width is >= 320px
			200: {
				slidesPerView: 1,
			},

			420: {
				slidesPerView: 2,
			},
			// when window width is >= 768px
			768: {
				slidesPerView: 3,
			},
			// when window width is >= 992px
			992: {
				slidesPerView: 4,
				spaceBetween: 10
			},
			1045: {
				slidesPerView: 5,
				spaceBetween: 10
			}			
		}
	})
}

// SINGLE PRODUCT SLIDER
if (document.querySelector('.slider-single__body')) {

	bildSlider (document.querySelector('.slider-single__dotts._swiper'));
	bildSlider (document.querySelector('.slider-single__body._swiper'));

	let singleSubslider = new Swiper('.slider-single__dotts', {
		observer: true,
		observeParents: true,
		//centeredSlides: true,
		slidesPerView: 4,
		//slidesPerGroup: 4,
		spaceBetween: 12,
		watchOverflow: true,
		speed: 800,
		// Disable preloading of all images
		preloadImages: false,
		// Enable lazy loading
		//lazy: true,

		

	});	

	let singleSlider = new Swiper('.slider-single__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 1,
		watchOverflow: true,
		speed: 800,
		// Disable preloading of all images
		preloadImages: false,
		// Enable lazy loading
		lazy: true,
		//parallax: true,
		// Dotts
		// pagination: {
		// 	el: '.single-info__dotts',
		// 	clickable: true,
		// },
		thumbs : {
			swiper: singleSubslider
		}

	});

	

}






//BildSlider
function bildSlider (slider) {
	if (!slider.classList.contains('swiper-bild')) {
		let sliderItems = slider.children;
		if (sliderItems) {
			for (let index = 0; index < sliderItems.length; index++) {
				let el = sliderItems[index];
				el.classList.add('swiper-slide');
			}
		}
		let slider_content = slider.innerHTML;
		let sliderWrapper = document.createElement('div');
		sliderWrapper.classList.add('swiper-wrapper');
		sliderWrapper.innerHTML = slider_content;
		slider.innerHTML = '';
		slider.appendChild(sliderWrapper);
		slider.classList.add('swiper-bild');

		if (slider.classList.contains('_swiper_scroll')) {
			let sliderScroll = document.createElement('div');
			sliderScroll.classList.add('swiper-scrollbar');
			slider.appendChild(sliderScroll);
		}
	}
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
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
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
function body_lock_add(delay) {
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
// LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index];
		let txt = el.innerHTML;
		let txt_words = txt.replace('  ', ' ').split(' ');
		let new_title = '';
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index];
			let len = txt_word.length;
			new_title = new_title + '<p>';
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1);
				if (it == ' ') {
					it = '&nbsp;';
				}
				new_title = new_title + '<span>' + it + '</span>';
			}
			el.innerHTML = new_title;
			new_title = new_title + '&nbsp;</p>';
		}
	}
}
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
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

//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);

	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

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
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}

function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
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
if (!Array.prototype.forEach)
{
	Array.prototype.forEach = function(fn, scope)
	{
		for(var i = 0, len = this.length; i < len; ++i)
		{
			fn.call(scope, this[i], i, this);
		}
	}
}

window.onload = function () {

	
	// HEADER SCROLL
	var previosScroll = pageYOffset;
	window.addEventListener('scroll', setClassScroll);
	function setClassScroll() {

		let header = document.querySelector('header.header');

		if (header !== null) {
			if (pageYOffset > previosScroll && pageYOffset > 200) { // сравнить	
				header.classList.add('_scroll');		
			} else {			
				header.classList.remove('_scroll');		
			}
		}

		previosScroll = pageYOffset;


	}


	// CALCULATE AMOUNT
	calculateAmount ();

	function calculateAmount () {
		let products = document.querySelectorAll('.basket .product');
		let totalAmount = 0;
		products.forEach((product) => {			
			totalAmount += calculateAmountForProduct(product);
		})
		let basketAmount = document.querySelector('.basket .basket-amount__value');
		if (basketAmount) {
			basketAmount.innerText = totalAmount.toLocaleString();
		}
		
	}
	function calculateAmountForProduct (product) {
		let priductPrice = product.querySelector('.basket-item__price')
		let priductQuantity = product.querySelector('.product-quantity__input');
		let priductAmount = product.querySelector('.product-amount__price');
		if (priductPrice && priductQuantity && priductAmount) {
			priductPrice =  parseInt(priductPrice.innerText.replace(/[^+\d]/g, '')) || 0;		
			priductQuantity = parseInt(priductQuantity.value.match(/\d+/)) || 0;
			let amount = priductPrice * priductQuantity;
			priductAmount.innerText = amount.toLocaleString();
			return amount;
		}
		return 0;
	}

	const productQuantityInputs = document.querySelectorAll('.product-quantity .product-quantity__input');
	productQuantityInputs.forEach((input) => {	
		input.addEventListener('input', function(e) {
			calculateAmount ();
		})			
	})


	// BUSKET
	let basketItemsDelete = document.querySelectorAll('.basket-item__delete');
	basketItemsDelete.forEach( (basketItemDelete) => {
		basketItemDelete.addEventListener('click', function (e) {
			e.preventDefault();
			let product = basketItemDelete.closest('.product')
			if (product) {
				product.remove();
			}
		})
	})


	// CHANGE PRODUCTS VIEW
	let viewButtons = document.querySelectorAll('.catalog-view input[type=radio]');
	viewButtons.forEach((input) => {
		input.addEventListener('change', function(e) {
			document.querySelectorAll('.slider-catalog-view').forEach((view) => {
				view.classList.add('_hide');
			});
			if (e.target.checked && e.target.value) {
				document.querySelector('.slider-catalog-view[data-view="'+e.target.value+'"]').classList.remove('_hide');	
			
			}				
		})
	
	})
	

	// FILTERS
	
	let filersTarget = document.getElementById("filters-header-icon");
	let filersIcon = document.querySelector("#filters-header-icon .icon-burger");
	let filersContent = document.getElementById('filters-form');
	toggleClassbyClicking (filersTarget, filersIcon, filersContent);

	let compareButtonDelete = document.getElementById('compare-button-delete');
	if (compareButtonDelete) {
		compareButtonDelete.addEventListener('click', function(e) {
			e.preventDefault();
			document.getElementById('compare-list').innerHTML = '';
		})
	}
	document.querySelectorAll('.filters-form__exit').forEach((cross) => {
		cross.addEventListener('click', function(e) {
			e.preventDefault();
			e.target.parentNode.remove();
		})
	})
	document.querySelectorAll('#filters-form .button-reset').forEach((button) => {
		button.addEventListener('click', (e) => {
			let filtersForm = document.getElementById('filters-form');
			if (filtersForm) {
				filtersForm.reset();
				let inputs = document.querySelectorAll('#filters-form input[type=checkbox]');
				inputs.forEach((input) => {
					var event = new Event('change');
					input.dispatchEvent(event);
				})	
			}
	
		})
	})
	

	//SEARCH
	let searchFormTarget = document.getElementById("search-form-link");
	let searchFormIcon = searchFormTarget;
	let searchFormList = document.getElementById("search-form-list");
	toggleClassbyClicking (searchFormTarget, searchFormIcon, searchFormList);
	document.querySelectorAll('#search-form-list input[type=checkbox]').forEach((checkbox) => {

		checkbox.addEventListener('change', function(e) {
			let activeCheckboxes = document.querySelectorAll('#search-form-list input[type=checkbox]:checked');
			if (activeCheckboxes.length > 0) {
				document.querySelector('#search-form-link').innerHTML = 'Выбрано '+ activeCheckboxes.length;	
			} else {
				document.querySelector('#search-form-link').innerHTML = 'Везде';
			}
		})

	})

	//MENU
	let pageMenuTarget = document.getElementById("page-menu-icon");
	let pageMenuIcon = document.querySelector("#page-menu-icon .icon-burger");
	let pageMenuBody = document.getElementById('page-menu-body');
	toggleClassbyClicking (pageMenuTarget, pageMenuIcon, pageMenuBody);
	document.querySelectorAll('#page-menu-body .has-children').forEach((item) => {
		item.addEventListener('click', (e) => {
			let isActive = e.target.parentNode.classList.contains('_active');
			document.querySelectorAll('#page-menu-body .has-children').forEach((link)=> {
				link.classList.remove('_active');
			})
			if (!isActive) {
				e.target.parentNode.classList.add('_active');
			}							
		})
	})
	if (!isMobile.any()){
		document.querySelectorAll('#page-menu-body .has-children').forEach((item) => {			
			item.onmouseover = item.onmouseout = handler;
			function handler(event) {	
				if (event.type == 'mouseover' && window.innerWidth > 991.98) {
					if (!item.classList.contains('_active')) {
						item.classList.add('_active');
					}	
				}
				if (event.type == 'mouseout' && window.innerWidth > 991.98) {
					item.classList.remove('_active');
				}
			  }
		})
	}

	// ABOUT
	let aboutTarget = document.getElementById("home-about-block-icon");
	let aboutIcon = document.querySelector("#home-about-block-icon .icon-burger");
	let aboutContent = document.getElementById('home-about-block-content');
	toggleClassbyClicking (aboutTarget, aboutIcon, aboutContent);


	
	// переключаем класс по клику на кнопку
	function toggleClassbyClicking (targetElement, iconElement, contentElement, className = '_active') {
		if (targetElement != null && iconElement != null && contentElement != null) {
			targetElement.addEventListener("click", function (e) {	
				e.preventDefault();
				iconElement.classList.toggle(className);						
				contentElement.classList.toggle(className);
			});
		};		
	}

	//PRODUCTS
	if (isMobile.any()){
		document.querySelectorAll('.slider-catalog .product').forEach((product) => {
			product.addEventListener('click', (e) => {			
				if (e.target.tagName != 'A' && e.target.tagName != 'BUTTON') {
					e.preventDefault();
					product.classList.toggle('_active');
				}
			
			})
		})
	 }
	
	 let buttonCompare = document.querySelectorAll('.product .product-compare');
	 buttonCompare.forEach((button) => {
		 button.addEventListener('click', function(e) {
			e.preventDefault();		
			let product = e.target.closest('.product');
			if (product) {
				let title = product.querySelector('.product__title');
				if (title) {
					let list = document.getElementById('compare-list');

					const li = document.createElement("li");
					const link = document.createElement("a");
					link.setAttribute('product', product.dataset.product);
					link.setAttribute('href', '#');	
					link.innerText = title.innerText;			
					li.appendChild(link);

					const btn = document.createElement("button");
					btn.className = 'filters-form__exit _icon-b-cross';
					btn.addEventListener('click', function(e) {
						e.preventDefault();
						e.target.parentNode.remove();
					});
					li.appendChild(btn);
					list.appendChild(li);
				
				}

			}

			 

		 })
	 })


	 //CART
	let productCarts = document.querySelectorAll('.product button.product-cart');
	productCarts.forEach((cartLink) => {
		cartLink.addEventListener('click',	(e) => {
			e.preventDefault();
			addProductsToCart(cartLink);
		} );
	})

	function addProductsToCart (cartLink) {
		
		cartLink.classList.add('_disabled');
		cartLink.setAttribute('disabled', true);
		
		const cartIcon = document.getElementById('cart-icon'); 		
		let header = document.querySelector('header.header'); 
	
		const isScroll = 	header.classList.contains('_scroll');
		let quantity = cartIcon.querySelector('span.quantity');
		
		if (quantity) {
			quantity.innerText =  (parseInt(quantity.innerText.match(/\d+/)) || 0) + 1;
		} else {
			quantity = document.createElement("span");
			quantity.className = 'quantity';
			quantity.innerText = '1';
			cartIcon.insertAdjacentHTML('beforend', quantity);
		}
		
		header.classList.remove('_scroll');
		quantity.classList.add('_fly');
	
		let endCartAnimation = () => {

			cartLink.classList.remove('_disabled');
			cartLink.removeAttribute('disabled');
			quantity.classList.remove('_fly');
			if (isScroll) {
				header.classList.add('_scroll');
			}
			quantity.removeEventListener('animationend', endCartAnimation);
		}

		quantity.addEventListener('animationend', endCartAnimation);
	}

	document.addEventListener("click", documentActions);
	// Actions (делегирование события click)
	function documentActions(e) {
		const targetElement = e.target;

		if (!targetElement.closest('#search-form-list') && !targetElement.closest('#search-form-link') && document.querySelector('#search-form-list._active')) {
			document.querySelector('#search-form-list').classList.remove('_active');
			document.querySelector('#search-form-link').classList.remove('_active');
			
		}



	}

	setTimeout(() => {
		let sliderContainer = document.querySelector('#slider-catalog-swiper');
		if (sliderContainer) {
			loadPopularProducts(
				document.querySelector('#slider-catalog-swiper'), 
				'json/popular.json'
			);	
		}		

	}, 1000);



	async function getProducts(link) {
		let response = await fetch(link, {
			method: "GET"
		});
		if (response.ok) {			
			let result = await response.json();		
			return result;
		} else {
			console.log('error');
			return null;
		}
		
	}
	
	function loadPopularProducts(container, source) {	
		if (container) {
			container.classList.add('_loading');	
		getProducts(source)
		.then(function(result) {
			if(result.products && result.products.pages) {
				let tamplates = '';
				result.products.pages.forEach((page) => {
					tamplates += '<div class="slider-catalog__slide">';
					page.forEach(product => {
						let oldPrice = '';
						if (product.priceOld) {
							oldPrice = `<div class="product-tile__price_old product__price_old price">${product.priceOld}</div>`;
						}
						let info = '';
						if (product.info) {
							product.info.forEach((item) => {
								info += `						
								<div class="product-tile-info__item">
									<div class="product-tile-info__title">${item.title}</div>
									<div class="product-tile-info__content">${item.text}</div>
								</div>	
								`;
							})
				
						}
						tamplates += `
						<article data-product="${product.id}" class="slider-catalog__item product product-tile">
							<div class="product-tile__img _ibg">
								<img  src="img/products/${product.image}" alt="${product.title}">
							</div>
							<div class="product-tile__content">
								<h3 class="product-tile__title product__title">${product.title}</h3>	
								<h4 class="product-tile__subtitle product__subtitle">${product.category}</h4>
							</div>
							<div class="product-tile__actions product-tile__actions_small">
								<span class="product__cart _button-wrapper _icon-b-basket"></span>
								<div class="product-tile__price product__price price">${product.price}
									${oldPrice}
								</div>
							</div>								
							<div class="product-tile__active product-tile-active">
								<div class="product-tile-active__content">
									<div class="product-tile-active__header">
										<a href="single.html" class="product__title product-tile__title product-tile__title_active">${product.title}</a>
										<a href="${product.url}" class="product__subtitle product-tile__subtitle product-tile__subtitle_active">${product.category}</a>
									</div>
						
									<div class="product-tile-active__info product-tile-info">
										${info}		
									</div>																				
								</div>
								<div class="product-tile-active__center product-tile-active__center_home">
									<button type="button" aria-label="Добавить в корзину" class="product-cart product__cart_active _button-wrapper _button-wrapper_big _icon-b-basket">	
									</button>										
								</div>									
								<div class="product-tile-active__actions product-tile-active__actions_small">
									<span class="product-tag product-tag_catalog">в наличии</span>
									<div class="product-tile__price product__price product__price_active price">
									${product.price}
										${oldPrice}
									</div>
								</div>									
							</div>
						</article>	
							`;			
	
					})
					tamplates += '</div>';
				})

				return tamplates;
			}
			return null;
		})
		.then(function(result) {
			container.innerHTML += result;
			container.classList.remove('_loading');


		})
		.then(function() {
			bildSlider (container);
			new Swiper('#slider-catalog-swiper', {
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				spaceBetween: 0,
				watchOverflow: true,
				speed: 800,
				// Disable preloading of all images
				preloadImages: false,
				// Enable lazy loading
				lazy: true,
				navigation: {
					nextEl: '.slider-catalog .arrow_next',
					prevEl: '.slider-catalog .arrow_prev',
				},	
				pagination: {
					el: ".slider-catalog .home-pagination",
					type: "fraction",
					},			
		
			});			
		
		})
		.then(function() {
			let productCarts = container.querySelectorAll('.product button.product-cart');
			productCarts.forEach((cartLink) => {
				cartLink.addEventListener('click',	(e) => {		
					e.preventDefault();
					addProductsToCart(cartLink);
				} );
			})						
		
		})
		;


	
		}
	}
	
	
}

//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
// FOCUSED ELEMENTS
let formInputs = document.querySelectorAll('input,textarea');
formInputs.forEach((input) => {
	input.onblur = function() {
		input.classList.remove('_focused');	
	};
	input.onfocus = function() {
		input.classList.add('_focused');
		if (input.classList.contains('_error')) {
			input.classList.remove('_error');
		}
	};
})


// CREATE FALSE CHECHBOXES
let checkboxes = document.querySelectorAll('._label-checkbox');
if (checkboxes.length > 0) {
	for (let index = 0; index < checkboxes.length; index++) {
		let falseCheckbox = document.createElement('span');
		falseCheckbox.classList = '_false-checkbox';
		const input = checkboxes[index].querySelector('input[type="checkbox"]');
		input.insertAdjacentElement('afterEnd', falseCheckbox);
	
	}
}

// CREATE FORMS
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', formSubmit);
	}
}
async function formSubmit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = formValidate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open(message);
				}
				formClean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		// If test		
		if (form.hasAttribute('data-test')) {
			e.preventDefault();
			popup_open(message);
			//formClean(form);
		}
	} else {
		e.preventDefault();
		console.log('errors');
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form, 1000, 50);
		}
		
	}
}
function formValidate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += formValidateInput(el);
			}
		}
	}
	return error;
}
function formValidateInput(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if ( testEmail(input) || input.value == input_g_value) {
			formAddError(input);
			error++;
		} else {
			formRemoveError(input);
		}
	} else if (input.getAttribute("name") == "phone" || input.classList.contains("_phone")) {
		if ( !testPhone(input)) {
			formAddError(input);
			error++;
		} else {
			formRemoveError(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		formAddError(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			formAddError(input);
			error++;
		} else {
			formRemoveError(input);
		}
	}
	return error;
}
function formAddError(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function formRemoveError(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function formClean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focused');
		el.classList.remove('_focused');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			selectItem(select);
		}
	}
}

//Select
let selects = document.getElementsByTagName('select');

if (selects.length > 0) {
	selectsInit();
}
function selectsInit() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		selectInit(select);
		select.onblur = function() {
			select.classList.remove('_focused');
			let falseSelect = select.closest('.select');
			if (falseSelect) {
				falseSelect.classList.remove('_focused');
			}
		};
		select.onfocus = function() {
			select.classList.add('_focused');		
			let falseSelect = select.closest('.select');
			if (falseSelect) {
				falseSelect.classList.add('_focused');
			}			 
		
		};
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selectsClose(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			selectsClose(e);
		}
	});
}
function selectsClose(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select') && !e.target.classList.contains('_option')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function selectInit(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	//select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	selectItem(select);
}
function selectItem(select) {
	const select_parent = select.parentElement;
	const selectItems = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (selectItems) {
		selectItems.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div hidden class="select__options">' + selectGetOptions(select_options) + '</div>' +
		'</div></div>');

	selectActions(select, select_parent);
}
function selectActions(original, select) {
	const selectItem = select.querySelector('.select__item');
	const selectTitle = select.querySelector('.select__title');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	selectTitle.addEventListener('click', function (e) {
		selectItemActions();
	});

	function selectMultiItems() {
		let selectedOptions = select.querySelectorAll('.select__option');
		let originalOptions = original.querySelectorAll('option');
		let selectedOptionsText = [];
		for (let index = 0; index < selectedOptions.length; index++) {
			const selectedOption = selectedOptions[index];
			originalOptions[index].removeAttribute('selected');
			if (selectedOption.classList.contains('_selected')) {
				const selectOptionText = selectedOption.innerHTML;
				selectedOptionsText.push(selectOptionText);
				originalOptions[index].setAttribute('selected', 'selected');
			}
		}
		select.querySelector('.select__value').innerHTML = '<span>' + selectedOptionsText + '</span>';
	}
	function selectItemActions(type) {
		if (!type) {
			let selects = document.querySelectorAll('.select');
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				if (select != selectItem.closest('.select')) {
					select.classList.remove('_active');
					_slideUp(select_body_options, 100);
				}
			}
			_slideToggle(select_body_options, 100);
			select.classList.toggle('_active');
		}
	}
	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', selectSearch);
		} else {
			if (select_option.getAttribute('data-value') == original.value && !original.hasAttribute('multiple')) {
				//select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				if (original.hasAttribute('multiple')) {
					select_option.classList.toggle('_selected');
					selectMultiItems();
				} else {
					select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
					original.value = select_option_value;
					//select_option.style.display = 'none';
				}
			}
			let type;
			if (original.hasAttribute('multiple')) {
				type = 'multiple';
			}
			selectItemActions(type);
		});
	}
}
function selectGetOptions(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.innerHTML;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function selectSearch(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let selectSearchText = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		// if (select_txt_value.toUpperCase().indexOf(selectSearchText) > -1) {
		// 	select_option.style.display = "";
		// } else {
		// 	select_option.style.display = "none";
		// }
	}
}
function selectsUpdateAll() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			selectItem(select);
		}
	}
}

//PHONE
const phoneInputs = document.querySelectorAll('._phone');

for (let index = 0; index < phoneInputs.length; index++) {
	phoneInputs[index].addEventListener("input", checkPhoneInputs);
	phoneInputs[index].addEventListener("focus", checkPhoneInputs);
	phoneInputs[index].addEventListener("blur", checkPhoneInputs);
}

function checkPhoneInputs(event) {
	const keyCode = event.keyCode;
	const placeholder = event.target.getAttribute('placeholder');
	let template = placeholder;
	if (!placeholder) {
		template = '+7(___)___-__-__';
	};

	const def = template.replace(/\D/g, ""),
	val = this.value.replace(/\D/g, "");
	let i = 0,
		newValue = template.replace(/[_\d]/g, function (a) {
			return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
		});
	i = newValue.indexOf("_");
	if (i !== -1) {
		newValue = newValue.slice(0, i);
	}
	let reg = template.substr(0, this.value.length).replace(/_+/g,
		function (a) {
			return "\\d{1," + a.length + "}";
		}).replace(/[+()]/g, "\\$&");
	reg = new RegExp("^" + reg + "$");
	if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
		this.value = newValue;
	}
	if (event.type === "blur" && this.value.length < 5) {
		this.value = "";
	}

}




//QUANTITY
const productQuantityFormes = document.querySelectorAll('.product-quantity');
productQuantityFormes.forEach((form) => {


	let input = form.querySelector('.product-quantity__input');
	let minus = form.querySelector('.product-quantity__minus');
	let plus = form.querySelector('.product-quantity__plus');
	if (input) {
		input.addEventListener('keydown', function(event) {
			// Разрешаем: backspace, delete, tab и escape
			if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
				// Разрешаем: Ctrl+A
				(event.keyCode == 65 && event.ctrlKey === true) ||
				// Разрешаем: home, end, влево, вправо
				(event.keyCode >= 35 && event.keyCode <= 39)) {			
				// Ничего не делаем
				return;
			} else {
				// Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
				if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
					event.preventDefault();
				}
			}
		});			
	}
	if (input && minus && plus) {
		plus.addEventListener('click', function(e) {
			e.preventDefault();
			let num = parseInt(input.value.match(/\d+/)) || 0;
			input.value = num + 1;
			input.dispatchEvent(new Event('input', { bubbles: false }));
		})
		minus.addEventListener('click', function(e) {
			e.preventDefault();
			let num = parseInt(input.value.match(/\d+/)) || 0;
			if (num == 0) {
				return;
			}
			input.value = num - 1;
			input.dispatchEvent(new Event('input', { bubbles: false }));
		})			
	}		


})

//RANGE
var input0 = document.querySelector(".input-with-keypress-0");
var input1 = document.querySelector(".input-with-keypress-1");
var sliderInputs = [input0, input1];
var rangeSlider = document.getElementById('range');


if (rangeSlider != null) {
	noUiSlider.create(rangeSlider, {
		start: [0, 100000],
		padding: 10000,
		margin: 1000,
		tooltips: [true, true],
		connect: true, 
		range: {
			'min': [-10000],
			'max': [210000]
		},
		format: wNumb({
			decimals: 0,
			thousand: ' '
		

		}),

	});		

	rangeSlider.noUiSlider.on("update", function(values, handle) {
		sliderInputs[handle].value = values[handle];
	
	  /* begin Listen to keypress on the input */
	  function setSliderHandle(i, value) {
		var r = [null, null];
		r[i] = value;
		rangeSlider.noUiSlider.set(r);
	  }
	
	  // Listen to keydown events on the input field.
	  sliderInputs.forEach(function(input, handle) {
		input.addEventListener("change", function() {
		  setSliderHandle(handle, this.value);
		});
	
		input.addEventListener("keydown", function(e) {
		  var values = rangeSlider.noUiSlider.get();
		  var value = Number(values[handle]);
	
		  // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
		  var steps = rangeSlider.noUiSlider.steps();
	
		  // [down, up]
		  var step = steps[handle];
	
		  var position;
	
		  // 13 is enter,
		  // 38 is key up,
		  // 40 is key down.
		  switch (e.which) {
			case 13:
			  setSliderHandle(handle, this.value);
			  break;
	
			case 38:
			  // Get step to go increase slider value (up)
			  position = step[1];
	
			  // false = no step is set
			  if (position === false) {
				position = 1;
			  }
	
			  // null = edge of slider
			  if (position !== null) {
				setSliderHandle(handle, value + position);
			  }
	
			  break;
	
			case 40:
			  position = step[0];
	
			  if (position === false) {
				position = 1;
			  }
	
			  if (position !== null) {
				setSliderHandle(handle, value - position);
			  }
	
			  break;
		  }
		});
	  });
	  /* end Listen to keypress on the input */
	});
}

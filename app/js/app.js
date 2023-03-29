document.addEventListener("DOMContentLoaded", function() {
	
	//----------------------FIXED-HEADER-----------------------
		const headerFixed = (headerFixed, headerActive) => {
			const header =  document.querySelector(headerFixed),
						active = headerActive.replace(/\./, '');
	
			window.addEventListener('scroll', function() {
				const top = pageYOffset;
				
				if (top >= 90) {
					header.classList.add(active);
				} else {
					header.classList.remove(active);
				}
	
			});
	
		};
		headerFixed('.header', '.header--active');

	//----------------------TABS-JS----------------------
		const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
			const header = document.querySelector(headerSelector),
						tab = document.querySelectorAll(tabSelector),
						content = document.querySelectorAll(contentSelector);

			function hideTabContent() {
				content.forEach(item => {
					item.style.display = "none";
				});

				tab.forEach(item => {
					item.classList.remove(activeClass);
				});
			}

			function showTabContent(i = 0) {
				content[i].style.display = "block";
				tab[i].classList.add(activeClass);
			}

			hideTabContent();
			showTabContent();

			header.addEventListener('click', (e) => {
				const target = e.target;
				
				if (target && 
					(target.classList.contains(tabSelector.replace(/\./, '')) || 
					target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
					tab.forEach((item, i) => {

							hideTabContent();
							showTabContent(i);
							console.log(i)

					});
				}
			});
		};
		tabs('.tabs', '.tabs__item', '.tabs__wrap', 'active');


		

		// const popupLinks = document.querySelectorAll('.popup-link');
		// const body = document.querySelector('body');
		// const lockPadding = document.querySelectorAll("lock-padding")

		// let unlock = true;

		// const timeout = 800;

		// if (popupLinks.length > 0) {
		// 	for (let index = 0; index < popupLinks.length; index++) {
		// 		const popupLink = popupLinks[index];
		// 		popupLink.addEventListener("click", function (e) {
		// 			const popupName = popupLink.getAttribute('href').replace('#', '');
		// 			const curentPopup = document.getElementById(popupName);
		// 			popupOpen(curentPopup);
		// 			e.preventDefault();
		// 		})
		// 	}
		// }
		// const popupCloseIcon = document.querySelectorAll('.close-popup');
		// if (popupCloseIcon.length > 0) {
		// 	for (let index = 0; index < popupCloseIcon.length; index++) {
		// 		const el = popupCloseIcon[index];
		// 		el.addEventListener('click', function (e) {
		// 			popupClose(el.closest('.popup'));
		// 			e.preventDefault();
		// 		});
		// 	}
		// }

		// function popupOpen(curentPopup) {
		// 	if (curentPopup && unlock) {
		// 		const popupActive = document.querySelector('.popup.open');
		// 		if (popupActive) {
		// 			popupClose(popupActive, false);
		// 		}	else {
		// 			bodyLock();
		// 		}
		// 		curentPopup.classList.add('open');
		// 		curentPopup.addEventListener("click", function (e) {
		// 			if (!e.target.closest('.popup__content')) {
		// 				popupClose(e.target.closest('.popup'));
		// 			}
		// 		});
		// 	}
		// }
		// function popupClose(popupActive, doUnlock = true) {
		// 	if (unlock) {
		// 		popupActive.classList.remove('open');
		// 		if (doUnlock) {
		// 			bodyUnlock();
		// 		}
		// 	}
		// }

		// function bodyLock() {
		// 	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		// 	if (lockPadding.length > 0) {
		// 		for (let index = 0; index < lockPadding.length; index++) {
		// 			const el = lockPadding[index];
		// 			el.style.paddingRight = lockPaddingValue;
		// 		}
		// 	}
		// 	body.style.paddingRight = lockPaddingValue
		// 	body.classList.add('lock');

		// 	unlock = false;
		// 	setTimeout(function () {
		// 		unlock = true;
		// 	}, timeout);
		// }

		// function bodyUnlock() {
		// 	setTimeout(function () {
		// 			if (lockPadding.length > 0) {
		// 			for (let index = 0; index < lockPadding.length; index++) {
		// 				const el = lockPadding[index];
		// 				el.style.paddingRight = '0px';
		// 			}
		// 		}
		// 		body.style.paddingRight = '0px';
		// 		body.classList.remove('lock');
		// 	}, timeout);

		// 	unlock = false;
		// 	setTimeout(function () {
		// 		unlock = true;
		// 	}, timeout);
		// }

		// document.addEventListener('keydown', function (e) {
		// 	if (e.which === 27) {
		// 		const popupActive = document.querySelector('.popup.open');
		// 		popupClose(popupActive);
		// 	}
		// })

	//----------------------MODAL-----------------------
		const modals = (modalSelector) => {
			const	modal = document.querySelectorAll(modalSelector);

			if (modal) {
				let i = 1;

				modal.forEach(item => {
					const wrap = item.id;
					const link = document.querySelectorAll('.' + wrap);

					link.forEach(linkItem => {
						let close = item.querySelector('.close');
							if (linkItem) {
								linkItem.addEventListener('click', (e) => {
									if (e.target) {
										e.preventDefault();
									}
									item.classList.add('active');
								});
							}

							if (close) {
								close.addEventListener('click', () => {
									item.classList.remove('active');
								});
							}

						item.addEventListener('click', (e) => {
							if (e.target === item) {
								item.classList.remove('active');
							}
						});
					});
				});
			}

		};
		modals('.modal');

	//------------------------------ACCORDIONS---------------------------
		const accordions = (accordionSelector) => {
			const	accordion = document.querySelectorAll(accordionSelector);

			accordion.forEach(item => {
				const accordionClick = item.querySelector('.accordion__header'),
							accordionContent = item.querySelector('.accordion__content');

				accordionClick.addEventListener('click', (e) => {
					if(!item.classList.contains('accordion--active')) {

						item.classList.add('accordion--active')
						accordionContent.style.height = "auto"
						var height = accordionContent.clientHeight + "px"
						accordionContent.style.height = "0px"

						setTimeout(() => {
							accordionContent.style.height = height
						}, 0)

						} else {
							accordionContent.style.height = "0px"
								item.classList.remove('accordion--active')
					}

				});
			});

		};
		accordions('.accordion');

});
	
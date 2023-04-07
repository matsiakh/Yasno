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

	//------------------------------SLIDER---------------------------
		var swiper = new Swiper(".mySwiper", {
			freeMode: false,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: '.question__next',
				prevEl: '.question__prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 15
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 30
				},
				900: {
					slidesPerView: 3,
					spaceBetween: 30
				}
			},
		});

	//------------------------------GALLERY---------------------------
	Fancybox.bind('[data-fancybox="gallery"]', {
		hideScrollbar: false,
	});
});
	
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
						if (target == item || target.parentNode == item) {
							hideTabContent();
							showTabContent(i);
						}
					});
				}
			});
		};
		tabs('.tabs', '.tabs__item', '.tabs__wrap', 'tabs__active');

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
		Fancybox.bind('[data-fancybox]', {
			// Your custom options
		});

	//----------------------FORM-----------------------
		const forms = (formsSelector) => {
			const form = document.querySelectorAll(formsSelector);
			let i = 1;
			let img = 1;
			let lebel = 1;
			let prev = 1;

			form.forEach(item => {
				const elem = 'form--' + i++;
				item.classList.add(elem);

				let formId = item.id = (elem);
				let formParent = document.querySelector('#' + formId);

				formParent.addEventListener('submit', formSend);

				async function formSend(e) {
					e.preventDefault();

					let error = formValidate(item);

					let formData = new FormData(item);

					if (error === 0) {
						item.classList.add('_sending');
						let response = await fetch('sendmail.php', {
							method: 'POST',
							body: formData
						});

						if (response.ok) {
							let modalThanks = document.querySelector('#modal__thanks');
							let modalClose = document.querySelectorAll('.modal');

							modalClose.forEach(modalItem => {
								modalItem.classList.remove('active');
							});
							
							modalThanks.classList.add('active');
							item.reset();
							item.classList.remove('_sending');
						} else {
							alert('Ошибка при отправке');
							item.classList.remove('_sending');
						}

					}
				}

				function formValidate(item) {
					let error = 0;
					let formReq = formParent.querySelectorAll('._req');

					for (let index = 0; index < formReq.length; index++) {
						const input = formReq[index];
						if (input.classList.contains('_email')) {
							if(emailTest(input)) {
								formAddErrorEmail(input);
								error++;
							}
						} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
							formAddErrorCheck(input);
							error++;
						} else {
							if (input.value === '') {
								formAddError(input);
								error++;
							}
						}
					}
					return error;
				}

				const formImgFile = formParent.querySelectorAll('.formImgFile');

				formImgFile.forEach(item => { 
					const elem = 'formImgFile--' + i++;

					let formId = item.id = (elem);
					let formParent = document.querySelector('#' + formId);

					const formImage = formParent.querySelector('.formImage');
					const formLebel = formParent.querySelector('.formLebel');
					const formPreview = formParent.querySelector('.formPreview');

					//картинка в форме
					let formImageNumber = 'formImage--' + img++;
					let formPreviewNumber = 'formPreview--' + prev++;
					
					formImage.id = (formImageNumber);
					formLebel.htmlFor = ('formImage--' + lebel++);
					formPreview.id = (formPreviewNumber);
					const formImageAdd = document.querySelector('#' + formImageNumber);

					// изменения в инпуте файл
					formImageAdd.addEventListener('change', () =>  {
						uploadFile(formImage.files[0]);
					});

					function uploadFile(file) {
				
						if (!['image/jpeg', 'image/png', 'image/gif', 'image/ico', 'application/pdf'].includes(file.type)) {
							alert('Только изображения');
							formImage.value = '';
							return;
						}
				
						if (file.size > 2 * 1024 * 1024) {
							alert('Размер менее 2 мб.');
							return;
						}
				
						var reader = new FileReader();
						reader.onload = function (e) {
							if(['application/pdf'].includes(file.type)) {
								formPreview.innerHTML = `Файл выбран`;
							}else{
								formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
							}
							
						};
						reader.onerror = function (e) {
							alert('Ошибка');
						};
						reader.readAsDataURL(file);
					}
				})

				function formAddError(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введите данные в поле";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}

				function formAddErrorEmail(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введите свою почту";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}

				function formAddErrorCheck(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Согласие на обработку персональных данных";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}

				function emailTest(input) {
					return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/. test(input.value);
				}

			});
		};
		forms('.form');


		const header = document.querySelector('.header')
		const footer = document.querySelector('.footer')

		if (header) {
			console.log('yes header')
			header.classList.add('header__top')
			footer.style.fontSize='10px'
			let styleHeader = header.classList
			console.log(styleHeader)
		} else  {
			console.log('no header')
		}
		const div = document.querySelectorAll('div')
		let i = 1++
		div.forEach(item => {
			if (i <= 4) {
				item.classList.add(i)
			}
		});


});
	
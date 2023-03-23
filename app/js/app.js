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
		

});
	
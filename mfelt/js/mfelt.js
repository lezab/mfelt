document.addEventListener('DOMContentLoaded', function() {
	/*-------------------------------------------------*/
	/* Navbars                                         */
	/*-------------------------------------------------*/
	var toobarButtons = document.querySelectorAll('.mf-nav >.navbar-header > .toggle-button');
	for (let i = 0; i < toobarButtons.length; i++) {
		toobarButtons[i].addEventListener('click', function() {
			var id = this.parentElement.parentElement.getAttribute('id');
			var navbar = document.querySelector('#' + id + ' > .navbar');
			if (navbar.style.height) {
				navbar.style.height = null;
			}
			else {
				navbar.style.height = navbar.scrollHeight + "px";
			}
		});
	}
	var dropdowns = document.querySelectorAll('.mf-nav > .navbar > ul > li.dropdown');
	for (let i = 0; i < dropdowns.length; i++) {
		let dropdownContent = dropdowns[i].lastElementChild;
		dropdowns[i].addEventListener('click', function() {
			if (dropdownContent.style.display === 'block') {
				dropdownContent.style.display = 'none';
			}
			else {
				dropdownContent.style.display = 'block';
			}
		});
		window.addEventListener('click', function(event) {
			if(! dropdowns[i].contains(event.target)) {
				dropdownContent.style.display = 'none';
			}
		});
	}
	/*-------------------------------------------------*/
	/* Accordions                                      */
	/*-------------------------------------------------*/
	var accordions = document.querySelectorAll('.mf-accordion');
	for (let i = 0; i < accordions.length; i++) {
		let collapse = accordions[i].hasAttribute("data-mf-collapse");
		let items = accordions[i].querySelectorAll("li");
		for (let j=0; j<items.length; j++) {
			if (j%2==0) {
				items[j].classList.add("mf-accordion-item");
				if(collapse){
					items[j].addEventListener('click', function() {
						for(let k=0; k<items.length; k+=2) {
							if(k != j){
								items[k].classList.remove("opened");
							}
						}
						items[j].classList.toggle("opened");
					});
				}
				else{
					items[j].addEventListener('click', function() {
						items[j].classList.toggle("opened");
					});
				}
			}
			else {
				items[j].classList.add("mf-accordion-content");
			}
		}
	}
	/*-------------------------------------------------*/
	/* Tabs                                            */
	/*-------------------------------------------------*/
	var tabgroups = document.querySelectorAll('.mf-tabs');
	for (let i = 0; i < tabgroups.length; i++) {
		let contents = tabgroups[i].querySelectorAll("div");
		for (let i=0; i<contents.length; i++) {
			contents[i].classList.add("mf-tab-content");
		}
		let items = tabgroups[i].querySelectorAll("ul > li > a");
		for (let j=0; j<items.length; j++) {
			let target = items[j].getAttribute("data-mf-target");
			if(target !== null){
				items[j].addEventListener('click', function(event) {
					event.preventDefault();
					for(let k=0; k<items.length; k++) {
						items[k].parentNode.classList.remove("active");
					}
					items[j].parentNode.classList.add("active");
					let contents = tabgroups[i].querySelectorAll("div");
					for(let k=0; k<contents.length; k++) {
						contents[k].classList.remove("active");
					}
					document.getElementById(target).classList.toggle("active");
				});
			}
		}
	}
	/*-------------------------------------------------*/
	/* Alerts                                          */
	/*-------------------------------------------------*/
	var alerts = document.querySelectorAll('.mf-alert.dismissible');
	for (let i = 0; i < alerts.length; i++) {
		let alert = alerts[i];	
		let dismiss_btns = alert.querySelectorAll('*[data-mf-dismiss]');
		for(let j=0; j<dismiss_btns.length; j++) {
			dismiss_btns[j].addEventListener('click', function() {
				alert.style.display = 'none';
			});
		}
	}
	/*-------------------------------------------------*/
	/* Modals                                          */
	/*-------------------------------------------------*/
	var modal_toggles = document.querySelectorAll('*[data-mf-toggle-modal]');
	for (let i = 0; i < modal_toggles.length; i++) {
		let target = modal_toggles[i].getAttribute("data-mf-target");
		if(target !== null){
			let modal = document.getElementById(target);
			if(modal !== null){
				let dismiss_btns = modal.querySelectorAll('*[data-mf-dismiss]');
				for(let j=0; j<dismiss_btns.length; j++) {
					dismiss_btns[j].addEventListener('click', function() {
						modal.style.display = 'none';
						document.body.classList.remove('mf-modal-open');
					});
				}
				modal_toggles[i].addEventListener('click', function() {
					modal.style.display = 'block';
					document.body.classList.add('mf-modal-open');
				});
				window.addEventListener('click', function(event) {
					if (event.target == modal) {
					  modal.style.display = "none";
					  document.body.classList.remove('mf-modal-open');
					}
				});
			}
		}
	}
});
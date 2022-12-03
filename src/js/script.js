//------ SLIDER -----

const images = document.querySelectorAll('.slider .slider__line img');
const sliderLine = document.querySelector('.slider__line');

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let count = 0;
let width;

function init() {
	width = document.querySelector('.slider').offsetWidth;
	sliderLine.style.width = width * images.length + 'px';
	images.forEach(item => {
		item.style.width = width + 'px';
		item.style.height = 'auto';
	});
	rollSlider();
}
window.addEventListener('resize', init);
init();

document.querySelector('.next').addEventListener('click', function () {
	count++;
	if (count >= images.length) {
		count = 0;
	}
	rollSlider();
});

document.querySelector('.prev').addEventListener('click', function () {
	count--;
	if (count < 0) {
		count = images.length-1;
	}
	rollSlider();
});

function rollSlider() {
	sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}

//Tabs
let tabs = document.querySelectorAll('.catalog__tab');
let catalogItem = document.querySelectorAll('.catalog-item');
let catalogItemContent = document.querySelectorAll('.catalog-item__content');
let catalogList = document.querySelectorAll('.catalog-item__list');

tabs.forEach(item => {
	item.addEventListener('click', selectTab)
});

function selectTab() {
	tabs.forEach(item => {
		item.classList.remove('catalog__tab_active');
		isActive();
	});
	this.classList.add('catalog__tab_active');
	tabName = this.getAttribute('data-tab-name');
	selectItemContent(tabName);
};

function selectItemContent(tabName) {
	catalogItem.forEach(item => {
		item.classList.contains(tabName) ? item.classList.add('catalog-item_active') : item.classList.remove('catalog-item_active');
	})
}

function isActive() {
	catalogItemContent.forEach(item => {
		item.classList.add('catalog-item__content_active');
		catalogList.forEach(item => {
			item.classList.remove('catalog-item__list_active');
		})

	})
}


// Link/back

let link = document.querySelectorAll('.catalog-item__link');
let back = document.querySelectorAll('.catalog-item__back');

let itemContent = document.querySelectorAll('.catalog-item__content');
let itemList = document.querySelectorAll('.catalog-item__list');

link.forEach((item, index) => {
	item.addEventListener('click', function (e) {
		e.preventDefault();
		for (let i = 0; i < itemList.length; i++) {
			itemList[index].classList.add('catalog-item__list_active');
			itemContent[index].classList.remove('catalog-item__content_active');
		};
	})
})

back.forEach((item, index) => {
	item.addEventListener('click', function (e) {
		e.preventDefault();
		for (let i = 0; i < itemList.length; i++) {
			itemContent[index].classList.add('catalog-item__content_active');
			itemList[index].classList.remove('catalog-item__list_active');
		};
	})
})

// Button-consultation

let buttons = document.querySelectorAll('[data-modal="consultation"]');
let overlay = document.querySelector('.overlay');
let modalConsultation = document.getElementById('consultation');
let modalOrder = document.getElementById('order');
let modalThanks = document.getElementById('thanks');



buttons.forEach(item => {
	item.addEventListener('click', function () {
		overlay.style.display = 'block';
		modalConsultation.style.display = 'block';
	});
})

//Close x
const close = document.querySelectorAll('.modal__close');

close.forEach(item => {
	item.addEventListener('click', function () {
		overlay.style.display = 'none';
		modalConsultation.style.display = 'none';
		modalOrder.style.display = 'none';
		modalThanks.style.display = 'none';
	});
})

//Buttons_mini

let buttonsMini = document.querySelectorAll('.button_mini');

buttonsMini.forEach((item, index) => {
	item.addEventListener('click', function () {
		overlay.style.display = 'block';
		modalOrder.style.display = "block";
		
		let modalDescr = document.querySelectorAll('#order .modal__descr');
		let orderSubtitle = document.querySelectorAll('.catalog-item__subtitle');
		
		
		modalDescr.forEach(item => {
			item.textContent = orderSubtitle[index].innerHTML;
		});
	})
})

//Validation
//Tel
var selector = document.querySelectorAll('input[type="tel"]');

var im = new Inputmask("+38 (999)-9999999");
im.mask(selector);

// email

// let validateForms = function (selector, rules, successModal, yaGoal) {
// 	new window.JustValidate(selector, {
// 		rules: rules,
// 		submitHandler: function (form) {
			
// 		}
// 	});
// }

// validateForms('.feed-form', {email: {required: true, email: true}, tel: {required: true}}, '#thanks', 'send goal');

function validateForms(form) {
	$(form).validate({
	rules: {
		name: {
			required: true,
			minlength: 2
		},
		phone: "required", 
		email: {
			required: true,
			email: true,
		} 
	},
	messages: {
		name: {
			required: "Будь ласка, введіть Ваше ім'я",
			minlength: jQuery.validator.format("Введіть щонайменше {0} символи")
		},
		phone: "Будь ласка, введіть Ваш номер телефону",
		email: {
			required: "Будь ласка, введіть Вашу поштову адресу",
			email: "Неправильно введено поштову адресу"
		}
	}
});

}

validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');


//Send
$('form').submit(function(e) {
	e.preventDefault();
	if (!$(this).valid()) {
		return; 
	};
	$.ajax({
		type: "POST",
		url: "mailer/smart.php",
		data: $(this).serialize()
	}).done(function() {
		$(this).find("input").val("");
		$("#consultation, #order").fadeOut();
		$(".overlay, #thanks").fadeIn('slow'); 

		$('form').trigger('reset');
	});
	return false;
});

//Scroll

let pageup = document.querySelector('.pageup');

window.addEventListener('scroll', function () {
	if (window.scrollY >= 1200) {
		pageup.style.display = 'block';
	} else {
		pageup.style.display = 'none';
	};
});	

let reviews = document.querySelectorAll('.review');
console.log(window.scrollY)

window.addEventListener('scroll', function () {
	if (window.scrollY >= 2900) {
		reviews.forEach((item) => {
			item.classList.add('animate__fadeInUp');
			// item[index].classList.add('animate__delay-${[index]+0.5}s');
		})
	}
 });
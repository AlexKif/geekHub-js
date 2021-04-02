document.querySelector('#user-form').addEventListener('submit', function (e) {
	e.preventDefault();

	const setBackground = (isValid, node) => isValid ? node.css('background-color', '#C2E0C6'): node.css('background-color', '#F9D0C4');

	const name = {
		node: jQuery('[name="full_name"]'),
		regExp: /^([А-Яа-яёЁЇїІіЄєҐґ]+\s+){2}[А-Яа-яёЁЇїІіЄєҐґ]+$/
	};

	const email = {
		node: jQuery('[name="email"]'),
		regExp: /^([a-zA-Z0-9]|(?!\.)[a-zA-Z0-9-.]{1,}[a-zA-Z0-9-])@([a-zA-Z0-9-]+[.]+[a-zA-Z0-9-]+)+$/
	};

	const password = {
		node: jQuery('[name="password"]'),
		regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/
	};

	setBackground(name.regExp.test(name.node.val()), name.node);
	setBackground(email.regExp.test(email.node.val()), email.node);
	setBackground(password.regExp.test(password.node.val()), password.node);

});



document.querySelectorAll('[data-show]').forEach(function (button) {
	button.addEventListener('click', function (e) {
		document.querySelector('#description').classList.add('d-none');
		document.querySelector('#preview').classList.add('d-none');

		if (!$(e.currentTarget).hasClass('active')) {
			$(e.currentTarget)
				.addClass('active')
				.siblings(
					$(e.currentTarget).hasClass('active')
				)
				.removeClass('active')
		}

		document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');
	});
});
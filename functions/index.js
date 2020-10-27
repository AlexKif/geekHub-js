document.querySelectorAll('input[name], #formula, #condition').forEach(function (input) {
	input.addEventListener('keyup', function (e) {
		var a1 = document.querySelector('[name="a1"]');
		var b1 = document.querySelector('[name="b1"]');
		var a2 = document.querySelector('[name="a2"]');
		var b2 = document.querySelector('[name="b2"]');
		var formula = document.querySelector('#formula');
		var condition = document.querySelector('#condition');
		var result = document.querySelector('#result');
		var conditionResult;

		try {
			var calculator = new Function('a1, b1, a2, b2', 'return ' + formula.value + ';');
			var checkConditions = new Function('a1, b1, a2, b2', 'return ' + condition.value + ';');

			formula.value.length ? result.value = calculator(Number(a1.value), Number(b1.value), Number(a2.value), Number(b2.value)): null;
			conditionResult = checkConditions(Number(a1.value), Number(b1.value), Number(a2.value), Number(b2.value));

			if (conditionResult) {
				result.style.cssText = "background: #B6D7A8; border: none;";
				if (!formula.value.length) {
					result.value = '';
				}
			} else {
				result.style.background = '#FFFFFF';
			}

		}
		catch (error) {
			result.value = '#ERROR';
			console.error(error.message);
		}
	});
});
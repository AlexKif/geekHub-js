jQuery('input').on('paste', function (e) {
	e.preventDefault();

	resetTable()

	let arrEn = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var text = e.originalEvent.clipboardData.getData('text/plain');
	var input = e.currentTarget;
	var textInArray = text.split(/\n/);
	var result = textInArray.map(item => item.split(';'));
	var horizontalCounter;

	if (jQuery(input).attr('name') === 'b1' || jQuery(input).attr('name') === 'b2') {
		result.forEach(item => {
			if (horizontalCounter) {
				if (item.length > horizontalCounter) {
					horizontalCounter = item.length + 1
				}
			} else {
				horizontalCounter = item.length + 1
			}
		})
	} else {
		result.forEach(item => {
			if (horizontalCounter) {
				if (item.length > horizontalCounter) {
					horizontalCounter = item.length
				}
			} else {
				horizontalCounter = item.length
			}
		})
	}

	for (let i = 0; i<horizontalCounter - 2; i++) {
		jQuery('thead tr').append(`<th>${arrEn[i]}</th>`)
	}

	createTableRows(result, input, horizontalCounter)

});

function createTableRows(data, initialInput, columns) {
	let arrEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	let initialRow = 3;
	let rows = data.length - jQuery(initialInput).closest('tbody').find('tr').length;

	let columnIndex;
	let rowIndex;
	if (jQuery(initialInput).attr('name') === 'a1' || jQuery(initialInput).attr('name') === 'a2') {
		columnIndex = 0
	} else {
		columnIndex = 1
	}

	if (jQuery(initialInput).attr('name') === 'a2' || jQuery(initialInput).attr('name') === 'b2') {
		rowIndex = 1
	} else {
		rowIndex = 0
	}

	if (jQuery(initialInput).attr('name') === 'a1' || jQuery(initialInput).attr('name') === 'b1') {
		for (let i = 0; i < rows; i++) {
			jQuery('tbody').append(`<tr><th>${initialRow}</th></tr>`)
			initialRow++
		}
	} else {
		for (let i = 0; i < rows + 1; i++) {
			jQuery('tbody').append(`<tr><th>${initialRow}</th></tr>`)
			initialRow++
		}
	}

	jQuery('tbody tr').each(function (index, rowItem) {
		for (let i = 0; i <= columns; i++) {
			if (columns - jQuery(rowItem).find('td').length !== 0) {
				jQuery(rowItem).append(`<td><input type="text" /></td>`)
			}
		}
	});

	let dataRowIncrement = 0;
	let dataColumnIncrement = 0;
	jQuery(jQuery(initialInput).closest('tbody')).find('tr').each((itemIndex, item) => {
		if (itemIndex >= rowIndex) {
			jQuery(item).find('td').each(function (elementIndex, element) {
				if (elementIndex >= columnIndex) {
					jQuery(element).find('input').val(data[dataRowIncrement][dataColumnIncrement])
					dataColumnIncrement++
					if (dataColumnIncrement === data[0].length) {
						dataColumnIncrement = 0
					}
				}
			})
			dataRowIncrement++
		}
		jQuery(item).find('td').each(function (elementIndex, element) {
			jQuery(element).find('input').attr('name', `${arrEn[elementIndex]}${itemIndex + 1}`)
		})
		})
}

function resetTable() {
	jQuery('thead tr th').each(function (index, element) {
		if (index > 2) {
			jQuery(element).remove()
		}
	})

	jQuery('tbody tr').each(function (index, item) {
		jQuery(item).find('input').val('')
		if (index < 2) {
			jQuery(item).find('td').each(function (tdIndex, tdItem) {
				if (tdIndex > 1) {
					jQuery(tdItem).remove()
				}
			})
		}
		if (index > 1) {
			jQuery(item).remove()
		}
	})
}


var currentColumn;

jQuery('thead th').not(':first').on('contextmenu', function (e) {
	e.preventDefault();

	currentColumn = e.currentTarget;

	var menu = jQuery('#column-menu');

	menu.addClass('d-block');

	menu.css({
		left: e.clientX,
		top: e.clientY
	});
});

jQuery('#column-menu [data-action]').on('click', function (e) {
	e.preventDefault();

	var action = e.currentTarget.getAttribute('data-action');

	switch (action) {
		case 'add-left':

			break;

		case 'add-right':

			break;

		case 'remove':

			break;
	}

	jQuery('#column-menu').removeClass('d-block');
});
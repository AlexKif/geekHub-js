import React from 'react';

export default function Table(props) {
	const { columns, rows, cell, data } = props;
	console.log(cell, data)
	const arrEn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	const key = () => '_' + Math.random().toString(36).substr(2, 9);

	const createColumns = (columns) => {
		const rows = [<th key={0} data-key={key()}>&nbsp;</th>];
		for (let i = 0; i<columns; i++) {
			rows.push(<th key={i+1} data-key={key()}>{arrEn[i]}</th>);
		}
		return rows;
	}

	const createRows = (rows, columns) => {
		const result = [];
		let rowIndex;
		for (let i = 0; i<rows; i++) {
			rowIndex = i + 1;
			const inputs = [<th key={key()}>{i+1}</th>];
			for (let j = 0; j<columns; j++) {
				inputs.push(<td key={key()}><input type="text" name={arrEn[j].toLowerCase() + rowIndex}/></td>)
			}
			result.push(<tr key={key()}>{[...inputs]}</tr>)
		}
		return result
	}

	return (
		<table>
			<thead>
				<tr>
					{createColumns(columns).map(item => item)}
				</tr>
			</thead>
			<tbody>
				{createRows(rows, columns).map(item => item)}
			</tbody>
		</table>
	);
};
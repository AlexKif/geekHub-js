function Csv() {}

const str = "Lorem Ipsum - це те;кст-\"риб;а\", що ви;користовується в \n" +
  "друкарстві т;а дизайні. ;Lorem Ip;sum є, факти\n" +
  "чно, станд;артною; \"рибою\" аж з XVI; сторіччя, коли не";

const str2 = "Євпак, Вік\tтор Ми,колай,ов\tич;Ф,ОП;1985;Євпак, Віктор\tМик,олай\tовичФОП;1985\n" +
  "Бондаренко\tАнатолій Васил,ьович\t;міський, голова;1974;Бон\tдаренко Анатолій\tВасильо,вич;міський голова;1974\n" +
  "Мойсієнко\tВасиль, Миколайов\tич;перший, проректор;1965;Мойсієнко\tВасиль, Миколайови\tч;перший, проректор;1965";

const str3 = [
  [
    "Lorem Ip" ,
    "sum - це текст-\"ри" ,
    "ба\", що викори" ,
    "стовується в "
  ] ,
  [
    "друкарстві та" ,
    " дизайні. Lorem Ipsu" ,
    "m є, фактично, с" ,
    "тандартною \"рибою\""
  ] ,
  [
    " аж з XVI сторіччя, " ,
    "коли нев" ,
    "ідомий" ,
    " друкар взяв шри"
  ]
]

Csv.prototype.parse = function (string, separator) {
  this.string = string;
  this.separator = separator;

  const strings = this.string.split('\n');

  if (!this.separator) {
    const separators = [/,/g, /;/g, /\t/g];
    const keys = ['coma', 'semicolon', 'tab'];
    let selectedSeparator;
    let filteredCoincidences = {};

    const coincidences = strings.map(str => {
      return separators.map((separator, index) => {
        return {key: keys[index], value: str.match(separator) ? str.match(separator).length: 0}
      });
    });

    coincidences.forEach(row => {
      row.forEach(separator => {
        if (Object.keys(filteredCoincidences).includes(separator.key)) {
          filteredCoincidences = {...filteredCoincidences, [separator.key]: [...filteredCoincidences[separator.key], separator.value]}
        } else {
          filteredCoincidences = {...filteredCoincidences, [separator.key]: [separator.value]}
        }
      })
    })

    for (let key in filteredCoincidences) {
      filteredCoincidences[key].every(element => {
        return element === filteredCoincidences[key][0] && element !== 0
      }) ? selectedSeparator = key: null;
    }

    switch (selectedSeparator) {
      case 'coma':
        return strings.map(str => str.split(','))
      case 'semicolon':
        return strings.map(str => str.split(';'))
      case 'tab':
        return strings.map(str => str.split('\t'))
    }

  } else {
    return strings.map(str => str.split(this.separator))
  }
}

Csv.prototype.generate = function (array, separator) {
  this.array = array;
  this.sep = separator;

  let result = '';

  if (!this.sep) {
    this.array.forEach(arr => {
      result += arr.join(',') + '\n'
    })
  } else {
    this.array.forEach(arr => {
      result += arr.join(separator) + '\n'
    })
  }

  return result;
}


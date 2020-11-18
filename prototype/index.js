function Csv() {
  // this.parse = function (string, separator) {
  //   console.log(string, separator)
  // }
}


const str = "Євпак, Вік\tтор Ми,колай,ович;Ф,ОП;1985;Євпак, ВікторМик,олайович;ФОП;1985\n" +
            "Бондаренко\tАнатолій Васил,ьович;міський, голова;1974;Бондаренко Анатолій\tВасильо,вич;міський голова;1974\n" +
            "Мойсієнко\tВасиль, Миколайов\tич;перший, проректор;1965;Мойсієнко\tВасиль, Миколайови\tч;перший, проректор;1965";

Csv.prototype.parse = function (string, separator) {
  this.string = string;
  this.separator = separator;

  const separators = [/,/g, /;/g, /\t/g];
  let selectedSeparator;
  const names = ['coma', 'semicolon', 'tab'];
  const strings = this.string.split('\n');
  const coincidences = strings.map(str => {
    return separators.map((separator, index) => {
      return {[names[index]]: str.match(separator).length}
    });
  });

  // const sortedCoincidences = coincidences.map(row => {
  //   // console.log(row)
  //   return row.map((separator, index) => {
  //     console.log(separator)
  //     // const propName = Object.getOwnPropertyNames(separator)[0];
  //     // if (names[index] === propName) {
  //     //   return separator
  //     // }
  //     // console.log(separator[names[index]])
  //     // if (separator[index] === ) {
  //     //   return
  //     // }
  //   })
  // })

  const sortedCoincidences = coincidences.map(row => {
    row.forEach((separator, index) => {
      console.log(separator)
    })
  })



  // console.log(sortedCoincidences)
}

const test = new Csv();

const result = test.parse(str);


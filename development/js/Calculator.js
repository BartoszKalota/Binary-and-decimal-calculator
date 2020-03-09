// @abstract
class Calculator {
  constructor(selectorName) {
    this.name = selectorName;
    this.$calculatorDOMElement = $(selectorName);

    this.firstNumberArray = [];
    this.secondNumberArray = [];
    this.resultNumberArray = [0,0,0,0,0,0,0,0,0];
    this.initEvents();
  }

  // Zwraca nazwę kalkulatora (selektor)
  // @return {string}
  getName() {
    return `Hello, I am ${this.name}`;
  }

  // Metoda sprawdzająca jakie cyfry zostały ustawione i dodająca je
  // @return {string}
  checkNumber() {
    const root = this.$calculatorDOMElement;
    const $firstNumber = root.children('.group-number').children('label:first-child');
    const $secondNumber = root.children('.group-number').children('label:nth-child(2)');
    const $resultNumber = root.children('.group-number').children('.result-bit');

    for (let i = $firstNumber.length-1, j = 0; i >= 0; i--, j++) {
      this.firstNumberArray[i] = parseInt( $firstNumber.eq(j).find('.active').text() );
      this.secondNumberArray[i] = parseInt( $secondNumber.eq(j).find('.active').text() );
      this.resultNumberArray[i] = parseInt( $resultNumber.eq(j).find('.active').text() );
    }
    this.resultNumberArray = this.add(this.firstNumberArray, this.secondNumberArray);
  }

  // Ustawia event kliknięcia na cyfrze
  initEvents() {
    this.$calculatorDOMElement.find('.display-number').on('click', e => {
      const parentLabel = $(e.target).parent('.display-number');
      this.changeNumber(parentLabel);
    });
  }
}

export { Calculator };
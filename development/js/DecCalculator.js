import { Calculator } from './Calculator';

class DecCalculator extends Calculator {
  constructor(settings) {
    super(settings);
    console.log( this.getName() );
  }

  // Metoda dodająca cyfry z 2 tablic
  // @param {array} numberX Pierwsza cyfra
  // @param {array} numberY Druga cyfra
  // @return {array}
  add(numberX, numberY) {
    const result = [0,0,0,0,0,0,0,0,0];
    for (let i = numberX.length-1; i >=0; i--) {
      let carryNum = numberX[i] + numberY[i] + result[i];
      if (carryNum > 9) {
        result[i] = carryNum - 10;
        result[i-1] = 1;
      } else {
        result[i] = carryNum;
      }
    }
    return result;
  }

  // Metoda zmieniająca cyfrę
  // @param {jQuery element} root Parent element
  changeNumber(root) {
    const activeElement = root.find('.active');
    activeElement.attr('contenteditable', 'true');
    activeElement.trigger('focus');
    activeElement.on('keyup', e => {
      this.validateNumber(e.target);
      this.$calculatorDOMElement.find('.operator-bar .tooltip').show();
    });
  }

  // Metoda korygująca
  // Umożliwia wprowadzenie tylko 1 cyfry
  // @param {jQuery element} span element
  validateNumber(activeElement) {
    const userNumber = $(activeElement).text();
    
    this.changeLetterToZero(activeElement, userNumber);

    if ( userNumber.length > 1 ) {
      let properValue;
      for (let i = 0; i < userNumber.length; i++) {
        if ( userNumber[i] != 0 ) {
          properValue = userNumber[i];
        }
      }
      $(activeElement).text(properValue);

      this.changeLetterToZero(activeElement, userNumber);
    }
  }

  // Metoda korygująca
  // Zamienia znak inny niż cyfra na 0
  // @param {jQuery element, string} span element, span content
  changeLetterToZero(activeElement, userNumber) {
    if ( isNaN(userNumber) ) {
      $(activeElement).text('0');
    }
  }

  // Metoda zmieniająca wynik
  updateResult() {
    const root = this.$calculatorDOMElement;
    const $resultNumber = root.children('.group-number').children('.result-bit');
    for (let i = this.resultNumberArray.length-1, j = 0; i >= 0; i--, j++) {
      let activeElement = $resultNumber.eq(j).find('.active');
      // W odpowiedniej kolumnie z wynikiem: (1) stworzenie nowego spana z wynikiem, (2) animacja taka jak w kalkulatorze binarnym, (3) usunięcie spana ze starym wynikiem
      if (this.resultNumberArray[i] != $(activeElement).text()) {
        let newResultElement = $(`<span class="display-number__value--one">${this.resultNumberArray[i]}</span>`);
        activeElement.parent().append(newResultElement);
        activeElement.removeClass('active');
        activeElement.siblings().addClass('active');
        $resultNumber.eq(j).children(':first-child').slideToggle(() => {
          $resultNumber.eq(j).children(':first-child').remove();
        });
      }
    }
  }

  // Dziedziczy event kliknięcia na cyfrze
  // Ustawia event kliknięcia na znaku plus, po którym następuje kalkulacja
  initEvents() {
    super.initEvents();
    this.$calculatorDOMElement.find('.operator-bar span').on('click', e => {
      this.checkNumber();
      this.updateResult();
      this.$calculatorDOMElement.find('.operator-bar .tooltip').hide();
    });
  }
}

export { DecCalculator };
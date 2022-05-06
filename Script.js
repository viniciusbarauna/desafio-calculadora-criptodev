const apagarbot = document.querySelector("[data-apagar]");
const limparbot = document.querySelector("[data-limpar]");
const numbotoes = document.querySelectorAll("[data-numero]");
const operacaobotoes = document.querySelectorAll("[data-operador]");
const igualbot = document.querySelector("[data-igual]");

const operacaoAnteriorTextElement = document.querySelector(
  "[data-operacao-anterior]"
);
const operacaoAtualTextElement = document.querySelector(
  "[data-operacao-atual]"
);

class Calculator {
  constructor(operacaoAnteriorTextElement, operacaoAtualTextElement) {
    this.operacaoAnteriorTextElement = operacaoAnteriorTextElement;
    this.operacaoAtualTextElement = operacaoAtualTextElement;
    this.apagar();
  }

  formatarNum(Numero) {
    const stringNumero = Numero.toString();
    const integerDigits = parseFloat(stringNumero.split(".")[0]);
    const decimalDigits = stringNumero.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  limpar() {
    this.operacaoAtual = this.operacaoAtual.toString().slice(0, -1);
  }

  calcular() {
    let resultado;

    const _operacaoAnterior = parseFloat(this.operacaoAnterior);
    const _operacaoAtual = parseFloat(this.operacaoAtual);

    if (isNaN(_operacaoAnterior) || isNaN(_operacaoAtual)) return;

    switch (this.operacao) {
      case "+":
        resultado = _operacaoAnterior + _operacaoAtual;
        break;
      case "-":
        resultado = _operacaoAnterior - _operacaoAtual;
        break;
      case "/":
        resultado = _operacaoAnterior / _operacaoAtual;
        break;
      case "*":
        resultado = _operacaoAnterior * _operacaoAtual;
        break;
      default:
        return;
    }

    this.operacaoAtual = resultado;
    this.operacao = undefined;
    this.operacaoAnterior = "";
  }

  escolhaOperacao(operacao) {
    if (this.operacaoAtual === "") return;

    if (this.operacaoAnterior !== "") {
      this.calcular();
    }

    this.operacao = operacao;
    this.operacaoAnterior = this.operacaoAtual;
    this.operacaoAtual = "";
  }

  anexarNumero(Numero) {
    if (this.operacaoAtual.includes(".") && Numero === ".") return;
    this.operacaoAtual = `${this.operacaoAtual}${Numero.toString()}`;
  }

  apagar() {
    this.operacaoAtual = "";
    this.operacaoAnterior = "";
    this.operacao = undefined;
  }

  atualizarDisplay() {
    this.operacaoAnteriorTextElement.innerText = `${this.formatarNum(
      this.operacaoAnterior
    )} ${this.operacao || ""}`;
    this.operacaoAtualTextElement.innerText = this.formatarNum(
      this.operacaoAtual
    );
  }
}
const calculator = new Calculator(
  operacaoAnteriorTextElement,
  operacaoAtualTextElement
);
for (const Numerobot of numbotoes) {
  Numerobot.addEventListener("click", () => {
    calculator.anexarNumero(Numerobot.innerText);
    calculator.atualizarDisplay();
  });
}
for (const operacaobot of operacaobotoes) {
  operacaobot.addEventListener("click", () => {
    calculator.escolhaOperacao(operacaobot.innerText);
    calculator.atualizarDisplay();
  });
}
limparbot.addEventListener("click", () => {
  calculator.apagar();
  calculator.atualizarDisplay();
});
igualbot.addEventListener("click", () => {
  calculator.calcular();
  calculator.atualizarDisplay();
  alert (JSON.stringify ("Resultado: " + operacaoAtualTextElement.innerHTML))
});
apagarbot.addEventListener("click", () => {
  calculator.limpar();
  calculator.atualizarDisplay();
});

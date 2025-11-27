// Aqui eu defino uma interface MeioPagamento, a ideia da interface é "obrigar" qualquer meio de pagamento
// (cartão, boleto, pix) a ter o método processarPagamento.
interface MeioPagamento {
  processarPagamento(conta: ContaBancaria, valor: number): void;
}

// Essa classe representa uma conta bancária, foi deixado saldo e histórico privados para aplicar o encapsulamento
class ContaBancaria {
  private saldo: number;
  private historico: string[] = [];

  // No construtor eu recebo o titular, o número da conta e o saldo inicial.
  constructor(
    private titular: string,
    private numeroConta: string,
    saldoInicial: number
  ) {
    // aqui eu guardo o saldo inicial
    this.saldo = saldoInicial;
  }

  // Esse getter serve para consultar o saldo da conta
  public getSaldo(): number {
    return this.saldo;
  }

  // Esse método privado altera o saldo internamente.
  private alterarSaldo(valor: number) {
    this.saldo += valor;
  }

  // Esse método é responsável por realizar um pagamento qualquer e registra o pagamento no histórico.
  public pagar(valor: number, descricao: string) {
    if (valor <= 0) {
      throw new Error("Valor inválido.");
    }

    // se o valor for maior que o saldo, bloqueia o pagamento
    if (valor > this.saldo) {
      throw new Error("Saldo insuficiente.");
    }

    this.alterarSaldo(-valor);
    this.historico.push(`Pagamento: R$${valor} - ${descricao}`);
  }

  // Esse método adiciona uma entrada ao histórico da conta.
  public addHistorico(descricao: string) {
    this.historico.push(descricao);
  }

  // Esse método mostra no console todo o histórico de movimentações da conta.
  public exibirHistorico() {
    console.log(`\nHistórico da conta ${this.numeroConta} (${this.titular}):`);
    this.historico.forEach((item) => console.log("- " + item));
  }
}

// Essa classe representa um cartão de crédito.
// Ela implementa a interface MeioPagamento
class CartaoCredito implements MeioPagamento {
  constructor(private numero: string, private limite: number) {}

  // Nesse método eu simulo um pagamento com cartão de crédito.
  processarPagamento(conta: ContaBancaria, valor: number): void {
    if (valor > this.limite) {
      // se o valor for maior que o limite, eu não deixo o pagamento acontecer
      throw new Error("Cartão de crédito sem limite suficiente.");
    }

    // se tiver limite, desconta do limite do cartão
    this.limite -= valor;
    //  conta bancária registrar o pagamento
    conta.pagar(valor, `Pagamento via Cartão de Crédito (${this.numero})`);
  }
}

// classe que representa um cartão de débito.
class CartaoDebito implements MeioPagamento {
  constructor(private numero: string) {}

  processarPagamento(conta: ContaBancaria, valor: number): void {
    conta.pagar(valor, `Pagamento via Cartão de Débito (${this.numero})`);
  }
}

// Essa classe representa um boleto bancário.
// Também segue a interface de MeioPagamento.
class BoletoBancario implements MeioPagamento {
  constructor(private codigoBarras: string) {}

  processarPagamento(conta: ContaBancaria, valor: number): void {
    // aqui eu coloquei uma validação específica de boleto: ele precisa ter um valor mínimo
    if (valor < 10) {
      throw new Error("Boletos devem ter valor mínimo de R$10.");
    }

    //  a conta realizar o pagamento do boleto
    conta.pagar(valor, `Pagamento de Boleto (${this.codigoBarras})`);
  }
}

// classe PIX.
// Também implementa MeioPagamento e recebe uma chave PIX.
class Pix implements MeioPagamento {
  constructor(private chave: string) {}

  processarPagamento(conta: ContaBancaria, valor: number): void {
    // aqui a validação fica toda dentro do método pagar da conta,
    // então eu só mando a conta executar o pagamento via PIX
    conta.pagar(valor, `Pagamento via PIX (chave: ${this.chave})`);
  }
}

// aqui eu crio as 4 contas bancárias diferentes
const conta1 = new ContaBancaria("Eduardo", "001", 1500);
const conta2 = new ContaBancaria("Ana", "002", 800);
const conta3 = new ContaBancaria("Carlos", "003", 2000);
const conta4 = new ContaBancaria("Julia", "004", 500);

// Aqui eu instancio os meios de pagamento que vou usar nos testes.
const credito = new CartaoCredito("5555-4444-3333-2222", 1200);
const debito = new CartaoDebito("1111-2222-3333-4444");
const boleto = new BoletoBancario("84670000001");
const pix = new Pix("eduardo@email.com");

// Aqui eu faço a parte de simulação, usando try/catch
// para capturar erros das validações (como saldo insuficiente, limite, etc.)
try {
  // Pagamento com cartão de crédito na conta1
  credito.processarPagamento(conta1, 300);

  // Pagamento com débito na conta2
  debito.processarPagamento(conta2, 150);

  // Pagamento de boleto na conta3
  boleto.processarPagamento(conta3, 60);

  // Pagamento via PIX na conta4
  pix.processarPagamento(conta4, 100);

  // Abaixo eu faço duas tentativas que vão gerar erro de propósito
  // Aqui eu tento estourar o limite do cartão de crédito.
  try {
    credito.processarPagamento(conta1, 2000);
  } catch (e) {
    console.log("Erro capturado:", (e as Error).message);
  }

  // Aqui eu tento pagar um boleto com valor menor que o mínimo.
  try {
    boleto.processarPagamento(conta3, 5);
  } catch (e) {
    console.log("Erro capturado:", (e as Error).message);
  }

} catch (erro) {
  console.log("Erro:", (erro as Error).message);
}

// historico de cada conta para mostrar todos os pagamentos que foram realmente realizados.
conta1.exibirHistorico();
conta2.exibirHistorico();
conta3.exibirHistorico();
conta4.exibirHistorico();
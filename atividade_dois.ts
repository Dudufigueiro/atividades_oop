abstract class Funcionario {
    nome: string;
    salario: number;
    identificacao: string;

    constructor(nome: string, salario: number, identificacao: string) {
        this.nome = nome;
        this.salario = salario;
        this.identificacao = identificacao;
    }

    abstract calcularSalario(): number;
}

class Gerente extends Funcionario {
    calcularSalario(): number {
        return this.salario * 0.2;
    }
}

class Estagiario extends Funcionario {
    calcularSalario(): number {
        return this.salario;
    }
}

class Desenvolvedor extends Funcionario {
  projetosEntregues: number;

  constructor(nome: string, salario: number, identificacao: string, projetosEntregues: number) {
    super(nome, salario, identificacao);
    this.projetosEntregues = projetosEntregues;
  }

  calcularSalario(): number {
    return this.salario * (1 + this.projetosEntregues * 0.10);
  }
}
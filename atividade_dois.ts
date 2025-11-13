abstract class Funcionario {
  constructor(
    public nome: string,
    public salario: number,
    public identificacao: string
  ) {}

  abstract calcularSalario(): number;
}

class Gerente extends Funcionario {
  calcularSalario(): number {
    return this.salario * 1.2;
  }
}

class Desenvolvedor extends Funcionario {
  constructor(
    nome: string,
    salario: number,
    identificacao: string,
    public projetosEntregues: number
  ) {
    super(nome, salario, identificacao);
  }

  calcularSalario(): number {
    const bonus = 0.1 * this.projetosEntregues;
    return this.salario * (1 + bonus);
  }
}

class Estagiario extends Funcionario {
  calcularSalario(): number {
    return this.salario;
  }
}

const funcionarios: Funcionario[] = [
  new Gerente("Carlos", 8000, "G001"),
  new Gerente("Juliana", 9000, "G002"),
  new Gerente("Paulo", 7500, "G003"),
  new Gerente("Ana", 8500, "G004"),

  new Desenvolvedor("Lucas", 5000, "D001", 3),
  new Desenvolvedor("Mariana", 4800, "D002", 5),
  new Desenvolvedor("João", 5500, "D003", 2),
  new Desenvolvedor("Rafaela", 6000, "D004", 4),

  new Estagiario("Pedro", 2000, "E001"),
  new Estagiario("Fernanda", 2200, "E002"),
  new Estagiario("Luana", 2100, "E003"),
  new Estagiario("Mateus", 1900, "E004"),
];

for (const f of funcionarios) {
  console.log(
    `Funcionário: ${f.nome} | Cargo: ${f.constructor.name} | Salário final: R$ ${f.calcularSalario().toFixed(2)}`
  );
}
// Aqui eu crio uma classe abstrata Funcionario.
abstract class Funcionario {
  // No construtor, eu já recebo e guardo as informações básicas que todo funcionário vai ter
  constructor(
    public nome: string,
    public salario: number,
    public identificacao: string
  ) {}

  // metodo abstrato pois cada tipo de funcionario calcula seu salario de forma diferente
  abstract calcularSalario(): number;
}

// Classe Gerente herda de Funcionario, aqui eu sou obrigado a implementar o método calcularSalario(),
// porque a classe mãe (Funcionario) declarou ele como abstrato.
class Gerente extends Funcionario {
  calcularSalario(): number {
    // multiplico por 1.2 para representar 100% do salário + 20% de bônus
    return this.salario * 1.2;
  }
}

// Classe Desenvolvedor também herda de Funcionario, além dos atributos da classe mãe, 
// o desenvolvedor tem a quantidade de projetos entregues.
class Desenvolvedor extends Funcionario {
  constructor(
    nome: string,
    salario: number,
    identificacao: string,
    public projetosEntregues: number
  ) {
    super(nome, salario, identificacao);
  }

  // Para o desenvolvedor, o salário final é o salário base
  // mais 10% de bônus em cima do salário para cada projeto entregue.
  calcularSalario(): number {
    // cada projeto dá 10% de bônus, então eu calculo um fator de bônus
    const bonus = 0.1 * this.projetosEntregues;
    return this.salario * (1 + bonus);
  }
}

// Classe Estagiario herda de Funcionario, como estagiário recebe apenas o salário fixo, retorna só ele.
class Estagiario extends Funcionario {
  calcularSalario(): number {
    return this.salario;
  }
}

// Aqui eu crio uma lista de Funcionarios.
const funcionarios: Funcionario[] = [
  // 4 gerentes
  new Gerente("Carlos", 8000, "G001"),
  new Gerente("Juliana", 9000, "G002"),
  new Gerente("Paulo", 7500, "G003"),
  new Gerente("Ana", 8500, "G004"),

  // 4 desenvolvedores, cada um com uma quantidade de projetos entregues
  new Desenvolvedor("Lucas", 5000, "D001", 3),
  new Desenvolvedor("Mariana", 4800, "D002", 5),
  new Desenvolvedor("João", 5500, "D003", 2),
  new Desenvolvedor("Rafaela", 6000, "D004", 4),

  // 4 estagiários
  new Estagiario("Pedro", 2000, "E001"),
  new Estagiario("Fernanda", 2200, "E002"),
  new Estagiario("Luana", 2100, "E003"),
  new Estagiario("Mateus", 1900, "E004"),
];

// Aqui eu percorro a lista de funcionários, O ponto principal dessa parte é mostrar o polimorfismo
for (const f of funcionarios) {
  console.log(
    `Funcionário: ${f.nome} | Cargo: ${f.constructor.name} | Salário final: R$ ${f.calcularSalario().toFixed(2)}`
  );
}
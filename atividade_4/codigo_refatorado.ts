class Livro {
  private _disponiveis: number;

  constructor(
    private _id: number,
    private _titulo: string,
    private _autor: string,
    private _ano: number,
    private _categoria: string,
    private _quantidade: number,
    private _preco: number
  ) {
    this._disponiveis = _quantidade;
  }

  get id() { return this._id; }
  get titulo() { return this._titulo; }
  get autor() { return this._autor; }
  get categoria() { return this._categoria; }
  get disponiveis() { return this._disponiveis; }
  get preco() { return this._preco; }

  emprestar(): boolean {
    if (this._disponiveis > 0) {
      this._disponiveis--;
      return true;
    }
    return false;
  }

  devolver(): void {
    if (this._disponiveis < this._quantidade) {
      this._disponiveis++;
    }
  }
}

class Usuario {
  private _ativo: boolean = true;
  private _multas: number = 0;

  constructor(
    private _id: number,
    private _nome: string,
    private _cpf: string,
    private _tipo: "estudante" | "professor" | "comum",
    private _telefone: string
  ) {}

  get id() { return this._id; }
  get nome() { return this._nome; }
  get tipo() { return this._tipo; }
  get ativo() { return this._ativo; }
  get multas() { return this._multas; }
  get telefone() { return this._telefone; }

  adicionarMulta(valor: number) { this._multas += valor; }
  desativar() { this._ativo = false; }
}

class Emprestimo {
  private _devolvido: boolean = false;
  private _multa: number = 0;

  private _dataEmprestimo: Date;
  private _dataDevolucao: Date;

  constructor(
    public readonly id: number,
    public readonly usuario: Usuario,
    public readonly livro: Livro,
    public readonly dias: number,
    public readonly tipo: "normal" | "renovacao" | "expresso",
    public readonly taxaMultaDiaria: number
  ) {
    this._dataEmprestimo = new Date();
    this._dataDevolucao = new Date();
    this._dataDevolucao.setDate(this._dataDevolucao.getDate() + dias);
  }

  get dataEmprestimo() { return this._dataEmprestimo; }
  get dataDevolucao() { return this._dataDevolucao; }
  get multa() { return this._multa; }
  get estaDevolvido() { return this._devolvido; }

  calcularMulta(): number {
    const hoje = new Date();
    if (hoje > this._dataDevolucao) {
      const diasAtraso = Math.floor(
        (hoje.getTime() - this._dataDevolucao.getTime()) / (1000 * 3600 * 24)
      );
      this._multa = diasAtraso * this.taxaMultaDiaria;
      this.usuario.adicionarMulta(this._multa);
    }
    return this._multa;
  }

  finalizarDevolucao() {
    this._devolvido = true;
    this.livro.devolver();
  }

  exibirComprovante() {
    console.log("\nCOMPROVANTE DE EMPRÉSTIMO");
    console.log(`Usuário: ${this.usuario.nome}`);
    console.log(`Livro: ${this.livro.titulo}`);
    console.log(`Data devolução: ${this._dataDevolucao.toLocaleDateString()}`);
    console.log(`Tipo: ${this.tipo}`);
  }
}

class Biblioteca {
  private livros: Livro[] = [];
  private usuarios: Usuario[] = [];
  private emprestimos: Emprestimo[] = [];

  adicionarLivro(livro: Livro) {
    this.livros.push(livro);
  }

  cadastrarUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  buscarLivroPorId(id: number): Livro | undefined {
    return this.livros.find(l => l.id === id);
  }

  buscarUsuarioPorId(id: number): Usuario | undefined {
    return this.usuarios.find(u => u.id === id);
  }

  realizarEmprestimo(
    usuarioId: number,
    livroId: number,
    dias: number,
    tipo: "normal" | "renovacao" | "expresso"
  ) {
    const usuario = this.buscarUsuarioPorId(usuarioId);
    const livro = this.buscarLivroPorId(livroId);

    if (!usuario || !livro) {
      console.log("Usuário ou livro não encontrado!");
      return;
    }

    if (!usuario.ativo) {
      console.log("Usuário inativo!");
      return;
    }

    if (usuario.multas > 0) {
      console.log(`Usuário possui multa pendente de R$${usuario.multas.toFixed(2)}`);
      return;
    }

    if (!livro.emprestar()) {
      console.log("Livro indisponível para empréstimo!");
      return;
    }

    let taxa =
      tipo === "expresso" ? 5 :
      tipo === "renovacao" ? 1 :
      0.5;

    const emprestimo = new Emprestimo(
      this.emprestimos.length + 1,
      usuario,
      livro,
      dias,
      tipo,
      taxa
    );

    this.emprestimos.push(emprestimo);
    emprestimo.exibirComprovante();
  }

  realizarDevolucao(id: number) {
    const emprestimo = this.emprestimos.find(e => e.id === id);
    if (!emprestimo) {
      console.log("Empréstimo não encontrado!");
      return;
    }

    if (emprestimo.estaDevolvido) {
      console.log("Este empréstimo já foi devolvido anteriormente!");
      return;
    }

    const multa = emprestimo.calcularMulta();
    emprestimo.finalizarDevolucao();

    console.log(`\nDEVOLUÇÃO REALIZADA COM SUCESSO`);
    console.log(`Multa: R$${multa.toFixed(2)}\n`);
  }

  gerarRelatorio() {
    console.log("\nRELATÓRIO DA BIBLIOTECA");
    console.log(`Livros cadastrados: ${this.livros.length}`);
    console.log(`Usuários cadastrados: ${this.usuarios.length}`);
    console.log(`Empréstimos realizados: ${this.emprestimos.length}`);
  }
}

const biblioteca = new Biblioteca();

biblioteca.adicionarLivro(
  new Livro(1, "Mais Esperto Que o Diabo", "Napoleon Hill", 1938, "Psicologia", 3, 89.9)
);
biblioteca.adicionarLivro(
  new Livro(2, "Como Fazer Amigos e Influenciar Pessoas", "Dale Carnegie", 1936, "Ficção", 2, 45)
);

biblioteca.cadastrarUsuario(
  new Usuario(1, "Alessandro Luigi", "12345678901", "estudante", "48999999999")
);
biblioteca.cadastrarUsuario(
  new Usuario(2, "Ilvacir Franceschi", "98765432100", "professor", "48988888888")
);

// Testes
biblioteca.realizarEmprestimo(1, 1, 10, "normal");
biblioteca.realizarEmprestimo(2, 2, 5, "expresso");
biblioteca.realizarDevolucao(1);
biblioteca.realizarDevolucao(1);
biblioteca.gerarRelatorio();

// A principal oportunidade de refatoração foi basicamente "quebrar" esse código em classes mais coesas, 
// Por isso, criei as classes Livro, Usuario, Emprestimo e Biblioteca, cada uma com uma responsabilidade bem definida.

// Também aproveitei para aplicar encapsulamento, tornando os atributos sensíveis privados 
// como (_multas, _disponiveis, _ativo) e expondo apenas o que fazia sentido por meio de getters e métodos específicos

// Por fim, se esse codigo ruim não fosse refatorado, a manutenção dele seria dificil de manter,
// porque qualquer alteração poderia impactar diversas partes do código, aumentando o risco de bugs.

// Por fim, a falta de encapsulamento e a exposição direta dos dados tornariam o sistema frágil
// qualquer parte do código poderia alterar o estado dos objetos de forma incorreta, gerando inconsistências
//
//
// Essas melhorias tornam o código legível e fácil de manter.
//
//
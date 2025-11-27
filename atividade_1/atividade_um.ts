// Aqui eu crio a classe Livro, que representa um livro da biblioteca
class Livro {
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
  disponivel: boolean;

  // No construtor eu recebo as infos principais do livro e já marco ele como disponível por padrão
  constructor(titulo: string, autor: string, editora: string, anoPublicacao: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.anoPublicacao = anoPublicacao;
    this.disponivel = true;
  }

  // Esse método tenta emprestar o livro.
  emprestar(): void {
    if (this.disponivel) {
      // aqui eu troco o estado do livro para "emprestado"
      this.disponivel = false;
      console.log(`O livro "${this.titulo}" foi emprestado com sucesso!`);
    } else {
      // se alguém tentar pegar um livro que já está com outra pessoa, eu "bloqueio"
      console.log(`O livro "${this.titulo}" não está disponível para empréstimo.`);
    }
  }

  // Esse método serve para devolver o livro.
  devolver(): void {
    if (!this.disponivel) {
      // aqui eu devolvo o livro para a estante, marcando como disponível de novo
      this.disponivel = true;
      console.log(`O livro "${this.titulo}" foi devolvido e está disponível novamente.`);
    } else {
      console.log(`O livro "${this.titulo}" já estava disponível. Nenhuma ação necessária.`);
    }
  }
}

// A classe Membro representa uma pessoa que ta cadastrada na biblioteca
class Membro {
  nome: string;
  identificacao: string;
  livrosEmprestados: Livro[];

  constructor(nome: string, identificacao: string) {
    this.nome = nome;
    this.identificacao = identificacao;
    this.livrosEmprestados = [];
  }

  // Esse método "tenta" fazer o membro pegar um livro emprestado.
  // Aqui eu uso o método emprestar() da classe Livro e, se der certo, adiciono o livro na lista de livrosEmprestados do membro.
  pegarEmprestado(livro: Livro): void {
    console.log(`\n${this.nome} está tentando pegar o livro: "${livro.titulo}"`);
    if (livro.disponivel) {
      livro.emprestar();
      this.livrosEmprestados.push(livro);
      console.log(`${this.nome} agora possui ${this.livrosEmprestados.length} livro(s) emprestado(s).`);
    } else {
      console.log(`${this.nome} não conseguiu pegar o livro "${livro.titulo}" (indisponível).`);
    }
  }

  // Esse método faz o membro devolver um livro.
  // Primeiro eu verifico se esse livro realmente está na lista de livrosEmprestados.
  // Se estiver, chamo o devolver() do Livro e removo da lista.
  devolverLivro(livro: Livro): void {
    console.log(`\n${this.nome} está tentando devolver o livro: "${livro.titulo}"`);

    const index = this.livrosEmprestados.indexOf(livro);

    if (index !== -1) {
      livro.devolver();
      this.livrosEmprestados.splice(index, 1);
      console.log(`${this.nome} devolveu o livro "${livro.titulo}" com sucesso.`);
    } else {
      console.log(`${this.nome} não possui o livro "${livro.titulo}" emprestado.`);
    }
  }
}

// criado os liros
const livro1 = new Livro("Dom Casmurro", "Machado de Assis", "Editora A", 1899);
const livro2 = new Livro("O Hobbit", "J.R.R. Tolkien", "HarperCollins", 1937);
const livro3 = new Livro("1984", "George Orwell", "Companhia das Letras", 1949);
const livro4 = new Livro("A Revolução dos Bichos", "George Orwell", "Companhia das Letras", 1945);

// criado os membros
const membro1 = new Membro("Eduardo", "M001");
const membro2 = new Membro("Trento", "M002");
const membro3 = new Membro("Ilvacir", "M003");

// abaixo as operações de teste que foi pedidas
membro1.pegarEmprestado(livro1);
membro2.pegarEmprestado(livro1);
membro2.pegarEmprestado(livro2);
membro3.pegarEmprestado(livro3);
membro3.pegarEmprestado(livro4);
membro1.devolverLivro(livro1);
membro2.pegarEmprestado(livro1);
membro3.devolverLivro(livro2);
membro3.devolverLivro(livro3);
membro3.pegarEmprestado(livro3);
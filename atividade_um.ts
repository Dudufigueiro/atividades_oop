class Livro {
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
  disponivel: boolean;

  constructor(titulo: string, autor: string, editora: string, anoPublicacao: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.anoPublicacao = anoPublicacao;
    this.disponivel = true;
  }

  emprestar(): void {
    if (this.disponivel) {
      this.disponivel = false;
      console.log(`O livro "${this.titulo}" foi emprestado com sucesso!`);
    } else {
      console.log(`O livro "${this.titulo}" não está disponível para empréstimo.`);
    }
  }

  devolver(): void {
    if (!this.disponivel) {
      this.disponivel = true;
      console.log(`O livro "${this.titulo}" foi devolvido e está disponível novamente.`);
    } else {
      console.log(`O livro "${this.titulo}" já estava disponível. Nenhuma ação necessária.`);
    }
  }
}

class Membro {
  nome: string;
  identificacao: string;
  livrosEmprestados: Livro[];

  constructor(nome: string, identificacao: string) {
    this.nome = nome;
    this.identificacao = identificacao;
    this.livrosEmprestados = [];
  }

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

const livro1 = new Livro("Dom Casmurro", "Machado de Assis", "Editora A", 1899);
const livro2 = new Livro("O Hobbit", "J.R.R. Tolkien", "HarperCollins", 1937);
const livro3 = new Livro("1984", "George Orwell", "Companhia das Letras", 1949);
const livro4 = new Livro("A Revolução dos Bichos", "George Orwell", "Companhia das Letras", 1945);

const membro1 = new Membro("Eduardo", "M001");
const membro2 = new Membro("Trento", "M002");
const membro3 = new Membro("Ilvacir", "M003");

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
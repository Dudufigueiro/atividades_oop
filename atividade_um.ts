class Livro {
    titulo: string
    autor: string;
    editora: string;
    anoPublicacao: number;
    disponivel: boolean;

    constructor(titulo: string, autor: string, editor: string, anoPublicacao: number, disponivel: boolean) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editor;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = disponivel;
    }
}
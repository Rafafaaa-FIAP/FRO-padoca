const produtos = [];

const btnCadastrar = document.querySelector('#cadastrar');

btnCadastrar.addEventListener('click', cadastrarProduto);

function cadastrarProduto() {
    const nome = document.querySelector('#nome').value;
    const preco = document.querySelector('#preco').value;
    const quantidade = document.querySelector('#quantidade').value;

    const produto = {
        nome,
        preco,
        quantidade
    };

    produtos.push(produto);

    alert('Produto cadastrado com sucesso!');

    listarProdutos();
}

function listarProdutos() {
    const tbodyProdutos = document.querySelector('#tbody-produtos');

    tbodyProdutos.innerHTML = '';

    for(let i = 0; i < produtos.length; i++) {
        tbodyProdutos.innerHTML += `
            <tr>
                <td>${produtos[i].nome}</td>
                <td>${produtos[i].preco}</td>
                <td>${produtos[i].quantidade}</td>
            </tr>
        `
    }
}

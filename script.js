const produtos = [];
let id = 0;
let foundId;

// CRUD - Create Read Update Delete

const btnCadastrar = document.querySelector('#cadastrar');
const btnNovoProduto = document.querySelector('#new-product');
const btnAtualizar = document.querySelector('#update');

btnCadastrar.addEventListener('click', cadastrarProduto);
btnNovoProduto.addEventListener('click', toggleFormInsert);
btnAtualizar.addEventListener('click', updateProduct);

function cadastrarProduto() {
    id += 1;
    const nome = document.querySelector('#nome').value;
    const preco = document.querySelector('#preco').value;
    const quantidade = document.querySelector('#quantidade').value;

    const produto = {
        id,
        nome,
        preco,
        quantidade
    };

    produtos.push(produto);

    toggleFormInsert();
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
                <td>
                    <button onclick="deleteProduct(${produtos[i].id});">Excluir</button>
                </td>
                <td>
                    <button onclick="getInfoProduct(${produtos[i].id});">Atualizar</button>
                </td>
            </tr>
        `
    }
}

function deleteProduct(id) {
    for(let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === id) {
            produtos.splice(i, 1);
            break;
        }
    }

    listarProdutos();
}

function toggleFormInsert() {
    const formInsert = document.querySelector('#form-insert');

    formInsert.classList.toggle('display-none');
    formInsert.classList.toggle('display-flex');
}

function toggleFormUpdate() {
    const formUpdate = document.querySelector('#form-update');

    formUpdate.classList.toggle('display-none');
    formUpdate.classList.toggle('display-flex');
}

function getInfoProduct(id) {
    foundId = id;
    toggleFormUpdate();

    for(let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === id) {
            document.querySelector('#nomeUpdate').value = produtos[i].nome;
            document.querySelector('#precoUpdate').value = produtos[i].preco;
            document.querySelector('#quantidadeUpdate').value = produtos[i].quantidade;
            break;
        }
    }
}

function updateProduct() {
    for(let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === foundId) {
            produtos[i].nome = document.querySelector('#nomeUpdate').value;
            produtos[i].preco = document.querySelector('#precoUpdate').value;
            produtos[i].quantidade = document.querySelector('#quantidadeUpdate').value;
            toggleFormUpdate();
            break;
        }
    }

    listarProdutos();
}

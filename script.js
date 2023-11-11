const products = [];
let id = 0;
let foundId;

const btnNewProduct = document.querySelector('#new-product');
btnNewProduct.addEventListener('click', toggleFormNew);

const btnRegisterProduct = document.querySelector('#register-product');
btnRegisterProduct.addEventListener('click', registerProduct);

const btnUpdateProduct = document.querySelector('#update-product');
btnUpdateProduct.addEventListener('click', updateProduct);

function toggleModal(id_modal) {
    document.querySelector('body').classList.toggle('block-scroll');
    const modalContainer = document.querySelector(id_modal);

    modalContainer.classList.toggle('display-none');
    modalContainer.classList.toggle('display-flex');
}

function toggleFormNew() {
    toggleModal('#product-modal');

    btnRegisterProduct.classList.remove('display-none');
    btnUpdateProduct.classList.add('display-none');
}

function showProducts() {
    const tbodyProducts = document.querySelector('#tbody-products');

    tbodyProducts.innerHTML = '';

    for(let i = 0; i < products.length; i++) {
        tbodyProducts.innerHTML += `
            <tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].quantity}</td>
                <td>
                    <button class="default-button" onclick="deleteProduct(${products[i].id});">Excluir</button>
                    <button class="default-button" onclick="getInfoProduct(${products[i].id});">Atualizar</button>
                </td>
            </tr>
        `
    }
}

function registerProduct() {
    id++;

    const name = document.querySelector('#product-name').value;
    const price = document.querySelector('#product-price').value;
    const quantity = document.querySelector('#product-quantity').value;

    const product = {
        id,
        name,
        price,
        quantity
    };

    products.push(product);

    toggleFormNew();
    showProducts();
}

function updateProduct() {

}



// const btnCadastrar = document.querySelector('#cadastrar');
// const btnAtualizar = document.querySelector('#update');

// btnCadastrar.addEventListener('click', cadastrarProduto);

// btnAtualizar.addEventListener('click', updateProduct);

// function deleteProduct(id) {
//     for(let i = 0; i < produtos.length; i++) {
//         if (produtos[i].id === id) {
//             produtos.splice(i, 1);
//             break;
//         }
//     }

//     listarProdutos();
// }

// function toggleFormInsert() {
//     const formInsert = document.querySelector('#form-insert');

//     formInsert.classList.toggle('display-none');
//     formInsert.classList.toggle('display-flex');
// }

// function toggleFormUpdate() {
//     const formUpdate = document.querySelector('#form-update');

//     formUpdate.classList.toggle('display-none');
//     formUpdate.classList.toggle('display-flex');
// }

// function getInfoProduct(id) {
//     foundId = id;
//     toggleFormUpdate();

//     for(let i = 0; i < produtos.length; i++) {
//         if (produtos[i].id === id) {
//             document.querySelector('#nomeUpdate').value = produtos[i].nome;
//             document.querySelector('#precoUpdate').value = produtos[i].preco;
//             document.querySelector('#quantidadeUpdate').value = produtos[i].quantidade;
//             break;
//         }
//     }
// }

// function updateProduct() {
//     for(let i = 0; i < produtos.length; i++) {
//         if (produtos[i].id === foundId) {
//             produtos[i].nome = document.querySelector('#nomeUpdate').value;
//             produtos[i].preco = document.querySelector('#precoUpdate').value;
//             produtos[i].quantidade = document.querySelector('#quantidadeUpdate').value;
//             toggleFormUpdate();
//             break;
//         }
//     }

//     listarProdutos();
// }

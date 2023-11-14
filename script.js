const products = [];
let foundId;

const btnNewProduct = document.querySelector('#new-product');
btnNewProduct.addEventListener('click', toggleFormNew);

const btnCreateProduct = document.querySelector('#create-product');
btnCreateProduct.addEventListener('click', createProduct);

const btnUpdateProduct = document.querySelector('#update-product');
btnUpdateProduct.addEventListener('click', updateProduct);

readProducts();

function toggleModal(id_modal) {
    document.querySelector('body').classList.toggle('block-scroll');
    const modalContainer = document.querySelector(id_modal);

    modalContainer.classList.toggle('display-none');
    modalContainer.classList.toggle('display-flex');
}

function toggleFormNew() {
    toggleModal('#product-modal');

    setFormInputs('clean');

    btnCreateProduct.classList.remove('display-none');
    btnUpdateProduct.classList.add('display-none');
}

function toggleFormUpdate(id) {
    toggleModal('#product-modal');

    setFormInputs(id);

    btnCreateProduct.classList.add('display-none');
    btnUpdateProduct.classList.remove('display-none');
}

function setFormInputs(id) {
    const h2Elem = document.querySelector('#product-modal .modal-header h2');

    if (id === 'clean') {
        h2Elem.innerHTML = 'Novo Produto';

        const inputList = document.querySelectorAll('#product-form input');

        for (let i = 0; i < inputList.length; i++) {
            inputList[i].value = '';
        }
    }
    else {
        h2Elem.innerHTML = 'Alterar Produto';

        const product = products.find(x => x.id === id);

        foundId = product.id;
        document.querySelector('#product-name').value = product.name;
        document.querySelector('#product-price').value = product.price;
        document.querySelector('#product-quantity').value = product.quantity;
    }
}

function checkFormData() {
    let ret = true;

    const name = document.querySelector('#product-name');
    if (name.value.trim() === '') {
        
    }

    return ret;
}

function readProducts() {
    const tbodyProducts = document.querySelector('#tbody-products');

    tbodyProducts.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        tbodyProducts.innerHTML += `
            <tr>
                <td class="left">${products[i].name}</td>
                <td class="right">${products[i].price}</td>
                <td class="right">${products[i].quantity}</td>
                <td class="center">
                    <button class="default-button" onclick="deleteProduct(${products[i].id});">Excluir</button>
                    <button class="default-button" onclick="toggleFormUpdate(${products[i].id});">Atualizar</button>
                </td>
            </tr>
        `
    }
}

function createProduct() {
    const id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
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

    toggleModal('#product-modal');
    readProducts();
}

function updateProduct() {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === foundId) {
            products[i].name = document.querySelector('#product-name').value;
            products[i].price = document.querySelector('#product-price').value;
            products[i].quantity = document.querySelector('#product-quantity').value;
            break;
        }
    }

    toggleModal('#product-modal');
    readProducts();
}

function deleteProduct(id) {
    if (confirm('Deseja realmente excluir esse produto?')) {
        for(let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                break;
            }
        }
    
        readProducts();
    }
}

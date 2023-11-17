const products = []; // Criar uma constante array para armazenar todos os produtos
let foundId; // Variável para armazenar o ID do produto selecionado

// Utiliza a função querySelector para buscar no DOM da página o elemento parametrizado e depois utiliza a função addEventListener para ficar lendo esse elemento e quando houver um evento de click nele chama a função parametrizada
const btnNewProduct = document.querySelector('#new-product');
btnNewProduct.addEventListener('click', toggleFormNew);

const btnCreateProduct = document.querySelector('#create-product');
btnCreateProduct.addEventListener('click', createProduct);

const btnUpdateProduct = document.querySelector('#update-product');
btnUpdateProduct.addEventListener('click', updateProduct);

readProducts();

// Cria uma função para mostrar e esconder o modal de cadastrar/alterar produto
function toggleModal(id_modal) {
    // classList é a lista que contém todas as classes de um elemento e a função toggle adiciona ou remove a classe parametrizada dependo se ela existe ou não na classList
    document.querySelector('body').classList.toggle('block-scroll');

    const modalContainer = document.querySelector(id_modal);
    modalContainer.classList.toggle('display-none');
    modalContainer.classList.toggle('display-flex');

    // Utiliza a função querySelectorAll para buscar todos elementos encontrados no DOM da página com o que foi parametrizado e depois percorre a lista de elementos e utiliza a função remove para remover a classe parametrizada da classList do elemento atual
    const invalidInputs = document.querySelectorAll('input.invalid');
    for (let i = 0; i < invalidInputs.length; i++) {
        invalidInputs[i].classList.remove('invalid');
    }
}

// Cria uma função para deixar o modal da maneira que precisa estar para cadastrar um novo produto chamando uma função para limpar os inputs, mostrando o botão de cadastrar e escondendo o botão de altear
function toggleFormNew() {
    toggleModal('#product-modal');

    setFormInputs('clean');

    btnCreateProduct.classList.remove('display-none');
    btnUpdateProduct.classList.add('display-none');
}

// Cria uma função para deixar o modal da maneira que precisa estar para alterar um produto chamando uma função para colocar os dados do produto selecionado nos inputs, mostrando o botão de alterar e escondendo o botão de cadastrar
function toggleFormUpdate(id) {
    toggleModal('#product-modal');

    setFormInputs(id);

    btnCreateProduct.classList.add('display-none');
    btnUpdateProduct.classList.remove('display-none');
}

// Cria uma função para limpar ou atribuir os dados do produto selecionado nos inputs dependendo do parâmetro passado, além que alterar o título do modal
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

        // Utiliza a função find que localiza o primeiro elemento de um array que se encontre nas condições estabelecidas, nesse caso, localizado o produto que tenha o id igual ao id parametrizado
        const product = products.find(x => x.id === id);

        foundId = product.id;
        document.querySelector('#product-name').value = product.name;
        document.querySelector('#product-price').value = product.price;
        document.querySelector('#product-quantity').value = product.quantity;
    }
}

// Cria uma função para checar se os dados digitados nos inputs são válidos ou não
function checkFormData() {
    let ret = true;

    // Cria uma constante que contenha o campo que será verificado e verifica se o campo está em branco, utilizando a função trim para remover espaços a esquerda e a direita do texto. Caso seja inválido adiciona a classe invalid no elemento, caso contrário remove a mesma classe
    const name = document.querySelector('#product-name');
    if (name.value.trim() === '') {
        ret = false;
        name.classList.add('invalid');
    }
    else {
        name.classList.remove('invalid');
    }

    // Faz a mesma verificação que o anterior, porém também utiliza a função isFinite para verificar se o que foi digitado é um número ou não. Caso não seja, adiciona a classe invalid no elemento, caso contrário remove a mesma classe
    const price = document.querySelector('#product-price');
    if (price.value.trim() === '' || !isFinite(price.value)) {
        ret = false;
        price.classList.add('invalid');
    }
    else {
        price.classList.remove('invalid');
    }

    const quantity = document.querySelector('#product-quantity');
    if (quantity.value.trim() === '' || !isFinite(quantity.value)) {
        ret = false;
        quantity.classList.add('invalid');
    }
    else {
        quantity.classList.remove('invalid');
    }

    return ret;
}

// Cria uma função para ler todos os produtos cadastrado e exibir em tela
function readProducts() {
    const tbodyProducts = document.querySelector('#tbody-products');

    // Limpa o HTML do elemento
    tbodyProducts.innerHTML = '';

    // Percorre a lista de produtos adicionando uma linha na tabela para cada elemento da lista
    for (let i = 0; i < products.length; i++) {
        tbodyProducts.innerHTML += `
            <tr>
                <td class="left">${products[i].name}</td>
                <td class="right">${products[i].price}</td>
                <td class="right">${products[i].quantity}</td>
                <td class="center display-flex-center">
                    <button class="image-button" onclick="toggleFormUpdate(${products[i].id});">
                        <img alt="trash" src="./images/edit.png">
                    </button>
                    <button class="image-button" onclick="deleteProduct(${products[i].id});">
                        <img alt="edit" src="./images/trash.png">
                    </button>
                </td>
            </tr>
        `
    }
}

// Cria uma função para cadastrar um produto
function createProduct() {
    // Chama a checkFormData para chegar os dados dos inputs e lê seu retorno, sendo que true é para quando os dados estão corretos e false para quando não estão
    if (checkFormData()) {
        // Cria constantes para depois criar o objeto do produto a ser cadastrado. Para o id do produto, verifica com operador ternário se o tamanho da lista de produtos é 0, se for o id será 1 (ou seja, o primeiro produto cadastrado), se não for, pega o id do último produto cadastrado e adiciona 1
        const id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
        const name = document.querySelector('#product-name').value;
        const price = document.querySelector('#product-price').value;
        const quantity = document.querySelector('#product-quantity').value;

        // Cria o objeto do produto a ser cadastrado.
        const product = {
            id,
            name,
            price,
            quantity
        };

        // Adiciona na lista de produtos o objeto do produto criado
        products.push(product);

        // Chama a função para esconder o modal e chama a função de ler e exibir os produtos cadastrados
        toggleModal('#product-modal');
        readProducts();
    }
}

// Cria uma função para alterar um produto
function updateProduct() {
    // Chama a checkFormData para chegar os dados dos inputs e lê seu retorno, sendo que true é para quando os dados estão corretos e false para quando não estão
    if (checkFormData()) {
        // Percorre a lista de produtos verificando se o id do elemento atual da lista é igual ao id do produto a ser alterado
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === foundId) {
                // Altera os dados do elemento da lista para os valores digitados no input e para a execução do for utilizando o break
                products[i].name = document.querySelector('#product-name').value;
                products[i].price = document.querySelector('#product-price').value;
                products[i].quantity = document.querySelector('#product-quantity').value;
                break;
            }
        }
    
        // Chama a função para esconder o modal e chama a função de ler e exibir os produtos cadastrados
        toggleModal('#product-modal');
        readProducts();
    }
}

// Cria uma função para deletar um produto
function deleteProduct(id) {
    // Utiliza a função confirm para pedir uma confirmação para o usuário
    if (confirm('Deseja realmente excluir esse produto?')) {
        // Caso o usuário tenha confirmado, percorre a lista de produtos verificando se o id do elemento atual da lista é igual ao id do produto a ser deletado
        for(let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                // Deleta o elemento da lista utilizando a função splice que recebe como parâmetro o index a ser deletado e quantos elementos serão deletados a partir desse index, além disso para a execução do for utilizando o break
                products.splice(i, 1);
                break;
            }
        }
    
        // Chama a função de ler e exibir os produtos cadastrados
        readProducts();
    }
}

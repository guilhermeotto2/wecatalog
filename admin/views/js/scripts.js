let produtoSelecionado;
const imagemPadrao = './img/semFoto.png'; // Caminho da imagem padrão

// Função para ajustar estoque
function ajustarEstoque(idProduto, quantidade) {
    const elementoEstoque = document.getElementById(`estoque-produto-${idProduto}`);
    let estoqueAtual = parseInt(elementoEstoque.innerText);
    
    estoqueAtual += quantidade;

    if (estoqueAtual < 0) {
        alert("O estoque não pode ser negativo!");
        return;
    }

    elementoEstoque.innerText = estoqueAtual;

    const elementoStatus = document.getElementById(`status-${idProduto}`);
    if (estoqueAtual === 0) {
        elementoStatus.innerHTML = '<span class="badge badge-danger">Esgotado</span>';
    } else {
        elementoStatus.innerHTML = '<span class="badge badge-success">Disponível</span>';
    }
}

// Função para adicionar produto
function adicionarProduto() {
    const idProduto = document.querySelectorAll('.cartao-produto').length + 1;

    const novoProduto = document.createElement('div');
    novoProduto.classList.add('col-md-4', 'mb-4');
    novoProduto.id = `produto-${idProduto}`;

    novoProduto.innerHTML = `
        <div class="cartao-produto card">
            <img src="${imagemPadrao}" alt="Produto ${idProduto}" id="imagem-produto-${idProduto}" class="card-img-top img-fluid">
            <div class="card-body">
                <h5 class="card-title" id="nome-produto-${idProduto}">Produto ${idProduto}</h5>
                <p class="card-text mb-0">Estoque: <span id="estoque-produto-${idProduto}">0</span> unidades</p>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text mb-0">Preço: R$ <span id="preco-produto-${idProduto}">0.00</span></p>
                    <p class="status mb-0" id="status-${idProduto}">
                    <span class="badge badge-danger">Esgotado</span>
                    </p>
                </div>
                <br>
                <div class="d-flex justify-content-between flex-wrap">
                    <button class="btn btn-outline-secondary mb-2" onclick="abrirModal(${idProduto})">Mudar Nome</button>
                    <button class="btn btn-outline-secondary mb-2" onclick="abrirModalPreco(${idProduto})">Mudar Preço</button>
                    <button class="btn btn-outline-primary mb-2" onclick="ajustarEstoque(${idProduto}, 1)">Adicionar +1</button>
                    <button class="btn btn-outline-danger mb-2" onclick="ajustarEstoque(${idProduto}, -1)">Remover -1</button>
                </div>

                <div class="d-flex justify-content-between flex-wrap mt-3">
                    <div class="upload d-flex" style="flex: 1;">
                        <label for="upload-imagem-${idProduto}" class="btn btn-outline-info mb-2" style="width: 100%;">Alterar Imagem</label>
                        <input type="file" id="upload-imagem-${idProduto}" class="input-file" style="display:none;" onchange="uploadImagem(${idProduto})">
                    </div>
                    <button class="btn btn-danger mb-2" style="width: 100%;" onclick="excluirProduto(${idProduto})">Excluir Produto</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('lista-produtos').appendChild(novoProduto);
}

// Função para abrir modal de nome
function abrirModal(idProduto) {
    produtoSelecionado = idProduto;
    $('#modalMudarNome').modal('show');
}

// Função para abrir modal de preço
function abrirModalPreco(idProduto) {
    produtoSelecionado = idProduto;
    $('#modalMudarPreco').modal('show');
}

// Função para salvar nome do produto
function salvarNomeProduto() {
    const novoNome = document.getElementById('novo-nome-produto').value;
    if (novoNome.trim()) {
        document.getElementById(`nome-produto-${produtoSelecionado}`).innerText = novoNome;
        $('#modalMudarNome').modal('hide');
    } else {
        alert("Nome não pode ser vazio!");
    }
}

// Função para salvar preço do produto
function salvarPrecoProduto() {
    const novoPreco = parseFloat(document.getElementById('novo-preco-produto').value).toFixed(2);
    if (novoPreco >= 0) {
        document.getElementById(`preco-produto-${produtoSelecionado}`).innerText = novoPreco;
        $('#modalMudarPreco').modal('hide');
    } else {
        alert("O preço não pode ser negativo!");
    }
}

// Função para excluir produto
function excluirProduto(idProduto) {
    const produto = document.getElementById(`produto-${idProduto}`);
    produto.remove();
}

// Função para upload de imagem
function uploadImagem(idProduto) {
    const input = document.getElementById(`upload-imagem-${idProduto}`);
    const imagemProduto = document.getElementById(`imagem-produto-${idProduto}`);
    
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemProduto.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// Bloqueia alerts nativos em todo o site
window.alert = function(message) {
    console.log("Alert bloqueado: ", message);
    // Ou chame sua notificação personalizada:
    mostrarNotificacaoPersonalizada(message);
};
// Carrinho de Compras
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar ao carrinho
function adicionarAoCarrinho(nome, preco, imagem) {
    const item = { nome, preco, imagem };
    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    // Criar notificação personalizada
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.innerHTML = `<span>${nome}</span> foi adicionado ao carrinho!`;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.classList.add('fade-out');
        setTimeout(() => notificacao.remove(), 500);
    }, 2000);
    
    atualizarCarrinho();
    
}
 // Função para atualizar o contador do carrinho
 function atualizarContadorCarrinho() {
    const contador = document.getElementById('contador-carrinho');
    contador.textContent = carrinho.length;
}
// Inicialize o contador ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
    atualizarContadorCarrinho(); // Adicione esta linha
});
// Chame esta função sempre que o carrinho for atualizado
function adicionarAoCarrinho(nome, preco, imagem) {
    const item = { nome, preco, imagem };
    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho(); // Atualiza o contador
    // ... (seu código existente de notificação)
}

// Função para atualizar o carrinho na página
function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalElement = document.getElementById('total');
    
    itensCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        totalElement.textContent = 'Kz 0,00';
        return;
    }

    let total = 0;
    carrinho.forEach((item, index) => {
        // Remove "Kz" e converte para número
        const valorNumerico = parseFloat(item.preco.replace('Kz', '').replace(/\./g, '').replace(',', '.'));
        total += valorNumerico;
        
        itensCarrinho.innerHTML += `
            <div class="item-carrinho">
                <img src="${item.imagem}" alt="${item.nome}">
                <div>
                    <h3>${item.nome}</h3>
                    <p>${item.preco}</p>
                </div>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            </div>
        `;
    });

    // Formata o total com separador de milhares e 2 decimais
    totalElement.textContent = 'Kz ' + total.toLocaleString('pt-AO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).replace('.', ',');
}
// Finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    alert('Funcionalidade temporariamente indisponível.');
});

// Validação de formulário (exemplo para login.html)
document.querySelector('.form-box form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (!email.includes('@')) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    alert('Formulário enviado com sucesso!');
});

// Efeitos dinâmicos (hover em botões)
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Filtro de produtos (exemplo)
document.querySelector('.barra-pesquisa')?.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        const nome = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = nome.includes(termo) ? 'block' : 'none';
    });
});

// Detalhes do produto (modal)
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const nome = card.querySelector('h3').textContent;
        const preco = card.querySelector('p').textContent;
        const imagem = card.querySelector('img').src;
        
        // Modal de detalhes (simplificado)
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        
        modal.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 10px; max-width: 500px;">
                <h2>${nome}</h2>
                <img src="${imagem}" alt="${nome}" style="max-width: 100%;">
                <p>${preco}</p>
                <p>Descrição detalhada do produto aqui...</p>
                <button onclick="adicionarAoCarrinho('${nome}', '${preco}', '${imagem}')">Adicionar ao Carrinho</button>
                <button onclick="this.closest('div').remove()">Fechar</button>
                <button onclick="alert('Funcionalidade temporariamente indisponível.')">Comprar Agora</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    });
});

// Inicializar carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarCarrinho);

// Validação do formulário de contacto
document.getElementById('form-contato')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simula envio
    setTimeout(() => {
        const mensagemSucesso = document.getElementById('mensagem-sucesso');
        mensagemSucesso.style.display = 'block';
        this.reset();
        
        setTimeout(() => {
            mensagemSucesso.style.display = 'none';
        }, 3000);
    }, 1000);
});
function removerDoCarrinho(index) {
    // Remove o item do array carrinho
    carrinho.splice(index, 1);
    
    // Atualiza o localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    // Recarrega a exibição do carrinho
    atualizarCarrinho();
    
    // Mostra notificação
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao-remover';
    notificacao.textContent = 'Item removido do carrinho!';
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.remove();
    }, 2000);
}
document.getElementById('finalizar-compra')?.addEventListener('click', () => {
    const mensagem = document.createElement('div');
    mensagem.className = 'notificacao-finalizar';
    mensagem.innerHTML = `
        <span>Funcionalidade temporariamente indisponível</span>
        <p>Estamos trabalhando para melhorar sua experiência!</p>
    `;
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.remove();
    }, 3000);
});


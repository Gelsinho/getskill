// Função para limitar a frequência de execução de um callback
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Função principal para iniciar o aplicativo
function runApp() {
    resizeMenu(); // Ajusta o menu com base no tamanho inicial da janela

    // Adiciona um ouvinte de eventos para redimensionamento da janela, com limitação de frequência
    $(window).resize(throttle(resizeMenu, 200));

    // Adiciona um ouvinte de eventos para o clique no botão de alternar menu
    $('#toggleMenu').click(toggleMenu);
}

// Ajusta a visibilidade do menu com base na largura da janela
function resizeMenu() {
    if (window.innerWidth >= 600) {
        showMenu(true); // Mostra o menu e o efeito de fumaça se o parâmetro for falso
    } else {
        hideMenu(); // Oculta o menu e o efeito de fumaça para telas menores
    }
}

// Alterna a visibilidade do menu ao clicar no botão
function toggleMenu() {
    if ($('#wrap>nav').is(':visible')) {
        hideMenu(); // Se o menu está visível, oculta-o
    } else {
        showMenu(false); // Caso contrário, mostra o menu com o efeito de fumaça
    }
    return false; // Previne o comportamento padrão do clique
}

// Mostra o menu com ou sem o efeito de fumaça
function showMenu(noSmoke) {
    $('#wrap>nav').fadeIn('fast'); // Mostra o menu com uma transição rápida

    if (noSmoke) {
        $('#menuSmoke').fadeOut('fast'); // Oculta o efeito de fumaça
        $('body').removeClass('no-scroll'); // Permite rolagem do corpo
    } else {
        $('#menuSmoke').fadeIn('fast'); // Mostra o efeito de fumaça
        $('body').addClass('no-scroll'); // Previne rolagem do corpo
    }
}

// Oculta o menu e o efeito de fumaça
function hideMenu() {
    $('#wrap>nav').fadeOut('fast'); // Oculta o menu com uma transição rápida
    $('#menuSmoke').fadeOut('fast'); // Oculta o efeito de fumaça
    $('body').removeClass('no-scroll'); // Permite rolagem do corpo
}

// Inicializa o aplicativo quando o DOM estiver totalmente carregado
$(document).ready(runApp);

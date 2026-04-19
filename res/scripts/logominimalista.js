/**
 * Script para exibição do Logotipo "V" Dourado
 * Permite renderizar o logo com escala dinâmica e sem fundo.
 */

(function() {
    // 1. Carregar dependências (Google Fonts para o estilo Playfair)
    if (!document.getElementById('google-fonts-playfair')) {
        const link = document.createElement('link');
        link.id = 'google-fonts-playfair';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
        document.head.appendChild(link);
    }

    // 2. Injetar estilos CSS necessários para o gradiente e animação básica
    const style = document.createElement('style');
    style.textContent = `
        .logo-v-gold-gradient {
            background: linear-gradient(to bottom, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            line-height: 1;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none;    /* Firefox */
            -ms-user-select: none;     /* IE10+/Edge */
            user-select: none;         /* Standard */
            pointer-events: none;
        }
        .logo-v-container {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: transparent;
        }
    `;
    document.head.appendChild(style);

    /**
     * Função para mostrar o logotipo na tela
     * @param {number} escala - Porcentagem do tamanho original (ex: 50 para metade)
     * @param {string|HTMLElement} seletorPai - (Opcional) ID, classe ou Elemento onde o logo será inserido.
     */
    window.mostrarLogo = function(escala = 100, seletorPai = null) {
        // Captura o script atual no momento da execução para saber a posição da chamada
        const scriptAtual = document.currentScript;

        // Tamanho base de referência (baseado no text-9xl ~128px)
        const tamanhoBase = 128;
        const tamanhoCalculado = (tamanhoBase * (escala / 100)).toFixed(2);

        // Criar o container do logo
        const container = document.createElement('div');
        container.className = 'logo-v-container';
        
        // Criar o elemento do texto
        const logo = document.createElement('div');
        logo.className = 'logo-v-gold-gradient';
        logo.textContent = 'V';
        logo.style.fontSize = `${tamanhoCalculado}px`;

        container.appendChild(logo);

        // Inserir no DOM
        if (seletorPai) {
            const pai = (typeof seletorPai === 'string') ? document.querySelector(seletorPai) : seletorPai;
            if (pai) pai.appendChild(container);
        } else if (scriptAtual && scriptAtual.parentNode) {
            // Insere o logo exatamente antes do bloco de script que chamou a função
            scriptAtual.parentNode.insertBefore(container, scriptAtual);
        } else {
            // Fallback caso não consiga detectar o script (ex: chamado via console ou async)
            document.body.appendChild(container);
        }
        
        return container;
    };

    // --- AUTO-INICIALIZAÇÃO ---
    // Esta lógica observa o documento e renderiza o logo em qualquer div com a classe 'v-logo-gold'
    const observer = new MutationObserver((mutations) => {
        document.querySelectorAll('.v-logo-gold:not([data-v-ready])').forEach(el => {
            el.setAttribute('data-v-ready', 'true');
            const escala = el.getAttribute('data-escala') || 100;
            window.mostrarLogo(parseInt(escala), el);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Execução inicial para elementos já presentes no HTML
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.v-logo-gold:not([data-v-ready])').forEach(el => {
            el.setAttribute('data-v-ready', 'true');
            const escala = el.getAttribute('data-escala') || 100;
            window.mostrarLogo(parseInt(escala), el);
        });
    });
})();
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
            user-select: none;
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
     * @param {string} seletorPai - (Opcional) ID ou classe do elemento onde o logo será inserido. Se vazio, adiciona ao body.
     */
    window.mostrarLogo = function(escala = 100, seletorPai = null) {
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
            const pai = document.querySelector(seletorPai);
            if (pai) pai.appendChild(container);
        } else {
            // Se não houver pai, fixa o logo temporariamente no centro da tela para visualização
            container.style.position = 'fixed';
            container.style.top = '50%';
            container.style.left = '50%';
            container.style.transform = 'translate(-50%, -50%)';
            container.style.zIndex = '10000';
            document.body.appendChild(container);
        }
        
        return container;
    };

    // Exemplo de uso imediato comentado:
    // mostrarLogo(50); 
})();
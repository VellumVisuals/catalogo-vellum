/**
 * Script de Barra Inferior Adaptativa com UI de Luxo
 * Converte o layout anterior em um componente injetável que 
 * organiza o scroll da página para evitar sobreposição.
 */

(function() {
    const init = () => {
        // 1. Configuração de estilo do BODY e HTML hospedeiro (Lógica barrapreta_scroll.js)
        document.documentElement.style.setProperty('height', '100%', 'important');
        document.documentElement.style.setProperty('overflow', 'hidden', 'important');
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        Object.assign(document.body.style, {
            height: '100vh',
            margin: '0',
            padding: '0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        });

        // Reforço via seletor para garantir prioridade sobre estilos externos
        document.body.style.setProperty('overflow', 'hidden', 'important');
        document.body.style.setProperty('height', '100vh', 'important');

        // 2. Injeção dos Estilos CSS (Convertidos do HTML original)
        const style = document.createElement('style');
        style.textContent = `
            /* Container do lado esquerdo (Logo + Texto) */
            .left-content {
                display: flex;
                align-items: center;
                gap: 20px;
                flex-grow: 1;
                overflow: hidden;
            }

            /* Tipografia luxuosa para Projeto Vora */
            .project-title {
                font-family: 'Times New Roman', serif;
                letter-spacing: 2px;
                font-weight: 300;
                text-transform: uppercase;
                display: flex;
                flex-direction: column;
                line-height: 1.1;
                white-space: nowrap;
                color: #ffffff;
            }

            .project-title .label {
                font-size: 10px;
                letter-spacing: 1px;
                opacity: 0.8;
            }

            .project-title .name {
                font-size: 24px;
            }

            /* Botão com degradê dourado */
            .gold-button {
                background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
                color: #000;
                border: none;
                padding: 12px 24px;
                border-radius: 4px;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 13px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                transition: transform 0.2s ease;
                font-family: 'Times New Roman', serif;
                letter-spacing: 1px;
                text-align: center;
                line-height: 1.2;
                flex-shrink: 0;
                margin-left: 20px;
            }

            .gold-button:hover {
                transform: scale(1.05);
            }

            /* Responsividade Mobile */
            @media (max-width: 600px) {
                .bottom-bar {
                    padding: 0 15px !important;
                    height: 70px !important;
                }
                .left-content {
                    gap: 10px;
                    padding-right: 10px; 
                    position: relative;
                }
                .project-title .name {
                    font-size: 18px;
                    display: block;
                    width: auto;
                }
                .gold-button {
                    padding: 8px 0;
                    font-size: 10px;
                    width: 120px;
                    min-width: 120px;
                    max-width: 120px; 
                    margin-left: 5px;
                }
                .gold-button span {
                    display: block;
                }
            }
        `;
        document.head.appendChild(style);

        // 3. Criar o Container de Scroll (Wrapper)
        const scrollContainer = document.createElement('div');
        scrollContainer.id = 'js-auto-scroll-container';
        
        Object.assign(scrollContainer.style, {
            flex: '1',
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            width: '100%'
        });

        // 4. Mover o conteúdo original para dentro do container
        const children = Array.from(document.body.childNodes);
        children.forEach(child => {
            if (child.tagName !== 'SCRIPT' && child !== style) {
                scrollContainer.appendChild(child);
            }
        });

        // 5. Criar a Barra Inferior Luxuosa
        const barra = document.createElement('div');
        barra.className = 'bottom-bar';
        
        Object.assign(barra.style, {
            width: '100%',
            height: '80px',
            backgroundColor: '#000000',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            boxSizing: 'border-box',
            zIndex: '9999',
            borderTop: '1px solid #333',
            flexShrink: '0'
        });

        // Estrutura interna da barra
        barra.innerHTML = `
            <div class="left-content" id="logo-container-js">
                <div class="project-title">
                    <span class="label">Estudo de caso</span>
                    <span class="name">Project name</span>
                </div>
            </div>
            <button class="gold-button" onclick="window.location.href='../'">
                <span>Voltar ao</span>
                <span>"The Archive"</span>
            </button>
        `;

        // 6. Montagem Final
        document.body.appendChild(scrollContainer);
        document.body.appendChild(barra);

        // 7. Carregar o Script do Logo e Injetar no Container
        const logoContainer = document.getElementById('logo-container-js');
        
        // Inserir a nova estrutura HTML do logo minimalista antes do título
        const logoDiv = document.createElement('div');
        logoDiv.className = 'v-logo-gold';
        logoDiv.setAttribute('data-escala', '50');
        logoContainer.prepend(logoDiv);

        const scriptLogo = document.createElement('script');
        scriptLogo.src = "https://www.vellumvisuals.com.br/res/scripts/logominimalista.js";
        document.head.appendChild(scriptLogo);

        console.log("Barra de luxo adaptativa injetada.");
    };

    // Inicialização segura
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }
})();
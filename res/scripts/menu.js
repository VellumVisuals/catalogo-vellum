/**
 * Vellum Visuals - Header Loader Injector (Versão Autônoma)
 * Este script injeta o cabeçalho completo (CSS, HTML e JS) automaticamente no topo do body.
 * Não requer placeholder HTML.
 */

(function() {
    // 1. Injeção de Dependências e Estilos
    const injectStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                /* Cores */
                --vmh-gold: #D4AF37;
                --vmh-soft-gold: #f1d592;
                --vmh-black-bg: #0a0a0a;
                
                /* Tipografia - Unificada */
                --vmh-font-main: 'Montserrat', sans-serif;
                --vmh-font-accent: 'Playfair Display', serif;
                
                /* Animações */
                --vmh-transition: color 0.3s ease;
            }

            /* Reset e Bases de Fontes */
            .vmh-vellum-nav, 
            .vmh-nav-link, 
            .vmh-mobile-nav { 
                font-family: var(--vmh-font-main) !important; 
            }
            
            .vmh-playfair { 
                font-family: var(--vmh-font-accent) !important; 
            }
            
            /* Título VELLUM - Bloquear seleção e forçar cor do link */
            .vmh-logo-container {
                user-select: none !important;
                -webkit-user-select: none !important;
            }

            /* Garantir que o link do logo nunca mude de cor (mesmo visitado ou em outras páginas) */
            .vmh-logo-container a, 
            .vmh-logo-container a:visited, 
            .vmh-logo-container a:hover, 
            .vmh-logo-container a:active {
                text-decoration: none !important;
                outline: none !important;
                color: #d3d3d3 !important;
            }

            /* Links de Navegação - Propriedades Compartilhadas */
            .vmh-nav-link {
                text-transform: uppercase !important;
                text-decoration: none !important;
                transition: var(--vmh-transition) !important;
                letter-spacing: 0.3em !important;
                font-size: 0.65rem !important;
                color: #888 !important;
                display: inline-block !important;
            }
            
            .vmh-nav-link:hover {
                color: var(--vmh-gold) !important;
            }

            /* Estados Específicos de Cor */
            .vmh-nav-link-active {
                color: #ffffff !important;
            }
            
            .vmh-nav-link-active:hover {
                color: var(--vmh-gold) !important;
            }

            /* Variações de Peso e Espaçamento */
            .vmh-nav-link-briefing {
                font-weight: 600 !important;
                letter-spacing: 0.4em !important;
            }

            /* MENU DESKTOP - ESTRUTURA E POSICIONAMENTO */
            .vmh-desktop-nav {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                width: 100% !important;
                z-index: 10000 !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding: 2rem 3rem !important;
                box-sizing: border-box !important;
                
                /* Efeitos de Fundo */
                background-color: rgba(0, 0, 0, 0.2) !important;
                backdrop-filter: blur(4px) !important;
                -webkit-backdrop-filter: blur(4px) !important;
            }
            
            .vmh-nav-group {
                display: flex !important;
                gap: 2.5rem !important;
            }

            /* MENU MOBILE - ESTRUTURA E LÓGICA */
            #vmh-menu-toggle { display: none !important; }
            
            .vmh-mobile-menu-btn {
                display: none;
                cursor: pointer;
                z-index: 10001 !important;
                position: fixed !important;
                top: 2rem;
                right: 2rem;
            }
            
            .vmh-mobile-nav {
                position: fixed !important;
                top: 0 !important;
                right: -100% !important;
                width: 100% !important;
                height: 100vh !important;
                background: rgba(10, 10, 10, 0.98) !important;
                z-index: 10000 !important;
                transition: right 0.5s cubic-bezier(0.77,0.2,0.05,1.0) !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                gap: 2rem !important;
            }

            /* Mobile Link Overrides */
            .vmh-mobile-nav .vmh-nav-link {
                font-size: 1.125rem !important;
                font-weight: 400 !important;
            }
            
            .vmh-mobile-nav a[href="/briefing/"] {
                font-weight: 700 !important;
            }

            /* Mobile Toggle Interactions */
            #vmh-menu-toggle:checked ~ .vmh-mobile-nav { right: 0 !important; }
            #vmh-menu-toggle:checked ~ .vmh-mobile-menu-btn .vmh-hamburguer { background: transparent !important; }
            #vmh-menu-toggle:checked ~ .vmh-mobile-menu-btn .vmh-hamburguer::before { transform: rotate(45deg); top: 0 !important; }
            #vmh-menu-toggle:checked ~ .vmh-mobile-menu-btn .vmh-hamburguer::after { transform: rotate(-45deg); top: 0 !important; }

            /* Ícone Hambúrguer */
            .vmh-hamburguer, 
            .vmh-hamburguer::before, 
            .vmh-hamburguer::after {
                width: 20px !important;
                height: 1px !important;
                background: var(--vmh-gold) !important;
                transition: all 0.3s !important;
            }
            
            .vmh-hamburguer {
                display: block !important;
                position: relative !important;
            }
            
            .vmh-hamburguer::before, 
            .vmh-hamburguer::after {
                content: '' !important;
                position: absolute !important;
            }
            
            .vmh-hamburguer::before { top: -6px !important; }
            .vmh-hamburguer::after { top: 6px !important; }

            /* Breakpoints */
            @media (max-width: 768px) {
                .vmh-mobile-menu-btn { display: block !important; }
                .vmh-desktop-nav { display: none !important; }
            }
        `;
        document.head.appendChild(style);

        // Garantir Google Fonts
        if (!document.getElementById('vellum-fonts')) {
            const fonts = document.createElement('link');
            fonts.id = 'vellum-fonts';
            fonts.rel = 'stylesheet';
            fonts.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap';
            document.head.appendChild(fonts);
        }
    };

    // 2. Injeção do HTML do Header
    const injectHTML = () => {
        const headerContainer = document.createElement('div');
        headerContainer.className = 'vmh-vellum-nav';
        headerContainer.innerHTML = `
            <!-- MOBILE NAVIGATION -->
            <input type="checkbox" id="vmh-menu-toggle">
            <label for="vmh-menu-toggle" class="vmh-mobile-menu-btn">
                <span class="vmh-hamburguer"></span>
            </label>
            <div class="vmh-mobile-nav">
                <a href="/" class="vmh-nav-link" onclick="document.getElementById('vmh-menu-toggle').checked = false">Início</a>    
                <a href="/#metodologia" class="vmh-nav-link" onclick="document.getElementById('vmh-menu-toggle').checked = false">Método</a>
                <a href="/#experiencias" class="vmh-nav-link" onclick="document.getElementById('vmh-menu-toggle').checked = false">Signature</a>
                <a href="/#essentials" class="vmh-nav-link" onclick="document.getElementById('vmh-menu-toggle').checked = false">Stewardship</a>
                <a href="/thearchive/" class="vmh-nav-link" onclick="document.getElementById('vmh-menu-toggle').checked = false">The Archive</a>
                <a href="/briefing/" class="vmh-nav-link onclick="document.getElementById('vmh-menu-toggle').checked = false">Briefing</a>
            </div>

            <!-- DESKTOP NAVIGATION -->
            <nav class="vmh-desktop-nav">
                <div class="vmh-logo-container font-bold tracking-[0.4em] text-xs">
                    <a href="/">VELLUM</a>
                </div>
                <div class="vmh-nav-group">
                    <a href="/#metodologia" class="vmh-nav-link">Método</a>
                    <a href="/#experiencias" class="vmh-nav-link">Signature</a>
                    <a href="/#essentials" class="vmh-nav-link">Stewardship</a>
                    <a href="/thearchive/" class="vmh-nav-link font-bold vmh-nav-link-active border-b border-gold/30">The Archive</a>
                    <a href="/briefing/" class="vmh-nav-link vmh-nav-link-briefing">Briefing</a>
                </div>
            </nav>
        `;
        
        // Injeta no início do BODY para garantir que seja o primeiro elemento
        document.body.prepend(headerContainer);
    };

    // Inicialização
    const init = () => {
        if (document.body) {
            injectStyles();
            injectHTML();
        } else {
            window.addEventListener('DOMContentLoaded', () => {
                injectStyles();
                injectHTML();
            });
        }
    };

    init();
})();
/**
 * VELLUM VISUALS - Engenharia de Autoridade
 * Componente de Cabeçalho Universal (Injetável)
 * * Este script injeta o cabeçalho, os estilos necessários e a lógica 
 * de navegação em qualquer página que possua o elemento <div id="vellum-header"></div>.
 */

(function() {
    const headerHTML = `
    <!-- ESTILOS DO COMPONENTE -->
    <style>
        :root {
            --gold: #D4AF37;
            --soft-gold: #f1d592;
            --black-bg: #0a0a0a;
        }

        .vellum-nav-link {
            font-size: 0.65rem;
            letter-spacing: 0.3em;
            color: #888;
            transition: color 0.3s;
            text-transform: uppercase;
            text-decoration: none;
            font-family: 'Montserrat', sans-serif;
        }
        
        .vellum-nav-link:hover {
            color: var(--gold);
        }

        /* Classes de utilidade para simular Tailwind no componente isolado */
        .vellum-text-lg { font-size: 1.125rem; }
        .vellum-font-bold { font-weight: 700; }
        .vellum-font-semibold { font-weight: 600; }
        .vellum-text-white { color: #ffffff !important; }
        .vellum-text-gold { color: var(--gold) !important; }
        .vellum-tracking-widest { letter-spacing: 0.4em; }

        /* Menu Mobile */
        #vellum-menu-toggle { display: none; }
        
        .vellum-mobile-menu-btn {
            display: none;
            cursor: pointer;
            z-index: 100;
            position: fixed;
            top: 2rem;
            right: 2rem;
        }

        .vellum-mobile-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background: rgba(10, 10, 10, 0.98);
            z-index: 90;
            transition: right 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
        }

        #vellum-menu-toggle:checked ~ .vellum-mobile-nav { right: 0; }

        .vellum-hamburguer {
            display: block;
            width: 20px;
            height: 1px;
            background: var(--gold);
            position: relative;
            transition: all 0.3s;
        }

        .vellum-hamburguer::before, .vellum-hamburguer::after {
            content: '';
            width: 20px;
            height: 1px;
            background: var(--gold);
            position: absolute;
            transition: all 0.3s;
        }

        .vellum-hamburguer::before { top: -6px; }
        .vellum-hamburguer::after { top: 6px; }

        #vellum-menu-toggle:checked ~ .vellum-mobile-menu-btn .vellum-hamburguer { background: transparent; }
        #vellum-menu-toggle:checked ~ .vellum-mobile-menu-btn .vellum-hamburguer::before { transform: rotate(45deg); top: 0; }
        #vellum-menu-toggle:checked ~ .vellum-mobile-menu-btn .vellum-hamburguer::after { transform: rotate(-45deg); top: 0; }

        @media (max-width: 768px) {
            .vellum-mobile-menu-btn { display: block; }
            .vellum-desktop-nav { display: none !important; }
        }
    </style>

    <!-- ESTRUTURA DE NAVEGAÇÃO MOBILE -->
    <input type="checkbox" id="vellum-menu-toggle">
    <label for="vellum-menu-toggle" class="vellum-mobile-menu-btn">
        <span class="vellum-hamburguer"></span>
    </label>
    
    <div class="vellum-mobile-nav">
        <a href="/#metodologia" class="vellum-nav-link vellum-text-lg" onclick="closeVellumMenu()">Método</a>
        <a href="/#experiencias" class="vellum-nav-link vellum-text-lg" onclick="closeVellumMenu()">Signature</a>
        <a href="/#essentials" class="vellum-nav-link vellum-text-lg" onclick="closeVellumMenu()">Stewardship</a>
        <a href="/thearchive/" class="vellum-nav-link vellum-text-lg" onclick="closeVellumMenu()">The Archive</a>
        <a href="/briefing/" class="vellum-nav-link vellum-text-gold vellum-font-bold vellum-text-lg" onclick="closeVellumMenu()">Briefing</a>
    </div>

    <!-- NAVEGAÇÃO DESKTOP -->
    <nav class="vellum-desktop-nav fixed top-0 w-full z-50 py-8 px-12 flex justify-between items-center bg-black/20 backdrop-blur-sm" style="display: flex; position: fixed; top: 0; width: 100%; z-index: 50; padding: 2rem 3rem; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); backdrop-filter: blur(4px);">
        <div class="vellum-text-gold vellum-font-bold vellum-tracking-widest" style="font-size: 0.75rem; letter-spacing: 0.4em;">VELLUM</div>
        <div class="flex gap-10" style="display: flex; gap: 2.5rem;">
            <a href="/#metodologia" class="vellum-nav-link">Método</a>
            <a href="/#experiencias" class="vellum-nav-link">Signature</a>
            <a href="/#essentials" class="vellum-nav-link">Stewardship</a>
            <a href="/thearchive/" class="vellum-nav-link vellum-font-bold vellum-text-white" style="border-bottom: 1px solid rgba(212, 175, 55, 0.3);">The Archive</a>
            <a href="/briefing/" class="vellum-nav-link vellum-text-gold vellum-font-semibold vellum-tracking-widest">Briefing</a>
        </div>
    </nav>
    `;

    // Função para fechar o menu mobile ao clicar
    window.closeVellumMenu = function() {
        document.getElementById('vellum-menu-toggle').checked = false;
    };

    // Injeção do conteúdo no placeholder
    document.addEventListener("DOMContentLoaded", function() {
        const headerContainer = document.getElementById('vellum-header');
        if (headerContainer) {
            headerContainer.innerHTML = headerHTML;
        } else {
            console.warn("Vellum Header: Elemento #vellum-header não encontrado no DOM.");
        }
    });
})();
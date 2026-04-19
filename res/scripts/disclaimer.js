/**
 * Disclaimer Script - Portfólio de Templates
 * Este script injeta automaticamente um modal de aviso legal amigável ao carregar a página.
 */

(function() {
    // 1. Injetar o script do logo minimalista
    const scriptLogo = document.createElement('script');
    scriptLogo.src = 'https://www.vellumvisuals.com.br/res/scripts/logominimalista.js';
    document.head.appendChild(scriptLogo);

    // 2. Injetar as fontes necessárias (Playfair Display e Inter)
    const linkFonts = document.createElement('link');
    linkFonts.rel = 'stylesheet';
    linkFonts.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500&display=swap';
    document.head.appendChild(linkFonts);

    // 2. Injetar o Tailwind CSS (caso o template original não possua)
    if (!window.tailwind) {
        const scriptTailwind = document.createElement('script');
        scriptTailwind.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(scriptTailwind);
    }

    // 3. Injetar os estilos específicos do Modal
    const style = document.createElement('style');
    style.textContent = `
        .disclaimer-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        .disclaimer-box {
            background: #1a1a1a;
            border: 1px solid #333;
            max-width: 500px;
            width: 90%;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            font-family: 'Inter', sans-serif;
        }
    `;
    document.head.appendChild(style);

    // 4. Função para criar e exibir o Modal
    function showDisclaimer() {
        // Bloquear o scroll do corpo
        document.body.style.overflow = 'hidden';

        const overlay = document.createElement('div');
        overlay.id = 'disclaimerModal';
        overlay.className = 'disclaimer-modal-overlay';

        overlay.innerHTML = `
            <div class="disclaimer-box">
                <div class="mb-6 leading-none">
                    <script>mostrarLogo()</script>
                </div>
                <div class="text-gray-300 text-sm leading-relaxed mb-8">
                    <h2 class="text-white text-lg font-semibold mb-4 uppercase tracking-wider">Uma pequena nota de boas-vindas</h2>
                    <p>
                        Os materiais exibidos neste template (marcas, slogans, fotos de produtos e descrições) são utilizados apenas para fins de preenchimento de layout (<em>placeholder</em>). Não representam produtos reais à venda nem endosso de terceiros. Os direitos autorais das imagens utilizadas pertencem aos seus respectivos autores (sob licença de uso livre) ou foram gerados por inteligência artificial para este propósito específico.
                    </p>
                </div>
                <button id="closeDisclaimerBtn" class="w-full py-3 px-6 bg-white hover:bg-gray-200 text-black font-bold rounded transition duration-200 uppercase text-xs tracking-widest cursor-pointer">
                    Entendi
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Evento de clique para fechar
        document.getElementById('closeDisclaimerBtn').addEventListener('click', function() {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = ''; // Restaurar o scroll
            }, 300);
        });
    }

    // 5. Executar no Onload
    if (document.readyState === 'complete') {
        showDisclaimer();
    } else {
        window.addEventListener('load', showDisclaimer);
    }
})();
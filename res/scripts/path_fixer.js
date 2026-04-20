/**
 * Script dinâmico para definir a base path corretamente e padronizar a URL.
 * Resolve o problema de caminhos relativos e evita recarregamento de disclaimer em âncoras.
 */
(function() {
    let path = window.location.pathname;
    let origin = window.location.origin;

    // 1. Normalização da URL (Evita o problema da âncora)
    // Se não termina com / e não é um arquivo físico, força a barra na URL do navegador
    if (!path.endsWith('/') && !path.includes('.')) {
        const newPath = path + '/';
        // Substitui a URL na barra de endereços sem recarregar a página
        window.history.replaceState(null, null, origin + newPath + window.location.search + window.location.hash);
        path = newPath; 
    }

    // 2. Lógica original da tag <base> para recursos relativos
    let baseDir = path;
    if (path.includes('.') || !path.endsWith('/')) {
        baseDir = path.substring(0, path.lastIndexOf('/') + 1);
    }

    const baseTag = document.createElement('base');
    baseTag.href = origin + baseDir;
    document.head.appendChild(baseTag);
})();
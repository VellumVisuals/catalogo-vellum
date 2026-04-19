/**
 * Script dinâmico para definir a base path corretamente.
 * Resolve o problema de caminhos relativos quando a URL não termina em barra (/).
 * * Como usar:
 * No HTML, adicionar <script src="path_fixer.js"></script> 
 * logo no início do <head>, antes de carregar outros recursos.
 */
(function() {
    let path = window.location.pathname;

    // Se o path não termina em / e não parece ser um arquivo (não tem ponto), adiciona a barra
    if (!path.endsWith('/') && !path.includes('.')) {
        path += '/';
    } else {
        // Se for um arquivo (ex: index.html), pega apenas a pasta pai
        path = path.substring(0, path.lastIndexOf('/') + 1);
    }

    // Cria a tag <base>
    const baseTag = document.createElement('base');
    
    // Define o href absoluto baseado na origem do site + o path calculado
    baseTag.href = window.location.origin + path;
    
    // Insere no topo do head para garantir que afete todos os recursos subsequentes
    document.head.appendChild(baseTag);
})();
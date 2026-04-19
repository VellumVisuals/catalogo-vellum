/**
 * Script Container / Loader
 * Centraliza a injeção de múltiplos scripts externos com controle de fluxo.
 */

(function() {
    // 1. Definição das 4 categorias de scripts
    
    // Disparam todos ao mesmo tempo no Head
    const headerScriptsParalelos = [
        "https://www.vellumvisuals.com.br/res/scripts/logominimalista.js"
    ];

    // Disparam todos ao mesmo tempo no Body
    const bodyScriptsParalelos = [
        "https://www.vellumvisuals.com.br/res/scripts/disclaimer.js"
    ];

    // Executam um por um no Head APÓS todos os paralelos terminarem
    const headerScriptsSequenciais = [];

    // Executam um por um no Body logo após o último headerScript (sequencial ou paralelo)
    const bodyScriptsSequenciais = [];

    /**
     * Função auxiliar para injetar um script em um local específico
     */
    const injectScript = (url, target) => {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = url;
            s.async = true; 
            
            s.onload = () => {
                console.log(`Carregado: ${url}`);
                resolve();
            };
            
            s.onerror = () => {
                console.error(`Erro ao carregar o script: ${url}`);
                reject();
            };
            
            target.appendChild(s);
        });
    };

    /**
     * Carrega uma lista de scripts em paralelo
     */
    const loadInParallel = (list, target) => {
        if (!list || list.length === 0) return Promise.resolve();
        return Promise.all(list.map(url => injectScript(url, target)));
    };

    /**
     * Carrega uma lista de scripts em ordem sequencial
     */
    const loadSequentially = async (list, target) => {
        if (!list || list.length === 0) return;
        for (const url of list) {
            try {
                await injectScript(url, target);
            } catch (e) {
                // Continua para o próximo mesmo em caso de erro
            }
        }
    };

    // 2. Execução da injeção respeitando a lógica de dependência
    const init = async () => {
        console.log("Iniciando carregamento de scripts...");

        // A. Inicia os paralelos (Header e Body podem começar juntos para ganhar tempo)
        const p1 = loadInParallel(headerScriptsParalelos, document.head);
        const p2 = loadInParallel(bodyScriptsParalelos, document.body);

        // B. Aguarda os paralelos do Header terminarem para começar os Sequenciais do Header
        await p1;
        if (headerScriptsSequenciais.length > 0) {
            console.log("Paralelos do Header concluídos. Iniciando Sequenciais do Header...");
            await loadSequentially(headerScriptsSequenciais, document.head);
        }

        // C. Garante que os paralelos do Body também terminaram (caso demorem mais que os do Head)
        await p2;

        // D. Executa os Sequenciais do Body por último
        if (bodyScriptsSequenciais.length > 0) {
            console.log("Iniciando Sequenciais do Body...");
            await loadSequentially(bodyScriptsSequenciais, document.body);
        }
        
        console.log("Todos os scripts do container foram processados com sucesso.");
    };

    init();

})();
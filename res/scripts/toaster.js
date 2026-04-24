/**
 * Toast Automation System
 * Responsável por gerenciar a exibição e ocultação de mensagens de demonstração.
 */

const ToastAutomator = {
    /**
     * Exibe o toast e o oculta automaticamente após um período.
     * @param {string} elementId - O ID do elemento HTML do toast (padrão: 'demo-toast').
     * @param {number} duration - Tempo em milissegundos para manter visível (padrão: 3000).
     */
    show: function(elementId = 'demo-toast', duration = 3000) {
        const toast = document.getElementById(elementId);
        
        if (!toast) {
            console.warn(`ToastAutomator: Elemento com ID "${elementId}" não encontrado.`);
            return;
        }

        // Limpa timers anteriores caso o usuário clique múltiplas vezes rapidamente
        if (toast._toastTimer) {
            clearTimeout(toast._toastTimer);
        }

        // Adiciona a classe de animação (conforme definido no CSS do template)
        toast.classList.add('show');

        // Define o timer para ocultar
        toast._toastTimer = setTimeout(() => {
            toast.classList.remove('show');
            toast._toastTimer = null;
        }, duration);
    }
};

/**
 * Função global de conveniência para manter compatibilidade com chamadas simples.
 * Exemplo de uso: <a onclick="triggerToast()">Link</a>
 */
window.triggerToast = function(customId = 'demo-toast') {
    ToastAutomator.show(customId);
};
document.addEventListener('DOMContentLoaded', () => {
    let installButton = document.getElementById('installButton');
    
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        installButton.style.display = 'block';
    });
    
    installButton.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                deferredPrompt = null;
            });
        }
    });
});
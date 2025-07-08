//Se inician las variables para la traduccion
let translations = {};
let currentLang = 'es';

function loadTranslations(lang) {
    fetch(`assets/locales/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            translations = data;
            currentLang = lang;
            updateTexts();
        });
}

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}


// Para los botones de idioma
function changeLanguage(lang) {
    loadTranslations(lang);
}

// Haz la función global para los botones
window.changeLanguage = changeLanguage;

// Carga el idioma por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLang);
});
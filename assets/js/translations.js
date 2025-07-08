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

function updateLanguageButtons(selected) {
    const langs = ['es', 'en', 'pt'];
    langs.forEach(lng => {
        const btn = document.getElementById('btn-lang-' + lng);
        if (btn) {
            btn.classList.toggle('btn-selected', lng === selected);
        }
    });
}


// Para los botones de idioma
function changeLanguage(lang) {
    loadTranslations(lang);
    updateLanguageButtons(lang);
}

// Haz la función global para los botones
window.changeLanguage = changeLanguage;

// Carga el idioma por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLang);
    updateLanguageButtons(currentLang);
});
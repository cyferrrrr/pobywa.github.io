// Pobierz parametry z URL
var params = new URLSearchParams(window.location.search);

// Elementy DOM
const loginBtn = document.querySelector(".login");
const welcomeText = document.querySelector(".welcome");
const passwordInput = document.querySelector(".password_input");
const eyeIcon = document.querySelector(".eye");

// Ustaw przywitanie w zależności od godziny
function setWelcomeMessage() {
    const date = new Date();
    const hours = date.getHours();
    welcomeText.textContent = hours >= 18 ? "Dobry wieczór!" : "Dzień dobry!";
}

// Przekierowanie do strony głównej
function redirectToHome() {
    // Sprawdź czy hasło zostało wprowadzone (prosta walidacja)
    if (passwordInput.value.trim() === "") {
        alert("Proszę wprowadzić hasło!");
        return;
    }
    
    // Przekieruj z zachowaniem parametrów
    window.location.href = `index.html?${params.toString()}`;
}

// Obsługa zdarzeń
function setupEventListeners() {
    // Przycisk logowania
    loginBtn.addEventListener('click', redirectToHome);

    // Enter w polu hasła
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            redirectToHome();
        }
    });

    // Pokazywanie/ukrywanie hasła
    eyeIcon.addEventListener('click', () => {
        eyeIcon.classList.toggle("eye_close");
        passwordInput.type = eyeIcon.classList.contains("eye_close") ? "text" : "password";
    });
}

// Inicjalizacja
function init() {
    setWelcomeMessage();
    setupEventListeners();
}

// Uruchom aplikację
document.addEventListener('DOMContentLoaded', init);

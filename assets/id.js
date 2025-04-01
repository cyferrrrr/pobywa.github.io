// Pobierz parametry z URL
var params = new URLSearchParams(window.location.search);

// Ustaw przywitanie w zależności od godziny
document.querySelector(".login").addEventListener('click', () => {
    // Zmienione przekierowanie na poprawną ścieżkę
    location.href = 'index.html?' + params.toString();
});

var welcome = "Dzień dobry!";
var date = new Date();
if (date.getHours() >= 18){
    welcome = "Dobry wieczór!"
}
document.querySelector(".welcome").innerHTML = welcome;

// Obsługa pola hasła
var input = document.querySelector(".password_input");
var eye = document.querySelector(".eye");
var original = "";

input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
        location.href = 'index.html?' + params.toString();
    }
});

// Pokazuj/ukryj hasło
eye.addEventListener('click', () => {
    eye.classList.toggle("eye_close");
    input.type = eye.classList.contains("eye_close") ? "text" : "password";
});

// Usunięto zbędny zminifikowany kod

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const loginBtn = document.querySelector(".login");
    const passwordInput = document.querySelector(".password_input");
    const eyeIcon = document.querySelector(".eye");

    // Ustawienie komunikatu powitalnego
    function setWelcomeMessage() {
        const hour = new Date().getHours();
        document.querySelector(".welcome").textContent = 
            hour >= 18 ? "Dobry wieczór!" : "Dzień dobry!";
    }

    // Obsługa logowania
    function handleLogin() {
        if (!passwordInput.value.trim()) {
            alert("Proszę wprowadzić hasło!");
            return;
        }
        window.location.href = `home.html?${params.toString()}`;
    }

    // Pokazuj/ukryj hasło
    function togglePasswordVisibility() {
        eyeIcon.classList.toggle("eye_close");
        passwordInput.type = eyeIcon.classList.contains("eye_close") ? "text" : "password";
    }

    // Inicjalizacja
    setWelcomeMessage();
    loginBtn.addEventListener('click', handleLogin);
    eyeIcon.addEventListener('click', togglePasswordVisibility);
    
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') handleLogin();
    });
});

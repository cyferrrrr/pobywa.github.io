// Selekcja elementów DOM
const selector = document.querySelector(".selector_box");
const upload = document.querySelector(".upload");
const goBtn = document.querySelector(".go");
const guide = document.querySelector(".guide_holder");

// Inicjalizacja zmiennych
let sex = "m";
const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";

// Obsługa selektora płci
selector.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

document.querySelectorAll(".selector_option").forEach(option => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").textContent = option.textContent;
    });
});

// Obsługa przesyłania zdjęcia
upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        alert("Plik jest zbyt duży! Maksymalny rozmiar to 5MB.");
        return;
    }

    upload.classList.add("upload_loading");
    const reader = new FileReader();

    reader.onload = function(e) {
        upload.classList.remove("upload_loading");
        upload.classList.add("upload_loaded");
        upload.querySelector(".upload_uploaded").src = e.target.result;
        upload.setAttribute("selected", e.target.result);
    };

    reader.readAsDataURL(file);
});

// Walidacja formularza i przekierowanie
goBtn.addEventListener('click', () => {
    const emptyFields = [];
    const params = new URLSearchParams();

    // Walidacja zdjęcia
    if (!upload.hasAttribute("selected")) {
        emptyFields.push(upload);
        upload.classList.add("error_shown");
    } else {
        params.set("image", upload.getAttribute("selected"));
    }

    // Walidacja pól tekstowych
    document.querySelectorAll(".input_holder").forEach(element => {
        const input = element.querySelector(".input");
        if (!input.value.trim()) {
            emptyFields.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value);
        }
    });

    // Przekierowanie jeśli brak błędów
    if (emptyFields.length === 0) {
        window.location.href = `id.html?${params.toString()}`;
    } else {
        emptyFields[0].scrollIntoView({ behavior: 'smooth' });
    }
});

// Obsługa rozwijania instrukcji
guide.addEventListener('click', () => {
    guide.classList.toggle("unfolded");
});

// Selekcja elementów DOM
const selector = document.querySelector(".selector_box");
const upload = document.querySelector(".upload");
const goBtn = document.querySelector(".go");
const guide = document.querySelector(".guide_holder");
const dateInputs = document.querySelectorAll(".date_input");
const selectorOptions = document.querySelectorAll(".selector_option");

// Inicjalizacja zmiennych
let sex = "m";
const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";

// Funkcja do pobrania podstawowej ścieżki dla GitHub Pages
function getBasePath() {
    const pathParts = window.location.pathname.split('/');
    // Jeśli jesteśmy w głównym repozytorium (nie w podfolderze)
    if (pathParts.length <= 2) return '/';
    // Pobierz nazwę repozytorium (drugi element w ścieżce)
    const repoName = pathParts[1];
    return `/${repoName}/`;
}

// Obsługa selektora płci
selector.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

selectorOptions.forEach(option => {
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

    reader.onerror = function() {
        upload.classList.remove("upload_loading");
        alert("Błąd podczas wczytywania pliku!");
    };
    reader.readAsDataURL(file);
});

// Walidacja formularza
function validateForm() {
    let isValid = true;
    const emptyFields = [];
    const params = new URLSearchParams();

    // Walidacja zdjęcia
    if (!upload.hasAttribute("selected")) {
        emptyFields.push(upload);
        upload.classList.add("error_shown");
        isValid = false;
    } else {
        params.set("image", upload.getAttribute("selected"));
    }

    // Walidacja pól tekstowych
    document.querySelectorAll(".input_holder").forEach(element => {
        const input = element.querySelector(".input");
        if (!input.value.trim()) {
            emptyFields.push(element);
            element.classList.add("error_shown");
            isValid = false;
        } else {
            params.set(input.id, input.value);
        }
    });

    // Walidacja daty
    let dateEmpty = false;
    let birthday = "";
    dateInputs.forEach(input => {
        birthday += `.${input.value}`;
        if (!input.value) dateEmpty = true;
    });

    if (dateEmpty) {
        document.querySelector(".date").classList.add("error_shown");
        emptyFields.push(document.querySelector(".date"));
        isValid = false;
    } else {
        params.set("birthday", birthday.substring(1));
    }

    // Dodaj płeć do parametrów
    params.set("sex", sex);

    return { isValid, params, emptyFields };
}

// Przekierowanie do podglądu dowodu
function forwardToId(params) {
    try {
        const basePath = getBasePath();
        window.location.href = `${basePath}id.html?${params.toString()}`;
    } catch (error) {
        console.error("Błąd przekierowania:", error);
        alert("Wystąpił błąd podczas przekierowania. Spróbuj ponownie.");
    }
}

// Obsługa przycisku "Wejdź"
goBtn.addEventListener('click', () => {
    const { isValid, params, emptyFields } = validateForm();
    
    if (isValid) {
        forwardToId(params);
    } else {
        emptyFields[0].scrollIntoView({ behavior: 'smooth' });
    }
});

// Obsługa rozwijania instrukcji
guide.addEventListener('click', () => {
    guide.classList.toggle("unfolded");
});

// Inicjalizacja obsługi daty
dateInputs.forEach(input => {
    input.addEventListener('input', function() {
        // Ograniczenie długości dla każdego pola
        if (this.value.length > this.maxLength) {
            this.value = this.value.slice(0, this.maxLength);
        }
        
        // Automatyczne przechodzenie do następnego pola
        if (this.value.length === this.maxLength) {
            const next = this.nextElementSibling;
            if (next && next.classList.contains("date_input")) {
                next.focus();
            }
        }
    });
});

// Ograniczenia dla pól daty
document.querySelector(".date_input[placeholder='DD']").maxLength = 2;
document.querySelector(".date_input[placeholder='MM']").maxLength = 2;
document.querySelector(".date_input[placeholder='YYYY']").maxLength = 4;

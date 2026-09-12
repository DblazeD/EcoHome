const form = document.getElementById("contactForm");
const topButton = document.getElementById("topButton");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const product = document.getElementById("product");
    const message = document.getElementById("message");

    const errors = {
        name: document.getElementById("nameError"),
        email: document.getElementById("emailError"),
        product: document.getElementById("productError"),
        message: document.getElementById("messageError")
    };

    const success = document.getElementById("successMessage");

    Object.values(errors).forEach(error => error.textContent = "");
    success.style.display = "none";

    [name, email, product, message].forEach(field => {
        field.removeAttribute("aria-invalid");
    });

    let valid = true;

    if (name.value.trim() === "") {
        errors.name.textContent = "⚠️ Ingresa tu nombre para continuar.";
        name.setAttribute("aria-invalid", "true");
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        errors.email.textContent = "⚠️ Ingresa tu correo electrónico.";
        email.setAttribute("aria-invalid", "true");
        valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        errors.email.textContent = "⚠️ Introduce un correo válido. Ejemplo: usuario@email.com";
        email.setAttribute("aria-invalid", "true");
        valid = false;
    }

    if (product.value === "") {
        errors.product.textContent = "⚠️ Selecciona el producto que te interesa.";
        product.setAttribute("aria-invalid", "true");
        valid = false;
    }

    if (message.value.trim() === "") {
        errors.message.textContent = "⚠️ Escribe un mensaje para poder ayudarte.";
        message.setAttribute("aria-invalid", "true");
        valid = false;
    }

    if (!valid) {
        const firstInvalid = document.querySelector("[aria-invalid='true']");
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    success.style.display = "block";
    form.reset();
    success.scrollIntoView({ behavior: "smooth", block: "center" });
});

window.addEventListener("scroll", function() {
    if (window.scrollY > 500) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }
});

topButton.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// Los botones de producto llevan al formulario y preseleccionan el producto.
document.querySelectorAll("[data-product]").forEach(button => {
    button.addEventListener("click", function() {
        const productSelect = document.getElementById("product");
        productSelect.value = this.dataset.product;
        setTimeout(() => productSelect.focus(), 300);
    });
});

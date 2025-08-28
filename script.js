document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        // Clear old errors
        form.querySelectorAll(".error-message").forEach(span => span.textContent = "");
        form.querySelectorAll("input, textarea").forEach(field => field.classList.remove("error"));

        // First name
        const firstName = document.getElementById("first-name");
        if (!firstName.value.trim()) {
            setError(firstName, "This field is required");
            isValid = false;
        }

        // Last name
        const lastName = document.getElementById("last-name");
        if (!lastName.value.trim()) {
            setError(lastName, "This field is required");
            isValid = false;
        }

        // Email
        const email = document.getElementById("email");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            setError(email, "This field is required");
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            setError(email, "Please enter a valid email address");
            isValid = false;
        }

        // Query Type (radio buttons)
        const query = form.querySelector("input[name='query']:checked");
        if (!query) {
            setError(form.querySelector(".radio-group"), "Please select a query type");
            isValid = false;
        }

        // Message
        const message = document.getElementById("message");
        if (!message.value.trim()) {
            setError(message, "This field is required");
            isValid = false;
        }

        // Consent checkbox
        const consent = document.getElementById("consent");
        if (!consent.checked) {
            setError(consent, "To submit this form, please consent to being contacted");
            isValid = false;
        }

        // If valid -> submit or show success
        if (isValid) {
            form.style.display = "none";
            successMessage.style.display = "block";
        }
    });

    // Helper function for error display
    function setError(element, message) {
        element.classList.add("error");
        const errorSpan = element.closest(".form-group, .checkbox").querySelector(".error-message");
        if (errorSpan) errorSpan.textContent = message;
    }
});

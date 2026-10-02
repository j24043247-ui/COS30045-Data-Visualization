// Power Appliances - Vanilla JavaScript

document.addEventListener("DOMContentLoaded", function () {
    setCurrentYear();
    setupFaqAccordion();
    setupEnergyCalculator();
    setupMobileNavigation();
});

function setCurrentYear() {
    const yearElements = document.querySelectorAll("#current-year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });
}

function setupFaqAccordion() {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = question.nextElementSibling;
            const isOpen = question.getAttribute("aria-expanded") === "true";

            question.setAttribute("aria-expanded", String(!isOpen));
            answer.classList.toggle("show", !isOpen);
        });
    });
}

function setupEnergyCalculator() {
    const form = document.getElementById("energy-form");

    if (!form) {
        return;
    }

    const powerInput = document.getElementById("power");
    const hoursInput = document.getElementById("hours");
    const priceInput = document.getElementById("price");
    const results = document.getElementById("results");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        clearInputErrors();

        const power = Number(powerInput.value);
        const hours = Number(hoursInput.value);
        const price = Number(priceInput.value);

        const errors = validateInputs(power, hours, price);

        if (errors.length > 0) {
            showCalculatorErrors(errors);
            return;
        }

        const dailyKwh = (power * hours) / 1000;
        const monthlyKwh = dailyKwh * 30;
        const yearlyKwh = dailyKwh * 365;
        const monthlyCost = monthlyKwh * (price / 100);
        const yearlyCost = yearlyKwh * (price / 100);

        results.innerHTML = `
            <h3>Estimated Results</h3>
            <ul class="results-list">
                <li>
                    <span class="result-label">Daily energy</span>
                    <span class="result-value">${dailyKwh.toFixed(2)} kWh</span>
                </li>
                <li>
                    <span class="result-label">Monthly energy</span>
                    <span class="result-value">${monthlyKwh.toFixed(2)} kWh</span>
                </li>
                <li>
                    <span class="result-label">Yearly energy</span>
                    <span class="result-value">${yearlyKwh.toFixed(2)} kWh</span>
                </li>
                <li>
                    <span class="result-label">Estimated monthly cost</span>
                    <span class="result-value">$${monthlyCost.toFixed(2)}</span>
                </li>
                <li>
                    <span class="result-label">Estimated yearly cost</span>
                    <span class="result-value">$${yearlyCost.toFixed(2)}</span>
                </li>
            </ul>
        `;
    });

    [powerInput, hoursInput, priceInput].forEach(function (input) {
        input.addEventListener("input", function () {
            input.classList.remove("input-error");
        });
    });
}

function validateInputs(power, hours, price) {
    const errors = [];

    if (!Number.isFinite(power) || power <= 0) {
        errors.push("Please enter a power usage greater than 0 watts.");
        document.getElementById("power").classList.add("input-error");
    }

    if (!Number.isFinite(hours) || hours < 0 || hours > 24) {
        errors.push("Please enter daily usage between 0 and 24 hours.");
        document.getElementById("hours").classList.add("input-error");
    }

    if (!Number.isFinite(price) || price < 0) {
        errors.push("Please enter a valid electricity price of 0 or more cents per kWh.");
        document.getElementById("price").classList.add("input-error");
    }

    return errors;
}

function showCalculatorErrors(errors) {
    const results = document.getElementById("results");

    results.innerHTML = `
        <h3>Check your inputs</h3>
        <p class="error-message">
            ${errors.join(" ")}
        </p>
    `;
}

function clearInputErrors() {
    document.querySelectorAll("#energy-form input").forEach(function (input) {
        input.classList.remove("input-error");
    });
}

function setupMobileNavigation() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener("click", function () {
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

// ==========================
// POPUP HELPERS
// ==========================

function showPopup(message, isVolunteer = false) {
    const popup = document.getElementById("popup");
    const popupContent = popup.querySelector(".popup-content");
    const icon = document.getElementById("popupIcon");
    const heading = document.getElementById("popupHeading");
    const closeBtn = document.getElementById("popupCloseBtn");

    if (isVolunteer) {
        heading.textContent = "Registration Successful!";
        popupContent.style.borderTopColor = "#22c55e";
        icon.style.background = "#f0fdf4";
        icon.style.color = "#16a34a";
        icon.innerHTML = '<i class="fas fa-user-check"></i>';
        closeBtn.style.background = "#16a34a";
    } else {
        heading.textContent = "Request Submitted!";
        popupContent.style.borderTopColor = "#6366f1";
        icon.style.background = "#eef2ff";
        icon.style.color = "#6366f1";
        icon.innerHTML = '<i class="fas fa-paper-plane"></i>';
        closeBtn.style.background = "#6366f1";
    }

    document.getElementById("popupMessage").innerText = message;
    popup.style.display = "flex";
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
}

// ==========================
// PATIENT SUPPORT FORM
// ==========================

const patientForm = document.getElementById("patientForm");

if (patientForm) {
    patientForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = patientForm.querySelector('input[type="text"]').value.trim();
        const symptoms = patientForm.querySelectorAll("textarea")[0].value.trim();
        const support = patientForm.querySelectorAll("textarea")[1].value.trim();

        if (!name || !symptoms) {
            alert("Please fill in your name and symptoms before submitting.");
            return;
        }

        const message =
            `Hello ${name}, your support request has been received!\n\n` +
            `Symptoms noted: ${symptoms}\n\n` +
            (support ? `Required support: ${support}\n\n` : "") +
            `A volunteer will review your case shortly. Stay safe!`;

        showPopup(message, false);
        patientForm.reset();
    });
}

// ==========================
// VOLUNTEER FORM
// ==========================

const volunteerForm = document.getElementById("volunteerForm");

if (volunteerForm) {
    volunteerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = volunteerForm.querySelector('input[type="text"]').value.trim();
        const email = volunteerForm.querySelector('input[type="email"]').value.trim();
        const skills = volunteerForm.querySelectorAll('input[type="text"]')[1]?.value.trim() || "";

        if (!name || !email) {
            alert("Please fill in your name and email before registering.");
            return;
        }

        const message =
            `Welcome aboard, ${name}! 🎉\n\n` +
            `Your volunteer registration has been successfully submitted.\n\n` +
            (skills ? `Skills: ${skills}\n\n` : "") +
            `We'll get in touch at ${email} with your next steps. Thank you for making a difference!`;

        showPopup(message, true);
        volunteerForm.reset();
    });
}

// ==========================
// PHONE INPUT – digits only
// ==========================

function enforceDigitsOnly(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 10);
    });
    // Block non-numeric key presses for a cleaner UX
    input.addEventListener("keypress", (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
}

enforceDigitsOnly("patientPhone");
enforceDigitsOnly("volunteerPhone");

// ==========================
// CLOSE POPUP
// ==========================

const closePopupBtn = document.getElementById("closePopup");
const popupCloseBtnBottom = document.getElementById("popupCloseBtn");

if (closePopupBtn) {
    closePopupBtn.addEventListener("click", hidePopup);
}
if (popupCloseBtnBottom) {
    popupCloseBtnBottom.addEventListener("click", hidePopup);
}

window.addEventListener("click", (e) => {
    const popup = document.getElementById("popup");
    if (e.target === popup) {
        hidePopup();
    }
});

// ==========================
// AI CHATBOT
// ==========================

const sendBtn = document.getElementById("sendBtn");
const questionInput = document.getElementById("questionInput");
const responseArea = document.getElementById("responseArea");

if (sendBtn) {
    sendBtn.addEventListener("click", function () {
        const question = questionInput.value.toLowerCase().trim();

        if (!question) return;

        let response = "Sorry, I don't have an answer for that. Please consult a healthcare professional for personalised advice.";

        if (question.includes("fever")) {
            response = "Stay hydrated, rest well and consult a doctor if symptoms persist beyond 2–3 days or exceed 103°F (39.4°C).";
        } else if (question.includes("headache")) {
            response = "Drink water, rest in a quiet dark room and avoid prolonged screen exposure. Seek help if the headache is sudden or severe.";
        } else if (question.includes("cold")) {
            response = "Keep yourself warm, stay hydrated and monitor symptoms. Steam inhalation and honey-ginger tea can help.";
        } else if (question.includes("volunteer")) {
            response = "You can register using the Volunteer Registration form on this page. Scroll up or click 'Volunteer' in the navigation!";
        } else if (question.includes("diabetes") || question.includes("sugar")) {
            response = "Monitor blood sugar regularly, follow a balanced diet, exercise and take prescribed medication. Regular check-ups are essential.";
        } else if (question.includes("blood pressure") || question.includes("bp")) {
            response = "Reduce salt intake, exercise regularly, manage stress and take any prescribed medication as directed by your doctor.";
        }

        responseArea.innerHTML = `<div class="bot-msg">${response}</div>`;
        questionInput.value = "";
    });

    // Allow pressing Enter to send
    questionInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendBtn.click();
    });
}
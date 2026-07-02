const API = "http://localhost:3001/api";

// ==========================
// HAMBURGER MENU
// ==========================

const hamburgerBtn = document.getElementById("hamburgerBtn");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const navMenu = document.getElementById("navMenu");

if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        hamburgerIcon.className = isOpen ? "fas fa-times" : "fas fa-bars";
    });
}

// Close nav when a link is clicked (mobile UX)
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburgerIcon.className = "fas fa-bars";
    });
});

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

function showToast(msg, isError = false) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.style.cssText = `
        position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
        background:${isError ? "#ef4444" : "#22c55e"};
        color:white; padding:12px 24px; border-radius:10px;
        font-weight:600; font-size:15px; z-index:99999;
        box-shadow:0 6px 20px rgba(0,0,0,0.2);
        animation: fadeUp .3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// ==========================
// PATIENT SUPPORT FORM
// ==========================

const patientForm = document.getElementById("patientForm");

if (patientForm) {
    patientForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = patientForm.querySelector('[name="name"]').value.trim();
        const age = patientForm.querySelector('[name="age"]').value.trim();
        const phone = patientForm.querySelector('[name="phone"]').value.trim();
        const symptoms = patientForm.querySelector('[name="symptoms"]').value.trim();
        const support = patientForm.querySelector('[name="support"]').value.trim();

        const submitBtn = patientForm.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

        try {
            const res = await fetch(`${API}/patient`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, age, phone, symptoms, support })
            });

            const data = await res.json();

            if (res.ok) {
                const message =
                    `Hello ${name}, your support request has been received!\n\n` +
                    `Symptoms noted: ${symptoms}\n\n` +
                    (support ? `Required support: ${support}\n\n` : "") +
                    `A volunteer will review your case shortly. Stay safe!`;
                showPopup(message, false);
                patientForm.reset();
            } else {
                showToast(data.error || "Submission failed. Please try again.", true);
            }
        } catch (err) {
            showToast("Could not reach the server. Please check your connection.", true);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Request';
        }
    });
}

// ==========================
// VOLUNTEER FORM
// ==========================

const volunteerForm = document.getElementById("volunteerForm");

if (volunteerForm) {
    volunteerForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = volunteerForm.querySelector('[name="name"]').value.trim();
        const email = volunteerForm.querySelector('[name="email"]').value.trim();
        const phone = volunteerForm.querySelector('[name="phone"]').value.trim();
        const skills = volunteerForm.querySelector('[name="skills"]').value.trim();
        const availability = volunteerForm.querySelector('[name="availability"]').value.trim();

        const submitBtn = volunteerForm.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';

        try {
            const res = await fetch(`${API}/volunteer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, skills, availability })
            });

            const data = await res.json();

            if (res.ok) {
                const message =
                    `Welcome aboard, ${name}! 🎉\n\n` +
                    `Your volunteer registration has been successfully submitted.\n\n` +
                    (skills ? `Skills: ${skills}\n\n` : "") +
                    `We'll get in touch at ${email} with your next steps. Thank you for making a difference!`;
                showPopup(message, true);
                volunteerForm.reset();
            } else {
                showToast(data.error || "Registration failed. Please try again.", true);
            }
        } catch (err) {
            showToast("Could not reach the server. Please check your connection.", true);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Become a Volunteer';
        }
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
    input.addEventListener("keypress", (e) => {
        if (!/[0-9]/.test(e.key)) e.preventDefault();
    });
}

enforceDigitsOnly("patientPhone");
enforceDigitsOnly("volunteerPhone");

// ==========================
// CLOSE POPUP
// ==========================

const closePopupBtn = document.getElementById("closePopup");
const popupCloseBtnBottom = document.getElementById("popupCloseBtn");

if (closePopupBtn) closePopupBtn.addEventListener("click", hidePopup);
if (popupCloseBtnBottom) popupCloseBtnBottom.addEventListener("click", hidePopup);

window.addEventListener("click", (e) => {
    const popup = document.getElementById("popup");
    if (e.target === popup) hidePopup();
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

    questionInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendBtn.click();
    });
}
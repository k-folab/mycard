document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const subjectEl = document.getElementById("subject");
  const messageEl = document.getElementById("message");
  const successEl = document.getElementById("success");

  function setError(id, el, msg) {
    const box = document.getElementById(id);
    box.textContent = msg;
    box.hidden = false;
    el.setAttribute("aria-invalid", "true");
    el.setAttribute("aria-describedby", id);
  }
  function clearError(id, el) {
    const box = document.getElementById(id);
    box.textContent = "";
    box.hidden = true;
    el.removeAttribute("aria-invalid");
    el.removeAttribute("aria-describedby");
  }

  function validate() {
    let ok = true;
    if (!nameEl.value.trim()) {
      setError("error-name", nameEl, "Full name is required.");
      ok = false;
    } else clearError("error-name", nameEl);
    const emailVal = emailEl.value.trim();
    if (!emailVal) {
      setError("error-email", emailEl, "Email is required.");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setError(
        "error-email",
        emailEl,
        "Enter a valid email (name@example.com)."
      );
      ok = false;
    } else clearError("error-email", emailEl);
    if (!subjectEl.value.trim()) {
      setError("error-subject", subjectEl, "Subject is required.");
      ok = false;
    } else clearError("error-subject", subjectEl);
    if (!messageEl.value.trim()) {
      setError("error-message", messageEl, "Message is required.");
      ok = false;
    } else if (messageEl.value.trim().length < 10) {
      setError(
        "error-message",
        messageEl,
        "Message must be at least 10 characters."
      );
      ok = false;
    } else clearError("error-message", messageEl);
    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successEl.hidden = true;
    if (validate()) {
      successEl.textContent = "Thanks! Your message was sent successfully.";
      successEl.hidden = false;
      form.reset();
      successEl.tabIndex = -1; // make focusable then focus for a11y
      successEl.focus();
    }
  });

  // live field check to improve UX
  [nameEl, emailEl, subjectEl, messageEl].forEach((f) =>
    f.addEventListener("input", validate)
  );
});

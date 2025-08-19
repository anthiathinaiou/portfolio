document.getElementById("currentYear").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const loadingSpinner = document.getElementById("loadingSpinner");
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  formMessage.classList.add("d-none");
  loadingSpinner.classList.remove("d-none");
  submitButton.disabled = true;

  const formData = {
    name: document.getElementById("name").value,
    message: document.getElementById("message").value,
  };

  const urlEncodedData = Object.keys(formData)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
    )
    .join("&");

  const formUrl = this.action;

  try {
    const response = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      formMessage.classList.remove("d-none");
      formMessage.classList.remove("text-danger");
      formMessage.classList.add("text-success");
      formMessage.textContent = result.message;
      contactForm.reset();
    } else {
      throw new Error(result.message || "Unknown error submitting form.");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    formMessage.classList.remove("d-none");
    formMessage.classList.remove("text-success");
    formMessage.classList.add("text-danger");
    formMessage.textContent =
      "There was an error submitting your message. Please try again later.";
  } finally {
    loadingSpinner.classList.add("d-none");
    submitButton.disabled = false;
  }
});

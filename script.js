// AgriSmart frontend behaviour. The data is illustrative and stored nowhere.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("farmerForm");
  const message = document.getElementById("formMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = document.getElementById("farmerName").value.trim();
    const crop = document.getElementById("farmerCrop").value;
    message.textContent = `Thanks, ${name}! Your demo registration for ${crop} has been validated.`;
    form.reset();
  });
});

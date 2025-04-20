// Form Validation Functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}

function validateUsername(username) {
  // 3-20 characters, letters, numbers, underscores
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
}

function validateDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  const currentDate = new Date();
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  return (
    date instanceof Date &&
    !isNaN(date) &&
    date <= currentDate &&
    date >= minDate
  );
}

// Login Form Validation
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-page form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      let isValid = true;

      // Clear previous error messages
      document.querySelectorAll(".error-message").forEach((el) => el.remove());

      // Email validation
      if (!validateEmail(email) && !validateUsername(email)) {
        showError("email", "Please enter a valid email address or username");
        isValid = false;
      }

      // Password validation
      if (!password) {
        showError("password", "Password is required");
        isValid = false;
      }

      if (isValid) {
        // Here you would typically send the data to your server
        console.log("Login form is valid");
        // loginForm.submit();
      }
    });
  }

  // Signup Form Validation
  const signupForm = document.querySelector(".signup-page form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const displayName = document.getElementById("display-name").value;
      const day = document.getElementById("day").value;
      const month = document.getElementById("month").value;
      const year = document.getElementById("year").value;
      const terms = document.getElementById("terms").checked;
      let isValid = true;

      // Clear previous error messages
      document.querySelectorAll(".error-message").forEach((el) => el.remove());

      // Email validation
      if (!validateEmail(email)) {
        showError("email", "Please enter a valid email address");
        isValid = false;
      }

      // Password validation
      if (!validatePassword(password)) {
        showError(
          "password",
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
        );
        isValid = false;
      }

      // Display name validation
      if (!validateUsername(displayName)) {
        showError(
          "display-name",
          "Display name must be 3-20 characters long and can only contain letters, numbers, and underscores"
        );
        isValid = false;
      }

      // Date validation
      if (!validateDate(day, month, year)) {
        showError("day", "Please enter a valid date of birth");
        isValid = false;
      }

      // Terms validation
      if (!terms) {
        showError("terms", "You must agree to the Terms and Conditions");
        isValid = false;
      }

      if (isValid) {
        // Here you would typically send the data to your server
        console.log("Signup form is valid");
        // signupForm.submit();
      }
    });
  }

  // Helper function to show error messages
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.classList.add("error");
  }

  // Real-time validation for input fields
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("error");
      const errorMessage = this.parentNode.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
    });
  });
});

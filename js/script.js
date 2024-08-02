function toggleMenu() {
  var menu = document.getElementById("menu");
  if (menu.style.display === "flex" || menu.style.display === "") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}
var mybutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  // document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
}
document.addEventListener("DOMContentLoaded", function () {
  function checkMenu() {
    var menu = document.getElementById("menu");
    if (window.innerWidth > 768) {
      menu.style.display = "flex";
    } else {
      menu.style.display = "none";
    }
  }

  window.addEventListener("resize", checkMenu);

  // Initial check when the page loads
  checkMenu();

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("div.navbar div.menu a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    });
  });

  // Form validation
  const contactForm = document.querySelector("#contact form");

  contactForm.addEventListener("submit", function (event) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    let valid = true;

    // Clear previous error messages
    document.querySelectorAll(".error").forEach((error) => {
      error.textContent = "";
    });

    // Name validation
    if (name === "") {
      valid = false;
      document.querySelector("#name + .error").textContent =
        "Name is required.";
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
      valid = false;
      document.querySelector("#email + .error").textContent =
        "Email is required.";
    } else if (!emailPattern.test(email)) {
      valid = false;
      document.querySelector("#email + .error").textContent =
        "Enter a valid email address.";
    }

    // Message validation
    if (message === "") {
      valid = false;
      document.querySelector("#message + .error").textContent =
        "Message is required.";
    }

    if (!valid) {
      event.preventDefault();
    }
  });
});

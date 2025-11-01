document.addEventListener("DOMContentLoaded", () => {
    // Header scroll effect
    const header = document.querySelector("header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  
    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Countdown timer
    const countdownDate = new Date("June 15, 2025 09:00:00").getTime()
  
    function updateCountdown() {
      const now = new Date().getTime()
      const distance = countdownDate - now
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  
      document.getElementById("days").innerText = days.toString().padStart(2, "0")
      document.getElementById("hours").innerText = hours.toString().padStart(2, "0")
      document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0")
      document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0")
    }
  
    updateCountdown()
    setInterval(updateCountdown, 1000)
  
    // Schedule tabs
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabPanes.forEach((pane) => pane.classList.remove("active"))
  
        // Add active class to clicked button and corresponding pane
        button.classList.add("active")
        const day = button.getAttribute("data-day")
        document.getElementById(day).classList.add("active")
      })
    })
  
    // Ticket selection
    const ticketButtons = document.querySelectorAll(".select-ticket")
    const ticketSelect = document.getElementById("ticket-type")
  
    ticketButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const ticketType = button.getAttribute("data-ticket")
        ticketSelect.value = ticketType
  
        // Scroll to registration form
        const formElement = document.getElementById("register-form")
        const headerHeight = document.querySelector("header").offsetHeight
        const formPosition = formElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20
  
        window.scrollTo({
          top: formPosition,
          behavior: "smooth",
        })
  
        // Focus on first input
        document.getElementById("name").focus()
      })
    })
  
    // Form validation and submission
    const registerForm = document.getElementById("register-form")
    const successModal = document.getElementById("success-modal")
    const closeModal = document.querySelector(".close-modal")
    const closeBtn = document.querySelector(".close-btn")
  
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Simple validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const ticketType = document.getElementById("ticket-type").value
      const terms = document.getElementById("terms").checked
  
      if (!name || !email || !ticketType || !terms) {
        alert("Please fill in all required fields and accept the terms.")
        return
      }
  
      // Show success modal
      successModal.classList.add("show")
  
      // Reset form
      registerForm.reset()
    })
  
    // Close modal
    closeModal.addEventListener("click", () => {
      successModal.classList.remove("show")
    })
  
    closeBtn.addEventListener("click", () => {
      successModal.classList.remove("show")
    })
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === successModal) {
        successModal.classList.remove("show")
      }
    })
  
    // View all speakers button
    const viewAllBtn = document.getElementById("view-all-speakers")
    const speakersGrid = document.querySelector(".speakers-grid")
  
    viewAllBtn.addEventListener("click", function () {
      // This would typically load more speakers from an API
      // For demo purposes, we'll just toggle a class
      if (this.textContent === "View All Speakers") {
        this.textContent = "Show Less"
        // Here you would add code to show more speakers
        alert("In a real implementation, this would load more speakers from the database.")
      } else {
        this.textContent = "View All Speakers"
        // Here you would add code to show fewer speakers
      }
    })
  
    // Animation on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll(
        ".about-content, .topics-grid, .speakers-grid, .schedule-item, .pricing-card, .registration-form, .sponsors-grid, .venue-content",
      )
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial styles for animation
    document
      .querySelectorAll(
        ".about-content, .topics-grid, .speakers-grid, .schedule-item, .pricing-card, .registration-form, .sponsors-grid, .venue-content",
      )
      .forEach((element) => {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      })
  
    // Run animation on load and scroll
    window.addEventListener("load", animateOnScroll)
    window.addEventListener("scroll", animateOnScroll)
  })
  
  
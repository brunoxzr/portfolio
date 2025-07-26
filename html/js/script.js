/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu")
    })
  }
}
showMenu("nav-toggle", "nav-menu")

/*===== MENU HIDDEN =====*/
const navLink = document.querySelectorAll(".nav__link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  navMenu.classList.remove("show-menu")
}
navLink.forEach((n) => n.addEventListener("click", linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link")
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
  const nav = document.getElementById("header")
  if (this.scrollY >= 200) nav.classList.add("scroll-header")
  else nav.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)

/*===== SHOW SCROLL UP =====*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up")
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll")
  else scrollUp.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollUp)

/*===== SCROLL REVEAL ANIMATION =====*/
function reveal() {
  const reveals = document.querySelectorAll(".reveal")

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight
    const elementTop = reveals[i].getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active")
    }
  }
}

window.addEventListener("scroll", reveal)

// Add reveal class to elements
document.addEventListener("DOMContentLoaded", () => {
  const elementsToReveal = document.querySelectorAll(
    ".feature__card, .achievement__card, .video__card, .testimonial__card, .tech__item",
  )
  elementsToReveal.forEach((el) => el.classList.add("reveal"))
})

/*===== SMOOTH SCROLLING =====*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

/*===== VIDEO MODAL =====*/
const videoCards = document.querySelectorAll(".video__card")
videoCards.forEach((card) => {
  card.addEventListener("click", function () {
    // Add video modal functionality here
    console.log("Video clicked:", this.querySelector(".video__title").textContent)
  })
})

/*===== CONTACT FORM =====*/
const contactForm = document.getElementById("contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const name = this.querySelector('input[type="text"]').value
    const email = this.querySelector('input[type="email"]').value
    const message = this.querySelector("textarea").value

    // Simple validation
    if (name && email && message) {
      // Simulate form submission
      const button = this.querySelector("button")
      const originalText = button.innerHTML

      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
      button.disabled = true

      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Enviado!'
        button.style.backgroundColor = "#28a745"

        setTimeout(() => {
          button.innerHTML = originalText
          button.disabled = false
          button.style.backgroundColor = ""
          this.reset()
        }, 2000)
      }, 1500)
    }
  })
}

/*===== TYPING ANIMATION =====*/
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Initialize typing animation when hero section is visible
const heroTitle = document.querySelector(".hero__title-sub")
if (heroTitle) {
  const originalText = heroTitle.textContent
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeWriter(heroTitle, originalText, 50)
        observer.unobserve(entry.target)
      }
    })
  })
  observer.observe(heroTitle)
}

/*===== PARALLAX EFFECT =====*/
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero__bg")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

/*===== COUNTER ANIMATION =====*/
function animateCounters() {
  const counters = document.querySelectorAll(".stat__number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/\D/g, ""))
    const suffix = counter.textContent.replace(/[0-9]/g, "")
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counter.textContent = target + suffix
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current) + suffix
      }
    }, 20)
  })
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".about__stats")
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.unobserve(entry.target)
      }
    })
  })
  observer.observe(statsSection)
}

/*===== LOADING ANIMATION =====*/
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

/*===== MOBILE MENU CLOSE ON OUTSIDE CLICK =====*/
document.addEventListener("click", (e) => {
  const navMenu = document.getElementById("nav-menu")
  const navToggle = document.getElementById("nav-toggle")

  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("show-menu")
  }
})

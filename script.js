// Background gooey image effect with improved quality and text sync
Shery.imageEffect("#back", {
  style: 5,
  config: {
    a: { value: 2, range: [0, 30] },
    b: { value: -0.97, range: [-1, 1] },
    zindex: { value: -9996999, range: [-9999999, 9999999] },
    aspect: { value: 2.08442978686133 },
    ignoreShapeAspect: { value: true },
    shapePosition: { value: { x: 0, y: 0 } },
    shapeScale: { value: { x: 0.5, y: 0.5 } },
    gooey: { value: true },
    infiniteGooey: { value: true },
    growSize: { value: 4, range: [1, 15] },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1.04, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    noise_speed: { value: 0.2, range: [0, 10] },
    metaball: { value: 0.2, range: [0, 2] },
    noise_height: { value: 0.5, range: [0, 2] },
    noise_scale: { value: 16.03, range: [0, 100] },
  },
  gooey: true,
});

// FIX: Set the initial image to visible with improved quality
const backImages = document.querySelectorAll("#back img");
backImages[0].classList.add("active");

// Text animation
var elems = document.querySelectorAll(".ele");

// initialize — only first h1 visible
elems.forEach((ele) => {
  var h1s = ele.querySelectorAll("h1");
  h1s.forEach((h1, i) => {
    gsap.set(h1, { top: i === 0 ? "0%" : "100%" });
  });
});

var index = 0;
var animating = false;

// Dynamic text elements
const dynamicTexts = document.querySelectorAll(".dynamic-text");
let textIndex = 0;

// Function to change background images and text
function changeBackgroundAndText() {
  if (animating) return;
  animating = true;

  // Get current and next indices
  const currentImgIndex = Array.from(backImages).findIndex(img => img.classList.contains("active"));
  const nextImgIndex = (currentImgIndex + 1) % backImages.length;
  
  // Fade out current image
  gsap.to(backImages[currentImgIndex], {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
    onComplete: function() {
      backImages[currentImgIndex].classList.remove("active");
    }
  });
  
  // Fade in next image
  gsap.fromTo(backImages[nextImgIndex], 
    { opacity: 0 },
    { 
      opacity: 1, 
      duration: 1, 
      ease: "power2.inOut",
      onComplete: function() {
        backImages[nextImgIndex].classList.add("active");
      }
    }
  );
  
  // Change dynamic text
  dynamicTexts[textIndex].classList.remove("active");
  textIndex = (textIndex + 1) % dynamicTexts.length;
  dynamicTexts[textIndex].classList.add("active");

  // Animate hero text
  elems.forEach((ele) => {
    var h1s = ele.querySelectorAll("h1");

    gsap.to(h1s[index], {
      top: "-=100%",
      ease: "expo.inOut",
      duration: 1,
      onComplete: function () {
        gsap.set(h1s[index], { top: "100%" });
      },
    });

    var nextIndex = (index + 1) % h1s.length;

    gsap.to(h1s[nextIndex], {
      top: "-=100%",
      ease: "expo.inOut",
      duration: 1,
      delay: 0.05,
    });
  });

  setTimeout(() => {
    index = (index + 1) % elems[0].querySelectorAll("h1").length;
    animating = false;
  }, 1100);
}

// Auto change background and text every 5 seconds
setInterval(changeBackgroundAndText, 5000);

// Also change on click
document.querySelector("#main").addEventListener("click", changeBackgroundAndText);

// Add scroll animations for new sections
gsap.registerPlugin(ScrollTrigger);

// Animate events section
gsap.utils.toArray('.event-card').forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
});

// Animate team section
gsap.utils.toArray('.team-member').forEach(member => {
  gsap.from(member, {
    scrollTrigger: {
      trigger: member,
      start: "top 85%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
});

// Animate contact section
gsap.from('.contact-info, .contact-form', {
  scrollTrigger: {
    trigger: '#contact',
    start: "top 85%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out"
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handling
document.querySelector('#contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show success message
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  submitBtn.style.background = 'linear-gradient(to right, #4CAF50, #45a049)';
  
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = 'linear-gradient(to right, #ffcc00, #ff9900)';
    this.reset();
  }, 3000);
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const emailInput = this.querySelector('input[type="email"]');
  const button = this.querySelector('button');
  const originalHTML = button.innerHTML;
  
  button.innerHTML = '<i class="fas fa-check"></i>';
  button.style.background = '#4CAF50';
  
  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.style.background = '#ffcc00';
    emailInput.value = '';
    alert('Thank you for subscribing! You will receive updates on upcoming events.');
  }, 1500);
});

// Event button interactions
document.querySelectorAll('.event-btn').forEach(button => {
  button.addEventListener('click', function() {
    const eventTitle = this.closest('.event-card').querySelector('h3').textContent;
    alert(`Thank you for your interest in "${eventTitle}"! Our team will contact you with more details.`);
  });
});

// Initialize stats counter animation
function initStatsCounter() {
  const statItems = document.querySelectorAll('.stat-item h3');
  
  statItems.forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + '+';
    }, 30);
  });
}

// Initialize stats when in view
ScrollTrigger.create({
  trigger: "#heroright",
  start: "top 80%",
  onEnter: initStatsCounter,
  once: true
});
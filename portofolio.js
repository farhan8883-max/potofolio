/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
    let menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
  window.onscroll = function() {headerShadow()};

  function headerShadow() {
    const navHeader =document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";

    } else {

      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";

    }
  }


/* ----- TYPING EFFECT ----- */
 let typingEffect = new Typed(".typedText",{
    strings : ["Designer","Superman","Developer"],
    loop : true,
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
 })


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
 const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true     
 })

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})


/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})



/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 

        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

    }  else {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

    }
  })
}

window.addEventListener('scroll', scrollActive)

function loadComments() {
  const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
  const commentList = document.getElementById('commentList');
  commentList.innerHTML = '';
  savedComments.forEach(comment => {
      displayComment(comment.name, comment.text, comment.time);
  });
}

// Display comment
function displayComment(name, text, time) {
  const commentList = document.getElementById('commentList');
  const listItem = document.createElement('li');
  listItem.className = 'comment';
  listItem.innerHTML = `
      <strong>${name}</strong> 
      <p>${text}</p>
      <time>${time}</time>
  `;
  commentList.appendChild(listItem);
}

// Add a new comment
function addComment() {
  const name = document.getElementById('commenterName').value;
  const text = document.getElementById('commentText').value;
  const time = new Date().toLocaleString();

  if (name && text) {
      // Display the comment in the list
      displayComment(name, text, time);

      // Save the comment to local storage
      const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
      savedComments.push({ name, text, time });
      localStorage.setItem('comments', JSON.stringify(savedComments));

      // Clear input fields
      document.getElementById('commenterName').value = '';
      document.getElementById('commentText').value = '';
  } else {
      alert("Please enter both name and comment.");
  }
}
const slider = document.querySelector('.card-container');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];
let meteors = [];
let comets = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

//// ⭐ STAR FIELD
for (let i = 0; i < 300; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        a: Math.random(),
        d: Math.random() * 0.02
    });
}

//// 🌠 SHOOTING STAR
function createShootingStar() {
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        len: Math.random() * 200 + 100,
        speed: Math.random() * 12 + 8,
        alpha: 1
    });
}
setInterval(createShootingStar, 3500);

//// ☄️ METEOR (BESAR + API)
function createMeteor() {
    meteors.push({
        x: Math.random() * canvas.width,
        y: -100,
        size: Math.random() * 3 + 4,   // BESAR tapi natural
        speed: Math.random() * 2 + 3, // LEBIH LAMBAT
        alpha: 1
    });
}
setInterval(createMeteor, 12000); // ⏱️ MUNCUL SETIAP 12 DETIK


//// 🌌 COMET (LENGKUNG)
function createComet() {
    comets.push({
        x: -100,
        y: Math.random() * canvas.height / 2,
        len: 400,
        speed: 3,
        curve: Math.random() * 0.5 + 0.3,
        alpha: 1
    });
}
setInterval(createComet, 12000);

//// 🎨 DRAW LOOP
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ⭐ Stars
    stars.forEach(s => {
        s.a += s.d;
        if (s.a <= 0 || s.a >= 1) s.d *= -1;
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    });

    // 🌠 Shooting Stars
    shootingStars.forEach((s, i) => {
        ctx.strokeStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y + s.len);
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed;
        s.alpha -= 0.02;
        if (s.alpha <= 0) shootingStars.splice(i, 1);
    });

    // ☄️ Meteors
   meteors.forEach((m, i) => {
    const grad = ctx.createLinearGradient(
        m.x, m.y,
        m.x - 120, m.y + 160
    );
    grad.addColorStop(0, `rgba(255,180,80,${m.alpha})`);
    grad.addColorStop(1, "rgba(255,0,0,0)");

    ctx.strokeStyle = grad;
    ctx.lineWidth = m.size;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - 120, m.y + 160);
    ctx.stroke();

    m.x += m.speed;
    m.y += m.speed * 1.3;
    m.alpha -= 0.004; // fade lebih lama

    if (m.alpha <= 0) meteors.splice(i, 1);
});


    requestAnimationFrame(draw);
}

draw();
const menuBtn = document.getElementById("menuToggle");
const navMenu = document.getElementById("myNavMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuBtn.classList.toggle("uil-bars");
    menuBtn.classList.toggle("uil-times");
});
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuBtn.classList.add("uil-bars");
        menuBtn.classList.remove("uil-times");
    });
});
function scrollToTop() {
    const rocket = document.querySelector('.rocket-btn');

    rocket.classList.add('launch');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(() => {
        rocket.classList.remove('launch');
    }, 900);
}

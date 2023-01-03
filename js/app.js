/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
 * 
*/
const backToTopButtonElement = document.getElementById("btn-back-to-top");
const navBarListElement = document.getElementById('navbar__list');
const sectionElements = document.querySelectorAll('section');


// Build the nav
function buildNavBar() {
    sectionElements.forEach((v, index) => {
        const liElement = document.createElement('li');
        liElement.addEventListener('click', function(event){
            event.preventDefault();
            const y = v.getBoundingClientRect().top;
            scroll(y);
            toggleNavbar();
          });
        liElement.innerHTML = `<span class="nav-link nav-link-${index}">${v.getAttribute('data-nav')}</a>`;
        navBarListElement.appendChild(liElement);
    });

    const lastLiElement = document.createElement('li');
    lastLiElement.className = 'icon';
    lastLiElement.addEventListener('click', toggleNavbar);
    lastLiElement.innerHTML = '<span>&#9776;</button>';
    navBarListElement.appendChild(lastLiElement);
}

// Scroll to anchor ID using scrollTO event
function scroll(sectionElement) {
	window.scrollTo({top: sectionElement, behavior: 'smooth'});
}

// Hanlde how to display button scroll to top
function handleButtonBackToTop() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    backToTopButtonElement.style.display = "block";
  } else {
    backToTopButtonElement.style.display = "none";
  }
}

// Handle event back to top
function backToTop() {
  document.body.scrollTo({ top: 0, behavior: 'smooth' });
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hightlight current section and button in navbar
function handleActiveSection() {
	sectionPositions = [];
	sectionElements.forEach(s => {
    const element = s.getBoundingClientRect();
    console.log(element.top);
    console.log(element.bottom);
    sectionPositions.push(s.getBoundingClientRect().top)
  });
    const sectionElementLength = sectionElements.length;

	let sectionIndex = sectionPositions.findIndex((v) => v > 0);
	for (let i = 0; i < sectionElementLength; i++) {
		if (sectionIndex === i) {
      document.querySelector(`.nav-link.nav-link-${sectionIndex}`).classList.add("active");
			document.querySelector(`#section${i+1}`).classList.add("section-active");
		} else {
      document.querySelector(`.nav-link.nav-link-${i}`).classList.remove("active");
			document.querySelector(`#section${i+1}`).removeAttribute("class");
		}
	}
}

// Toggle Navbar
function toggleNavbar() {
    if (navBarListElement.className === "") {
        navBarListElement.className = "responsive";
    } else {
        navBarListElement.removeAttribute("class")
    }
}

// Listen scroll event and handle other function
window.onscroll = function() {
    handleButtonBackToTop();
    handleActiveSection();
};

buildNavBar();
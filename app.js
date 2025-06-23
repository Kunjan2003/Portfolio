const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

// Header background change on scroll
document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

// Close mobile menu when clicking menu items
menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});



// Scroll indicator click handler
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
	scrollIndicator.addEventListener('click', () => {
		document.querySelector('#services').scrollIntoView({
			behavior: 'smooth'
		});
	});
}

// Intersection Observer for animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate');
		}
	});
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
	const animateElements = document.querySelectorAll('.service-item, .project-item, .stat-item');
	animateElements.forEach(el => observer.observe(el));
});

// Listen for scroll events (removed skill bar animation)

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Add loading animation
window.addEventListener('load', () => {
	document.body.classList.add('loaded');
});

// Typing effect for hero section
const typingTexts = ['Full Stack Developer', 'MERN Stack Expert', 'Problem Solver', 'Web Developer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
	const heroSubtitle = document.querySelector('.hero-subtitle');
	if (!heroSubtitle) return;
	
	const currentText = typingTexts[textIndex];
	
	if (isDeleting) {
		heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
		charIndex--;
	} else {
		heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
		charIndex++;
	}
	
	if (!isDeleting && charIndex === currentText.length) {
		setTimeout(() => isDeleting = true, 2000);
	} else if (isDeleting && charIndex === 0) {
		isDeleting = false;
		textIndex = (textIndex + 1) % typingTexts.length;
	}
	
	const typingSpeed = isDeleting ? 50 : 100;
	setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
setTimeout(typeEffect, 6000);

// Add scroll progress indicator
const createScrollProgress = () => {
	const progressBar = document.createElement('div');
	progressBar.className = 'scroll-progress';
	progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
	document.body.appendChild(progressBar);
	
	window.addEventListener('scroll', () => {
		const scrollTop = window.pageYOffset;
		const docHeight = document.body.offsetHeight - window.innerHeight;
		const scrollPercent = (scrollTop / docHeight) * 100;
		
		const progressBarFill = document.querySelector('.scroll-progress-bar');
		if (progressBarFill) {
			progressBarFill.style.width = scrollPercent + '%';
		}
	});
};

// Initialize scroll progress
createScrollProgress();

// Add back to top button
const createBackToTop = () => {
	const backToTop = document.createElement('button');
	backToTop.className = 'back-to-top';
	backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
	backToTop.setAttribute('aria-label', 'Back to top');
	document.body.appendChild(backToTop);
	
	window.addEventListener('scroll', () => {
		if (window.pageYOffset > 300) {
			backToTop.classList.add('show');
		} else {
			backToTop.classList.remove('show');
		}
	});
	
	backToTop.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
};

// Initialize back to top button
createBackToTop();

// Add form validation for contact (if contact form exists)
const validateEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
};

// Add lazy loading for images
const lazyLoadImages = () => {
	const images = document.querySelectorAll('img[data-src]');
	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.classList.remove('lazy');
				imageObserver.unobserve(img);
			}
		});
	});
	
	images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
lazyLoadImages();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		// Close mobile menu if open
		if (mobile_menu.classList.contains('active')) {
			hamburger.classList.remove('active');
			mobile_menu.classList.remove('active');
		}
	}
});

// Add focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Trap focus in mobile menu when open
const trapFocus = (element) => {
	const focusableContent = element.querySelectorAll(focusableElements);
	const firstFocusableElement = focusableContent[0];
	const lastFocusableElement = focusableContent[focusableContent.length - 1];
	
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Tab') {
			if (e.shiftKey) {
				if (document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus();
					e.preventDefault();
				}
			} else {
				if (document.activeElement === lastFocusableElement) {
					firstFocusableElement.focus();
					e.preventDefault();
				}
			}
		}
	});
};

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
	for (const entry of list.getEntries()) {
		if (entry.entryType === 'navigation') {
			console.log('Page Load Time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
		}
	}
});

performanceObserver.observe({ entryTypes: ['navigation'] });

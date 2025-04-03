document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const indicator = document.querySelector('.indicator');
    
    // Theme toggle code...
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (indicator) {
            indicator.style.transform = 'translateX(25px)';
        }
    }
    
    themeToggle?.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            if (indicator) {
                indicator.style.transform = 'translateX(25px)';
            }
        } else {
            localStorage.setItem('theme', 'light');
            if (indicator) {
                indicator.style.transform = 'translateX(0)';
            }
        }
    });

    // CV Preview functionality
    const downloadLink = document.querySelector('#download-cv');
    downloadLink.addEventListener('click', (e) => {
    e.preventDefault();
    const iframe = document.createElement('iframe');
    iframe.src = 'https://drive.google.com/file/d/1BYjHM1E0P5rbrv2cVpMXgoFc-G_aNHnZ/preview&embedded=true';
    iframe.frameBorder = '0';
    const popup = document.createElement('div');
    popup.classList.add('popup');
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'Close';
    popup.appendChild(closeButton);
    popup.appendChild(iframe);
    document.body.appendChild(popup);

    closeButton.addEventListener('click', () => {
        popup.remove();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
        popup.remove();
        }
    });
    });
    // Add closing bracket here

    // Comment section functionality
    const commentLink = document.querySelector('.comment-link');
    const commentPopup = document.querySelector('.comment-popup');
    const closeCommentBtn = document.createElement('button');
    
    if (commentLink && commentPopup) { // Add null check
        commentLink.addEventListener('click', (e) => {
            e.preventDefault();
            commentPopup.style.display = 'block';
        });
        
        commentPopup.addEventListener('click', (e) => {
            if (e.target === commentPopup) {
                commentPopup.style.display = 'none';
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && commentPopup.style.display === 'block') {
                commentPopup.style.display = 'none';
            }
        });
        
        closeCommentBtn.innerHTML = 'close';
        closeCommentBtn.classList.add('comment-close-btn');
        closeCommentBtn.addEventListener('click', () => {
            commentPopup.style.display = 'none';
        });
        commentPopup.appendChild(closeCommentBtn);
    }


    // GitHub Calendar initialization
    if (typeof GitHubCalendar !== 'undefined') {
        GitHubCalendar(".calendar", "sir-mole", {
            responsive: true,
            tooltips: true,
            global_stats: false, // This hides the total contributions count
            summary_text: '',    // This removes the summary text
        }).then(function(response) {
            console.log("Calendar loaded successfully");
        }).catch(function(error) {
            console.error("Error loading calendar:", error);
        });
    } else {
        console.error("GitHubCalendar library is not loaded");
    }


    // contact.js
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contact-form');
    
        form.addEventListener('submit', function(e) {
            e.preventDefault();
    
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
    
            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
    
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
    
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    
        // Make form inputs responsive
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#3498db';
            });
    
            input.addEventListener('blur', function() {
                this.style.borderColor = '#ddd';
            });
        });
    
        // Add smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    });
    
    
}); // Add closing bracket for DOMContentLoaded

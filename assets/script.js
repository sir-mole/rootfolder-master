document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        // Apply saved theme or system preference
        if (savedTheme) {
            body.classList.toggle('dark-theme', savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            body.classList.toggle('dark-theme', prefersDark);
        }

        // Theme toggle click handler
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                body.classList.toggle('dark-theme', e.matches);
            }
        });
    }

    // CV Preview functionality
    const downloadLink = document.querySelector('#download-cv');
    if (downloadLink) {
        downloadLink.addEventListener('click', (e) => {
            e.preventDefault();
            const iframe = document.createElement('iframe');
            iframe.src = '../assets/docs/Curriculum Vitae Ing Mudasir Ayuba.pdf';
            iframe.frameBorder = '0';
            
            const popup = document.createElement('div');
            popup.classList.add('popup');
            
            const closeButton = document.createElement('button');
            closeButton.classList.add('close-button');
            closeButton.textContent = 'Close';
            
            popup.appendChild(closeButton);
            popup.appendChild(iframe);
            document.body.appendChild(popup);

            const closePopup = () => popup.remove();
            
            closeButton.addEventListener('click', closePopup);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closePopup();
            });
        });
    }

    // Comment section functionality
    const commentLink = document.querySelector('.comment-link');
    const commentPopup = document.querySelector('.comment-popup');
    
    if (commentLink && commentPopup) {
        const closeCommentBtn = document.createElement('button');
        closeCommentBtn.innerHTML = 'close';
        closeCommentBtn.classList.add('comment-close-btn');
        commentPopup.appendChild(closeCommentBtn);

        commentLink.addEventListener('click', (e) => {
            e.preventDefault();
            commentPopup.style.display = 'block';
        });
        
        const closeComment = () => {
            commentPopup.style.display = 'none';
        };

        commentPopup.addEventListener('click', (e) => {
            if (e.target === commentPopup) closeComment();
        });
        
        closeCommentBtn.addEventListener('click', closeComment);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && commentPopup.style.display === 'block') {
                closeComment();
            }
        });
    }

    // In your existing script.js, update the GitHub Calendar section:
    const calendarDiv = document.querySelector('.calendar');
    const username = 'sir-mole'; // Replace with your GitHub username

    if (calendarDiv) {
        fetch(`https://api.github.com/users/${username}/events`)
            .then(response => {
                if (!response.ok) throw new Error('GitHub API request failed');
                return response.json();
            })
            .then(data => {
                // Process the events data to create a contributions map
                const contributionsMap = new Map();
                const today = new Date();
                const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

                // Initialize the past year's worth of dates
                for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
                    contributionsMap.set(d.toISOString().split('T')[0], 0);
                }

                // Count push events
                data.forEach(event => {
                    if (event.type === 'PushEvent') {
                        const date = event.created_at.split('T')[0];
                        if (contributionsMap.has(date)) {
                            contributionsMap.set(date, (contributionsMap.get(date) || 0) + 1);
                        }
                    }
                });

                // Convert to array and sort
                const contributions = Array.from(contributionsMap, ([date, count]) => ({
                    date,
                    count,
                    level: count === 0 ? 0 : Math.min(Math.ceil(count / 2), 4)
                }));

                // Generate HTML
                const calendarHtml = contributions.map(contribution => `
                    <div class="day" data-level="${contribution.level}">
                        <span class="date">${contribution.date}</span>
                        <span class="count">${contribution.count} contribution${contribution.count !== 1 ? 's' : ''}</span>
                    </div>
                `).join('');

                calendarDiv.innerHTML = calendarHtml;
            })
            .catch(error => {
                console.error('GitHub Calendar Error:', error);
                calendarDiv.innerHTML = '<p>Failed to load GitHub contributions</p>';
            });
    }

    // Contact form functionality
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const message = document.getElementById('message')?.value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });

        // Make form inputs responsive
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#3498db';
            });

            input.addEventListener('blur', function() {
                this.style.borderColor = '#ddd';
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

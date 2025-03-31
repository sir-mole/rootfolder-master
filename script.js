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

    // GitHub Calendar initialization
    // Make sure you replace 'sir-mole' with your actual GitHub username
    GitHubCalendar(".calendar", "sir-mole", {
        responsive: true,
        tooltips: true,
        global_stats: true,
        cache: 24 * 60 * 60 * 1000 // Cache for 24 hours
    }).then(r => console.log("Calendar loaded"));
});

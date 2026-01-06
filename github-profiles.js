// =============================================
// GitHub Profiles Page JavaScript
// =============================================

// GitHub API Configuration
const GITHUB_API_BASE = 'https://api.github.com';

// Fallback avatar SVG
const FALLBACK_AVATAR_SVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%236366f1"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="white"%3E%3F%3C/text%3E%3C/svg%3E';

// Profile usernames
const profiles = [
    {
        username: 'lalchandteli',
        fallbackDate: '2020'
    },
    {
        username: 'lal-chand-teli',
        fallbackDate: '2021'
    },
    {
        username: 'lalchand-at-anuda',
        fallbackDate: '2023'
    }
];

// =============================================
// Fetch GitHub User Data
// =============================================
async function fetchGitHubProfile(username) {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch profile for ${username}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching profile for ${username}:`, error);
        return null;
    }
}

// =============================================
// Format Date
// =============================================
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// =============================================
// Format Number with Commas
// =============================================
function formatNumber(num) {
    return (num ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// =============================================
// Update Profile Card with GitHub Data
// =============================================
function updateProfileCard(profileData, cardElement) {
    if (!profileData) {
        // Use fallback data if API fails
        const createdDateElement = cardElement.querySelector('.created-date');
        if (createdDateElement) {
            createdDateElement.textContent = 'Data unavailable';
            createdDateElement.classList.add('unavailable');
        }
        
        // Show em dash for unavailable stats
        const STAT_SELECTORS = ['.repos-count', '.followers-count', '.following-count'];
        STAT_SELECTORS.forEach(selector => {
            const element = cardElement.querySelector(selector);
            if (element) element.textContent = '—';
        });
        
        return;
    }

    // Update creation date
    const createdDateElement = cardElement.querySelector('.created-date');
    if (createdDateElement && profileData.created_at) {
        createdDateElement.textContent = formatDate(profileData.created_at);
        createdDateElement.classList.add('available');
    }

    // Update repositories count
    const reposCountElement = cardElement.querySelector('.repos-count');
    if (reposCountElement) {
        reposCountElement.textContent = formatNumber(profileData.public_repos || 0);
    }

    // Update followers count
    const followersCountElement = cardElement.querySelector('.followers-count');
    if (followersCountElement) {
        followersCountElement.textContent = formatNumber(profileData.followers || 0);
    }

    // Update following count
    const followingCountElement = cardElement.querySelector('.following-count');
    if (followingCountElement) {
        followingCountElement.textContent = formatNumber(profileData.following || 0);
    }

    // Add fade-in animation to stats
    const statBoxes = cardElement.querySelectorAll('.stat-box');
    statBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(10px)';
        box.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// =============================================
// Load All Profiles
// =============================================
async function loadAllProfiles() {
    const profileCards = document.querySelectorAll('.profile-card');
    
    for (let i = 0; i < profiles.length; i++) {
        const profile = profiles[i];
        const cardElement = document.querySelector(`.profile-card[data-username="${profile.username}"]`);
        
        if (cardElement) {
            const profileData = await fetchGitHubProfile(profile.username);
            updateProfileCard(profileData, cardElement);
        }
    }
}

// =============================================
// Mobile Navigation Toggle (from main site)
// =============================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
}

// =============================================
// Scroll Animations
// =============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe profile cards
document.querySelectorAll('.profile-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// =============================================
// Scroll Progress Indicator
// =============================================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// =============================================
// Handle External Links
// =============================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// =============================================
// Initialize on DOM Load
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Load GitHub profiles data
    loadAllProfiles();
    
    // Add entrance animation to hero
    const hero = document.querySelector('.github-profiles-hero');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease';
            hero.style.opacity = '1';
        }, 100);
    }
    
    // Console message
    console.log('%c🐙 GitHub Profiles Viewer', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cExploring multiple GitHub accounts...', 'color: #764ba2; font-size: 14px;');
});

// =============================================
// Error Handling for Images
// =============================================
document.querySelectorAll('.profile-avatar').forEach(img => {
    img.addEventListener('error', function() {
        this.src = FALLBACK_AVATAR_SVG;
    });
});

// Handle contribution chart loading
document.querySelectorAll('.contribution-chart').forEach(img => {
    img.addEventListener('error', function() {
        const parent = this.parentElement;
        parent.innerHTML = '<div class="contribution-chart-fallback"><p>📊 Contribution chart is currently unavailable</p></div>';
    });
});

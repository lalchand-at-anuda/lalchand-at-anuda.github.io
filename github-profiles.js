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
// Fetch Contribution Count for Current Year
// =============================================
async function fetchContributionCount(username) {
    try {
        const currentYear = new Date().getFullYear();
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch contributions for ${username}`);
        }
        const data = await response.json();
        return data.total[currentYear] || 0;
    } catch (error) {
        console.error(`Error fetching contributions for ${username}:`, error);
        return null;
    }
}

// =============================================
// Fetch Total Repositories Count
// =============================================
async function fetchTotalRepos(username) {
    try {
        // Fetch user data to get total public repos
        const userResponse = await fetch(`${GITHUB_API_BASE}/users/${username}`);
        if (!userResponse.ok) {
            throw new Error(`Failed to fetch repos for ${username}`);
        }
        const userData = await userResponse.json();
        
        // Get total public repos (private repos require authentication)
        return {
            public: userData.public_repos || 0,
            total: userData.public_repos || 0 // API doesn't expose private count without auth
        };
    } catch (error) {
        console.error(`Error fetching repos for ${username}:`, error);
        return null;
    }
}

// =============================================
// Fetch All-Time Contributions
// =============================================
async function fetchAllTimeContributions(username) {
    try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch all contributions for ${username}`);
        }
        const data = await response.json();
        
        // Sum all years
        let total = 0;
        if (data.total) {
            Object.values(data.total).forEach(count => {
                total += count;
            });
        }
        return total;
    } catch (error) {
        console.error(`Error fetching all contributions for ${username}:`, error);
        return null;
    }
}

// =============================================
// Determine Profile Status (Single Primary Status)
// =============================================
function determineProfileStatus(profileData, contributionsData) {
    if (!profileData) {
        return null;
    }
    
    // Priority order: Hireable > Very Active > Active > Company > Has Website
    
    // Check if profile is hireable (highest priority)
    if (profileData.hireable) {
        return {
            label: 'Available for hire',
            type: 'hireable',
            icon: '💼'
        };
    }
    
    // Check activity level based on contributions (high priority)
    if (contributionsData > 100) {
        return {
            label: 'Very Active',
            type: 'active',
            icon: '🔥'
        };
    } else if (contributionsData > 50) {
        return {
            label: 'Active',
            type: 'active',
            icon: '✅'
        };
    }
    
    // Check if account has organization membership
    if (profileData.company) {
        return {
            label: profileData.company.replace('@', ''),
            type: 'verified',
            icon: '🏢'
        };
    }
    
    // Check if profile has website/blog
    if (profileData.blog) {
        return {
            label: 'Has Website',
            type: 'verified',
            icon: '🌐'
        };
    }
    
    // Default status based on repos
    if (profileData.public_repos > 0) {
        return {
            label: 'Developer',
            type: 'active',
            icon: '👨‍💻'
        };
    }
    
    return null;
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

// Smoothly animate number counters for stats
function animateCount(element, targetValue, duration = 1200) {
    const startValue = parseInt((element.textContent || '0').replace(/,/g, ''), 10) || 0;
    const startTime = performance.now();
    const safeTarget = Math.max(0, Math.floor(targetValue || 0));

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic for smooth finish
        const current = Math.floor(startValue + (safeTarget - startValue) * eased);
        element.textContent = formatNumber(current);
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// =============================================
// Update Profile Card with GitHub Data
// =============================================
function updateProfileCard(profileData, cardElement, contributionsData) {
    if (!profileData) {
        // Use fallback data if API fails
        const createdDateElement = cardElement.querySelector('.created-date');
        if (createdDateElement) {
            createdDateElement.textContent = 'Data unavailable';
            createdDateElement.classList.add('unavailable');
        }
        
        // Show em dash for unavailable stats
        const STAT_SELECTORS = ['.repos-count', '.contributions-count'];
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

    // Update repositories count (show total public repos)
    const reposCountElement = cardElement.querySelector('.repos-count');
    if (reposCountElement) {
        const totalRepos = profileData.public_repos + (profileData.total_private_repos || 0);
        if (profileData.total_private_repos > 0) {
            reposCountElement.title = `Public: ${profileData.public_repos}, Private: ${profileData.total_private_repos}`;
            animateCount(reposCountElement, totalRepos);
        } else {
            reposCountElement.title = `Public repositories`;
            animateCount(reposCountElement, profileData.public_repos || 0);
        }
    }

    // Update contributions count (all-time)
    const contributionsCountElement = cardElement.querySelector('.contributions-count');
    if (contributionsCountElement) {
        if (contributionsData !== null) {
            contributionsCountElement.title = 'Total contributions (all time)';
            animateCount(contributionsCountElement, contributionsData);
        } else {
            contributionsCountElement.textContent = '—';
        }
    }

    // Update status badge on avatar - ensure status is set
    const statusBadge = cardElement.querySelector('.profile-status-badge');
    if (statusBadge) {
        const statusType = cardElement.getAttribute('data-status');
        statusBadge.setAttribute('data-status', statusType);
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
            // Fetch all data in parallel for better performance
            const [profileData, contributionsData] = await Promise.all([
                fetchGitHubProfile(profile.username),
                fetchAllTimeContributions(profile.username)
            ]);
            
            updateProfileCard(profileData, cardElement, contributionsData);
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

// =============================================
// Subscribe Form Handling
// =============================================
const subscribeForm = document.querySelector('.subscribe-form');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('subscribe-email');
        const email = emailInput.value;
        const submitBtn = subscribeForm.querySelector('.subscribe-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Subscribing...';
        
        try {
            // TODO: Replace with your actual API endpoint
            // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
            
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success state
            subscribeForm.classList.add('success');
            btnText.textContent = 'Subscribed! ✓';
            emailInput.value = '';
            
            // Show success message
            showNotification('Successfully subscribed! Check your email for confirmation.', 'success');
            
            // Reset after 3 seconds
            setTimeout(() => {
                subscribeForm.classList.remove('success');
                btnText.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Error state
            btnText.textContent = 'Try Again';
            submitBtn.disabled = false;
            showNotification('Something went wrong. Please try again.', 'error');
            
            setTimeout(() => {
                btnText.textContent = originalText;
            }, 2000);
        }
    });
}

// =============================================
// Notification System
// =============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations to page
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .notification-icon {
        font-size: 1.25rem;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

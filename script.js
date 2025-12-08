// 聯絡表單提交處理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Gather form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('請填寫所有必填欄位');
                return;
            }

            // Build mailto URL to open the user's email client with prefilled content
            const to = '414570136@m365.fju.edu.tw';
            const subject = encodeURIComponent(`Website Contact from ${name}`);
            const bodyLines = [
                `Name: ${name}`,
                `Sender Email: ${email}`,
                '',
                'Message:',
                message
            ];
            const body = encodeURIComponent(bodyLines.join('\n'));
            const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

            // Try to open mail client. This will hand off to user's mail app.
            window.location.href = mailto;
        });
    }
});

// 平滑滾動到頁面頂部
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 導航菜單項點擊動畫
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Scrollspy: highlight nav link for current section
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = Array.from(document.querySelectorAll('nav a'))
        .filter(a => a.getAttribute('href') && a.getAttribute('href').startsWith('#'));
    const sections = navLinks
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    if (!sections.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const onIntersect = (entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const link = document.querySelector(`nav a[href="#${id}"]`);
            if (!link) return;
            if (entry.isIntersecting) {
                // Only update when active section changed to avoid repeated history updates
                if (window.__lastActiveSection !== id) {
                    window.__lastActiveSection = id;
                    navLinks.forEach(a => a.classList.remove('active'));
                    navLinks.forEach(a => a.removeAttribute('aria-current'));
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'true');
                    // Sync URL hash without adding extra history entries
                    try {
                        history.replaceState(null, '', `#${id}`);
                    } catch (e) {
                        // fallback to direct hash change if replaceState is not available
                        location.hash = `#${id}`;
                    }
                }
            }
        });
    };

    const observer = new IntersectionObserver(onIntersect, observerOptions);
    sections.forEach(sec => observer.observe(sec));
});

// 在頁面底部添加返回頂部按鈕（當用戶滾動時）
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        // 可以在這裡添加返回頂部按鈕的邏輯
    }
});

// 添加頁面加載動畫
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// 響應式導航菜單（用於小螢幕）
function setupMobileNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    // 檢查是否已經添加了移動菜單按鈕
    if (document.querySelector('.mobile-menu-btn')) return;
    
    const btn = document.createElement('button');
    btn.className = 'mobile-menu-btn';
    btn.innerHTML = '☰';
    
    nav.parentElement.insertBefore(btn, nav);
    
    btn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
}

// 在適當的時機設置移動導航
if (window.innerWidth < 768) {
    setupMobileNavigation();
}

window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
        setupMobileNavigation();
    }
});

// 日期更新（Footer 的年份）
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.innerHTML = `&copy; ${currentYear} 你的名字. 版權所有。`;
    }
});

// --- 技能標籤過濾互動 ---
document.addEventListener('DOMContentLoaded', function() {
    const tags = Array.from(document.querySelectorAll('.skills-tags .tag'));
    const categories = Array.from(document.querySelectorAll('.skill-category'));

    if (!tags.length || !categories.length) return;

    function clearFilter() {
        tags.forEach(t => {
            t.setAttribute('aria-pressed', 'false');
            t.classList.remove('active');
        });
        categories.forEach(c => {
            c.classList.remove('category-dim');
            c.classList.remove('category-highlight');
        });
    }

    function applyFilter(tagText, tagEl) {
        let matched = false;
        categories.forEach(cat => {
            const txt = cat.innerText || '';
            if (txt.includes(tagText)) {
                cat.classList.add('category-highlight');
                cat.classList.remove('category-dim');
                matched = true;
            } else {
                cat.classList.add('category-dim');
                cat.classList.remove('category-highlight');
            }
        });

        // If nothing matched, don't dim everything — just flash the container
        if (!matched) {
            categories.forEach(c => c.classList.remove('category-dim'));
        }
    }

    tags.forEach(tag => {
        // ensure aria-pressed exists
        tag.setAttribute('aria-pressed', 'false');

        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            if (isPressed) {
                clearFilter();
                return;
            }
            clearFilter();
            const text = this.textContent.trim();
            this.setAttribute('aria-pressed', 'true');
            this.classList.add('active');
            applyFilter(text, this);
            // scroll matched into view if exists
            const firstMatch = document.querySelector('.skill-category.category-highlight');
            if (firstMatch) firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
});

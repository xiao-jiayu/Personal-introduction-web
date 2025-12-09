// 技能標籤篩選功能
document.addEventListener('DOMContentLoaded', function() {
    const tags = document.querySelectorAll('.skills-tags .tag');
    const categories = document.querySelectorAll('.skill-category');

    console.log('Skill tags found:', tags.length);
    console.log('Skill categories found:', categories.length);

    function clearFilter() {
        tags.forEach(tag => {
            tag.setAttribute('aria-pressed', 'false');
            tag.classList.remove('active');
        });
        categories.forEach(cat => {
            cat.classList.remove('category-dim');
            cat.classList.remove('category-highlight');
        });
    }

    function applyFilter(text) {
        console.log('Applying filter for:', text);
        let matched = false;
        const needle = text.toLowerCase();
        categories.forEach(cat => {
            const listItems = cat.querySelectorAll('li');
            let hasMatch = false;
            listItems.forEach(li => {
                const hay = li.textContent.toLowerCase().trim();
                if (hay.includes(needle)) hasMatch = true;
            });
            if (hasMatch) {
                matched = true;
                console.log('Card matched:', cat.querySelector('h3').textContent);
                cat.classList.add('category-highlight');
                cat.classList.remove('category-dim');
            } else {
                cat.classList.add('category-dim');
                cat.classList.remove('category-highlight');
            }
        });

        // If nothing matched, don't dim everything
        if (!matched) {
            console.log('No matches found');
            categories.forEach(c => c.classList.remove('category-dim'));
        }
    }

    tags.forEach(tag => {
        tag.setAttribute('aria-pressed', 'false');

        tag.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Tag clicked:', this.textContent.trim());
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            if (isPressed) {
                console.log('Clearing filter');
                clearFilter();
                return;
            }
            clearFilter();
            const text = this.textContent.trim();
            this.setAttribute('aria-pressed', 'true');
            this.classList.add('active');
            applyFilter(text);
            const firstMatch = document.querySelector('.skill-category.category-highlight');
            if (firstMatch) firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
});

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

// 捲動時隱藏/顯示 header（手機版 <= 768px）
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    if (!header) return;

    // 只在手機版 (max-width: 768px) 啟用捲動隱藏
    const isMobile = () => window.innerWidth <= 768;

    header.classList.add('show-header');

    let lastY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        if (!isMobile()) return; // 桌面版不處理
        
        const currentY = window.scrollY;
        const delta = currentY - lastY;

        if (delta > 6 && currentY > 20) {
            header.classList.add('hide-header');
            header.classList.remove('show-header');
        } else if (delta < -6) {
            header.classList.add('show-header');
            header.classList.remove('hide-header');
        }

        lastY = currentY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });

    // 視窗大小改變時重置狀態
    window.addEventListener('resize', function() {
        if (!isMobile()) {
            header.classList.remove('hide-header');
            header.classList.add('show-header');
        }
    });
});

// 日期更新（Footer 的年份）
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.innerHTML = `&copy; ${currentYear} 你的名字. 版權所有。`;
    }
});


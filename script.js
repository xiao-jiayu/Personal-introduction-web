// 聯絡表單提交處理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 獲取表單數據
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 簡單的表單驗證
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('請填寫所有必填欄位');
                return;
            }
            
            // 顯示成功訊息（實際應用中應發送到服務器）
            alert(`感謝 ${name}！我們已收到您的訊息，將盡快回覆您。`);
            
            // 重置表單
            contactForm.reset();
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

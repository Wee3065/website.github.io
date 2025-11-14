// Page Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
let currentPage = 'home';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showNotification('ยินดีต้อนรับสู่เว็บไซต์อุปกรณ์ฟื้นฟูสมรรถภาพแขน! 🎉');
    
    // Setup navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            switchPage(targetPage);
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Add scroll animations
    setupScrollAnimations();

    // Random popups
    setupRandomPopups();

    // Setup order form
    setupOrderForm();
});

// Page Transition with Fade
function switchPage(pageId) {
    if (currentPage === pageId) return;

    const targetPage = document.getElementById(`${pageId}-page`);
    const currentPageElement = document.querySelector('.page.active');

    if (!targetPage) return;

    // Fade out current page
    if (currentPageElement) {
        currentPageElement.style.animation = 'fadeOut 0.4s ease-in-out';
        setTimeout(() => {
            currentPageElement.classList.remove('active');
            currentPageElement.style.animation = '';
        }, 400);
    }

    // Fade in new page
    setTimeout(() => {
        targetPage.classList.add('active');
        targetPage.style.animation = 'fadeIn 0.6s ease-in-out';
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        currentPage = pageId;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Show notification
        showNotification(`กำลังแสดงหน้า${getPageName(pageId)}`);
    }, 400);
}

// Add fadeOut animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

function getPageName(pageId) {
    const names = {
        'home': 'หน้าแรก',
        'order': 'สั่งซื้อ',
        'team': 'ผู้พัฒนา',
        'contact': 'ติดต่อเรา'
    };
    return names[pageId] || '';
}

// Popup Functions
function openImagePopup(imageNum) {
    const popup = document.getElementById('popupOverlay');
    const content = document.getElementById('popupContent');
    
    const imageTitles = {
        1: 'กลุ่มคนดูหุ่นยนต์',
        2: 'ทีมงานกายภาพบำบัด',
        3: 'การใช้งานอุปกรณ์',
        4: 'หุ่นยนต์โดยรวม',
        5: 'สนับสนุน การทำเบาะจากเอกการเบาะ',
        6: 'อุปกรณ์หุ่นยนต์'
    };
    
    const imageSrc = `images/image${imageNum}.jpg`;
    const fallbackSrc = `https://via.placeholder.com/600x400/2563EB/FFFFFF?text=Image+${imageNum}`;
    
    content.innerHTML = `
        <h2>${imageTitles[imageNum] || `รูปภาพ ${imageNum}`}</h2>
        <img src="${imageSrc}" 
             alt="${imageTitles[imageNum] || `Image ${imageNum}`}" 
             onerror="this.src='${fallbackSrc}'"
             style="width: 100%; border-radius: 12px; margin-top: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <p style="margin-top: 1rem; color: #666;">คลิกที่พื้นหลังเพื่อปิด</p>
    `;
    
    popup.classList.add('active');
    showNotification(`เปิดดู${imageTitles[imageNum] || 'รูปภาพ'}แล้ว! 📸`);
}

function showPopup(message) {
    const popup = document.getElementById('popupOverlay');
    const content = document.getElementById('popupContent');
    
    content.innerHTML = `
        <h2>${message}</h2>
        <p style="margin-top: 1rem; color: #666;">กำลังเปิดลิงก์...</p>
        <div style="margin-top: 2rem;">
            <button class="btn-ok" onclick="closePopup()" style="
                background: var(--primary-blue);
                color: white;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">ตกลง</button>
        </div>
    `;
    
    popup.classList.add('active');
    showNotification(`เปิด${message}แล้ว! 🔗`);
}

function closePopup() {
    const popup = document.getElementById('popupOverlay');
    popup.classList.remove('active');
    showNotification('ปิดหน้าต่างแล้ว');
}

// Notification System
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.classList.add('active');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.content-section, .image-card, .banner-image-card, .team-member-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Random Popups for Engagement
function setupRandomPopups() {
    const popupMessages = [
        '💡 เคล็ดลับ: ใช้หุ่นยนต์เป็นประจำทุกวันเพื่อผลลัพธ์ที่ดีที่สุด!',
        '🎯 อย่าลืม: ปรับระดับความยากให้เหมาะสมกับสภาพร่างกาย',
        '⏰ แนะนำ: เริ่มจากระยะเวลาสั้นๆ แล้วค่อยๆ เพิ่มขึ้น',
        '📝 จดบันทึก: ติดตามความคืบหน้าเพื่อผลลัพธ์ที่ดีขึ้น',
        '🛡️ ปลอดภัย: อ่านคู่มือการใช้งานก่อนเริ่มต้นเสมอ',
        '✨ ยินดีต้อนรับ: ขอบคุณที่ใช้บริการของเรา!'
    ];

    let popupInterval;
    let lastPopupTime = 0;

    // Show random popup every 30-60 seconds
    function scheduleRandomPopup() {
        const delay = 30000 + Math.random() * 30000; // 30-60 seconds
        
        popupInterval = setTimeout(() => {
            const now = Date.now();
            // Don't show if user just interacted
            if (now - lastPopupTime > 20000) {
                const randomMessage = popupMessages[Math.floor(Math.random() * popupMessages.length)];
                showNotification(randomMessage);
                lastPopupTime = now;
            }
            scheduleRandomPopup();
        }, delay);
    }

    // Start after initial delay
    setTimeout(scheduleRandomPopup, 10000);

    // Track user interactions
    document.addEventListener('click', () => {
        lastPopupTime = Date.now();
    });

    document.addEventListener('scroll', () => {
        lastPopupTime = Date.now();
    });
}

// Smooth Scroll for internal links
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

// Add hover effects to buttons
document.querySelectorAll('.btn-ok').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Add page visibility detection for popups
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        showNotification('ยินดีต้อนรับกลับมา! 👋');
    }
});

// Order Form Functions
function setupOrderForm() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;

    // Calculate prices
    const basePrice = 2500;
    const vatRate = 0.07;
    const vatAmount = basePrice * vatRate;
    const totalAmount = basePrice + vatAmount;

    // Update price display
    document.getElementById('productPrice').textContent = basePrice.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('vatAmount').textContent = vatAmount.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('totalAmount').textContent = totalAmount.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Phone number formatting
    const phoneInput = document.getElementById('customerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });
    }

    // Form submission
    orderForm.addEventListener('submit', handleOrderSubmit);
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitOrderBtn');
    const formData = new FormData(e.target);
    
    const orderData = {
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        customerAddress: formData.get('customerAddress'),
        productPrice: 2500,
        vatAmount: 175,
        totalAmount: 2675,
        orderDate: new Date().toLocaleString('th-TH')
    };

    // Disable button and show loading
    submitBtn.disabled = true;
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = 'กำลังส่งคำสั่งซื้อ...';

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showOrderSuccess(orderData);
        
        // Reset form
        e.target.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalText;
    }, 1500);
}

function showOrderSuccess(orderData) {
    const popup = document.getElementById('popupOverlay');
    const content = document.getElementById('popupContent');
    
    content.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h2 style="color: var(--primary-blue); margin-bottom: 1rem;">สั่งซื้อสำเร็จ!</h2>
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; text-align: left;">
                <h3 style="color: var(--primary-blue); margin-bottom: 1rem; font-size: 1.2rem;">รายละเอียดการสั่งซื้อ</h3>
                <p style="margin: 0.5rem 0;"><strong>ชื่อผู้รับ:</strong> ${orderData.customerName}</p>
                <p style="margin: 0.5rem 0;"><strong>เบอร์โทร:</strong> ${orderData.customerPhone}</p>
                <p style="margin: 0.5rem 0;"><strong>ที่อยู่:</strong> ${orderData.customerAddress}</p>
                <hr style="margin: 1rem 0; border: none; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0.5rem 0;"><strong>ราคาสินค้า:</strong> ${orderData.productPrice.toLocaleString('th-TH')} บาท</p>
                <p style="margin: 0.5rem 0;"><strong>VAT 7%:</strong> ${orderData.vatAmount.toLocaleString('th-TH')} บาท</p>
                <p style="margin: 0.5rem 0; font-size: 1.2rem; color: var(--primary-blue);"><strong>ยอดรวม:</strong> ${orderData.totalAmount.toLocaleString('th-TH')} บาท</p>
                <p style="margin-top: 1rem; color: #64748b; font-size: 0.9rem;">วันที่สั่งซื้อ: ${orderData.orderDate}</p>
            </div>
            <p style="color: #64748b; margin: 1rem 0;">เราจะติดต่อกลับไปในเร็วๆ นี้</p>
            <button class="btn-ok" onclick="closePopup(); switchPage('home');" style="
                background: var(--primary-blue);
                color: white;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 1rem;
            ">ตกลง</button>
        </div>
    `;
    
    popup.classList.add('active');
    showNotification('สั่งซื้อสำเร็จ! เราจะติดต่อกลับไปในเร็วๆ นี้ 🎉');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close popup
    if (e.key === 'Escape') {
        closePopup();
    }
    
    // Number keys for quick navigation
    if (e.ctrlKey || e.metaKey) {
        if (e.key === '1') {
            e.preventDefault();
            switchPage('home');
        } else if (e.key === '2') {
            e.preventDefault();
            switchPage('order');
        } else if (e.key === '3') {
            e.preventDefault();
            switchPage('team');
        } else if (e.key === '4') {
            e.preventDefault();
            switchPage('contact');
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    showNotification('โหลดเสร็จสมบูรณ์! 🎉');
    
    // Add entrance animations to all sections
    document.querySelectorAll('.content-section').forEach((section, index) => {
        setTimeout(() => {
            section.style.animation = 'fadeInUp 0.6s ease-out';
        }, index * 100);
    });
});


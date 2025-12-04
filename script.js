document.addEventListener('DOMContentLoaded', function() {
    // Khai báo các phần tử DOM
    const openingScreen = document.getElementById('openingScreen');
    const videoScreen = document.getElementById('videoScreen');
    const viewMemoriesBtn = document.getElementById('viewMemoriesBtn');
    const memoryVideo = document.getElementById('memoryVideo');
    const transitionOverlay = document.getElementById('transitionOverlay');
    const countdownElement = document.getElementById('countdown');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const replayBtn = document.getElementById('replayBtn');
    const backBtn = document.getElementById('backBtn');
    const particlesContainer = document.getElementById('particles');
    const logoPlaceholder = document.getElementById('logoPlaceholder');
    
    // Biến toàn cục
    let countdownTimer;
    let countdownValue = 10;
    let isVideoPlaying = false;
    
    // 1. Khởi tạo hiệu ứng particles (màu hồng)
    function createParticles() {
        const particleCount = 60;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Kích thước ngẫu nhiên
            const size = Math.random() * 20 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Vị trí ngẫu nhiên
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Màu sắc ngẫu nhiên trong palette hồng
            const colors = [
                'rgba(255, 182, 193, 0.4)',
                'rgba(255, 105, 180, 0.4)',
                'rgba(255, 20, 147, 0.3)',
                'rgba(255, 158, 192, 0.5)',
                'rgba(255, 64, 129, 0.3)'
            ];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Hình dạng ngẫu nhiên (hình tròn hoặc hình trái tim nhỏ)
            if (Math.random() > 0.7) {
                particle.style.borderRadius = '0';
                particle.style.transform = 'rotate(45deg)';
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.background = 'transparent';
                particle.style.borderLeft = `solid ${size/2}px ${colors[Math.floor(Math.random() * colors.length)]}`;
                particle.style.borderRight = `solid ${size/2}px ${colors[Math.floor(Math.random() * colors.length)]}`;
                particle.style.borderBottom = `solid ${size}px ${colors[Math.floor(Math.random() * colors.length)]}`;
                particle.style.borderTop = 'none';
            }
            
            // Animation ngẫu nhiên
            const duration = Math.random() * 25 + 10;
            particle.style.animation = `float ${duration}s linear infinite`;
            
            // Thêm particle vào container
            particlesContainer.appendChild(particle);
        }
        
        // Thêm CSS animation cho particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(90deg); }
                50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(180deg); }
                75% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(270deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 2. Hiệu ứng cho logo
    function setupLogoEffect() {
        // Hiệu ứng nhấp nháy cho logo
        setInterval(() => {
            if (Math.random() > 0.7) {
                logoPlaceholder.style.boxShadow = '0 0 30px rgba(255, 105, 180, 0.8)';
                setTimeout(() => {
                    logoPlaceholder.style.boxShadow = '0 10px 25px rgba(255, 105, 180, 0.3)';
                }, 300);
            }
        }, 2000);
        
        // Hiệu ứng hover
        logoPlaceholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        logoPlaceholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // 3. Bắt đầu đếm ngược tự động phát video
    function startCountdown() {
        countdownElement.textContent = countdownValue;
        
        countdownTimer = setInterval(() => {
            countdownValue--;
            countdownElement.textContent = countdownValue;
            
            if (countdownValue <= 0) {
                clearInterval(countdownTimer);
                showVideoScreen();
            }
        }, 1000);
    }
    
    // 4. Hiệu ứng chuyển màn hình
    function showVideoScreen() {
        // Hiệu ứng chuyển cảnh
        transitionOverlay.style.opacity = '1';
        
        setTimeout(() => {
            openingScreen.classList.add('hidden');
            videoScreen.classList.remove('hidden');
            transitionOverlay.style.opacity = '0';
            
            // Tự động phát video sau 0.5s
            setTimeout(() => {
                memoryVideo.play().then(() => {
                    isVideoPlaying = true;
                    updatePlayPauseButton();
                }).catch(error => {
                    console.log("Tự động phát video bị chặn:", error);
                    // Nếu tự động phát bị chặn, cập nhật nút
                    updatePlayPauseButton();
                });
            }, 500);
            
        }, 800);
    }
    
    // 5. Cập nhật nút play/pause
    function updatePlayPauseButton() {
        const icon = playPauseBtn.querySelector('i');
        const text = playPauseBtn.querySelector('span');
        
        if (isVideoPlaying) {
            icon.className = 'fas fa-pause';
            text.textContent = 'Tạm dừng';
        } else {
            icon.className = 'fas fa-play';
            text.textContent = 'Phát';
        }
    }
    
    // 6. Xử lý sự kiện
    viewMemoriesBtn.addEventListener('click', function() {
        clearInterval(countdownTimer);
        showVideoScreen();
    });
    
    memoryVideo.addEventListener('play', function() {
        isVideoPlaying = true;
        updatePlayPauseButton();
    });
    
    memoryVideo.addEventListener('pause', function() {
        isVideoPlaying = false;
        updatePlayPauseButton();
    });
    
    playPauseBtn.addEventListener('click', function() {
        if (isVideoPlaying) {
            memoryVideo.pause();
        } else {
            memoryVideo.play();
        }
    });
    
    replayBtn.addEventListener('click', function() {
        memoryVideo.currentTime = 0;
        memoryVideo.play();
        isVideoPlaying = true;
        updatePlayPauseButton();
    });
    
    backBtn.addEventListener('click', function() {
        // Tạm dừng video
        memoryVideo.pause();
        isVideoPlaying = false;
        
        // Hiệu ứng chuyển cảnh
        transitionOverlay.style.opacity = '1';
        
        setTimeout(() => {
            videoScreen.classList.add('hidden');
            openingScreen.classList.remove('hidden');
            transitionOverlay.style.opacity = '0';
            
            // Reset và bắt đầu lại đếm ngược
            countdownValue = 10;
            startCountdown();
        }, 800);
    });
    
    // 7. Hiệu ứng cho các thành viên gia đình
    function setupFamilyMembersEffects() {
        const members = document.querySelectorAll('.member');
        
        members.forEach(member => {
            member.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.member-icon');
                icon.style.transform = 'scale(1.2)';
                icon.style.boxShadow = '0 15px 30px rgba(255, 105, 180, 0.4)';
            });
            
            member.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.member-icon');
                icon.style.transform = 'scale(1)';
                icon.style.boxShadow = '0 8px 20px rgba(255, 105, 180, 0.25)';
            });
        });
    }
    
    // 8. Hiệu ứng cho các phần tử bay
    function setupFloatingElementsEffects() {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach(element => {
            // Thêm hiệu ứng lấp lánh ngẫu nhiên
            setInterval(() => {
                if (Math.random() > 0.5) {
                    element.style.opacity = Math.random() * 0.4 + 0.4;
                    element.style.color = Math.random() > 0.5 ? 
                        'rgba(255, 105, 180, 0.7)' : 'rgba(255, 64, 129, 0.7)';
                }
            }, 2000);
        });
    }
    
    // 9. Khởi tạo
    function init() {
        // Tạo particles
        createParticles();
        
        // Thiết lập hiệu ứng logo
        setupLogoEffect();
        
        // Thiết lập hiệu ứng thành viên gia đình
        setupFamilyMembersEffects();
        
        // Thiết lập hiệu ứng phần tử bay
        setupFloatingElementsEffects();
        
        // Bắt đầu đếm ngược
        startCountdown();
        
        // Thiết lập video
        memoryVideo.controls = true;
        
        // Thêm hiệu ứng hover cho các nút
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Hiệu ứng cho các giá trị gia đình
        const values = document.querySelectorAll('.value');
        values.forEach(value => {
            value.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                icon.style.transform = 'scale(1.3)';
                icon.style.color = '#ff5599';
            });
            
            value.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                icon.style.transform = 'scale(1)';
                icon.style.color = '#ff4081';
            });
        });
    }
    
    // Chạy khởi tạo
    init();
});
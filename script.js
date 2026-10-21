// Hiệu ứng hiển thị dần khi cuộn trang
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Hiệu ứng đánh máy chữ (Typing effect)
const textElement = document.querySelector('.typing-text');
const textArray = ["Mình là một Lập trình viên Web.", "Mình là một Sinh viên CNTT.", "Mình yêu thích sáng tạo."];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Dừng 2 giây khi gõ xong
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500); // Đợi 0.5s trước khi gõ câu tiếp theo
    } else {
        setTimeout(type, isDeleting ? 50 : 100); // Tốc độ gõ
    }
}
// Bắt đầu hiệu ứng sau khi trang tải xong
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000); 
});

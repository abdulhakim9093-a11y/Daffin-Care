// ===== NOTIFICATION FUNCTION =====
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.classList.remove('hide');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 300);
    }, duration);
}

// ===== LOADING SPINNER FUNCTION =====
function showLoading(show = true) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (show) {
        loadingOverlay.classList.add('active');
    } else {
        loadingOverlay.classList.remove('active');
    }
}

// ===== CONFIRMATION DIALOG =====
function showConfirmation(message) {
    return new Promise((resolve) => {
        const userConfirmed = confirm(message);
        resolve(userConfirmed);
    });
}

// ===== VALIDATE PHONE NUMBER =====
function validatePhoneNumber(phone) {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    return phoneRegex.test(phone);
}

// ===== VALIDATE EMAIL =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== VALIDATE DATE (TIDAK BOLEH TANGGAL LAMPAU) =====
function validateEstimasiDate(dateString) {
    if (!dateString) return false;
    
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today;
}

// ===== COMPRESS IMAGE TO BASE64 (OPTIMIZED FOR STORAGE) =====
function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Calculate new dimensions while maintaining aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to JPEG with quality compression
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                
                // Check file size (in KB)
                const sizeInKB = (compressedBase64.length * 0.75) / 1024;
                
                resolve({
                    base64: compressedBase64,
                    sizeKB: Math.round(sizeInKB)
                });
            };
            
            img.onerror = () => {
                reject(new Error('Gagal memproses gambar'));
            };
            
            img.src = e.target.result;
        };
        
        reader.onerror = () => {
            reject(new Error('Gagal membaca file'));
        };
        
        reader.readAsDataURL(file);
    });
}

// ===== CONVERT FILE TO BASE64 (WITH COMPRESSION) =====
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (file.size > maxSize) {
            showNotification('❌ Ukuran foto terlalu besar (max 5MB)', 3000);
            reject(new Error('File terlalu besar'));
            return;
        }
        
        // Compress the image
        compressImage(file, 800, 800, 0.75)
            .then((result) => {
                console.log(`Foto berhasil dikompres: ${result.sizeKB}KB`);
                resolve(result.base64);
            })
            .catch((error) => {
                console.error('Error compressing image:', error);
                reject(error);
            });
    });
}

// ===== FORMAT CURRENCY =====
function formatCurrency(amount) {
    return parseInt(amount).toLocaleString('id-ID');
}

// ===== FORMAT DATE =====
function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ===== VALIDATE FORM FIELD =====
function validateField(fieldId, rules = {}) {
    const field = document.getElementById(fieldId);
    if (!field) return false;

    const value = field.value.trim();
    
    if (rules.required && !value) {
        return false;
    }
    
    if (rules.minLength && value.length < rules.minLength) {
        return false;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
        return false;
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
        return false;
    }
    
    return true;
}

// ===== CLEAR SESSION STORAGE =====
function clearSessionData() {
    sessionStorage.removeItem('layananData');
    sessionStorage.removeItem('layanan');
    sessionStorage.removeItem('nama');
    sessionStorage.removeItem('noTelp');
}

// ===== FORMAT PHONE NUMBER FOR WHATSAPP =====
function formatPhoneForWhatsApp(phone) {
    let phoneNumber = phone;
    if (phoneNumber.startsWith('0')) {
        phoneNumber = '62' + phoneNumber.substring(1);
    }
    return phoneNumber;
}

// ===== DETECT PAGE REFRESH & CLEANUP =====
window.addEventListener('beforeunload', () => {
    clearSessionData();
});

// ===== CALCULATE TOTAL FROM LAYANAN DATA =====
function calculateTotal(layananData) {
    return layananData.reduce((sum, item) => {
        return sum + (parseInt(item.harga) * parseInt(item.qty));
    }, 0);
}

// ===== HANDLE API ERROR RESPONSE =====
function handleApiError(error, customMessage = null) {
    console.error('API Error:', error);
    
    let errorMessage = customMessage || 'Terjadi kesalahan saat menyimpan data';
    
    if (error.message) {
        errorMessage = error.message;
    }
    
    if (error.response && error.response.status) {
        if (error.response.status === 400) {
            errorMessage = 'Data tidak valid. Silahkan cek kembali.';
        } else if (error.response.status === 401) {
            errorMessage = 'Akses tidak diizinkan. Silahkan login kembali.';
        } else if (error.response.status === 403) {
            errorMessage = 'Anda tidak memiliki akses.';
        } else if (error.response.status === 500) {
            errorMessage = 'Server error. Silahkan coba lagi nanti.';
        } else if (error.response.status >= 500) {
            errorMessage = 'Server sedang tidak tersedia.';
        }
    }
    
    return errorMessage;
}

// ===== VALIDATE GOOGLE SHEETS RESPONSE =====
function validateGoogleSheetsResponse(response) {
    if (!response) {
        throw new Error('Response kosong dari server');
    }
    
    if (response.error) {
        throw new Error(response.error);
    }
    
    if (response.success === false) {
        throw new Error(response.message || 'Gagal menyimpan data ke Google Sheets');
    }
    
    if (response.success !== true) {
        throw new Error('Response format tidak valid');
    }
    
    return true;
}
// ===== KONFIGURASI =====
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercontent';
// Ganti YOUR_DEPLOYMENT_ID dengan ID dari AppScript deployment Anda

// ===== SHOW PAGE =====
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// ===== TRANSAKSI PAGE =====
const transaksiForm = document.getElementById('formTransaksi');
const btnLanjutkan = document.getElementById('btnLanjutkan');
const btnBackTransaksi = document.getElementById('backTransaksiBtn');

// ===== HANDLE FOTO UPLOAD =====
const fotoUploadArea = document.getElementById('fotoUploadArea');
const fotoInput = document.getElementById('fotoInput');
const fotoPreview = document.getElementById('fotoPreview');

fotoUploadArea.addEventListener('click', () => {
    fotoInput.click();
});

fotoInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
        showLoading(true);
        const compressedBase64 = await fileToBase64(file);
        
        // Tampilkan preview
        const img = document.createElement('img');
        img.src = compressedBase64;
        img.style.maxWidth = '200px';
        
        fotoPreview.innerHTML = '';
        fotoPreview.appendChild(img);
        
        // Simpan di memory untuk digunakan saat submit
        window.currentFoto = compressedBase64;
        
        showNotification('✓ Foto berhasil dikompres', 2000);
    } catch (error) {
        showNotification('❌ Gagal memproses foto: ' + error.message, 3000);
    } finally {
        showLoading(false);
    }
});

// ===== VALIDATE & LANJUTKAN =====
btnLanjutkan.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const nama = document.getElementById('namaPelanggan').value.trim();
    const noTelp = document.getElementById('noTelpPelanggan').value.trim();
    const tanggal = document.getElementById('tanggalTransaksi').value;
    
    if (!nama || !noTelp || !tanggal) {
        showNotification('❌ Nama, No Telp, dan Tanggal harus diisi', 3000);
        return;
    }
    
    if (!validatePhoneNumber(noTelp)) {
        showNotification('❌ Format nomor telepon tidak valid', 3000);
        return;
    }
    
    if (!validateEstimasiDate(tanggal)) {
        showNotification('❌ Tanggal tidak boleh tanggal lampau', 3000);
        return;
    }
    
    // Simpan data ke window untuk page selanjutnya
    window.transaksiData = {
        nama,
        noTelp,
        tanggal
    };
    
    showPage('pageLayanan');
    setupSearchLayanan();
});

// ===== LAYANAN PAGE =====
const layananContainer = document.getElementById('layananListContainer');
const searchLayanan = document.getElementById('searchLayanan');
const btnKembaliLayanan = document.getElementById('btnKembaliLayanan');

function setupSearchLayanan() {
    searchLayanan.value = '';
    
    searchLayanan.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.layanan-item');
        
        items.forEach(item => {
            if (item.textContent.toLowerCase().includes(keyword)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}

btnKembaliLayanan.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('pageTransaksi');
});

// ===== RENDER LAYANAN LIST =====
const layananList = [
    'Sepatu Gunung',
    'Tas Ransel',
    'Jaket',
    'Celana Panjang',
    'Kaos Olahraga',
    'Sweater',
    'Kemeja',
    'Celana Pendek'
];

layananContainer.innerHTML = '';
layananList.forEach(layanan => {
    const li = document.createElement('li');
    li.className = 'layanan-item';
    li.textContent = layanan;
    li.addEventListener('click', () => handleLayananClick(layanan));
    layananContainer.appendChild(li);
});

function handleLayananClick(layanan) {
    window.transaksiData.layanan = layanan;
    showPage('pageKonfirmasi');
    renderKonfirmasi();
}

// ===== KONFIRMASI PAGE =====
const konfirmasiDetailContainer = document.getElementById('konfirmasiDetailContainer');
const btnSimpanKonfirmasi = document.getElementById('btnSimpanKonfirmasi');
const btnBackKonfirmasi = document.getElementById('backKonfirmasiBtn');

function renderKonfirmasi() {
    const data = window.transaksiData;
    
    konfirmasiDetailContainer.innerHTML = `
        <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; color: #999;">Nama Pelanggan</label>
            <div style="font-size: 16px; color: #1a1a2e; margin-top: 5px;">${data.nama}</div>
        </div>
        <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; color: #999;">No Telepon</label>
            <div style="font-size: 16px; color: #1a1a2e; margin-top: 5px;">${data.noTelp}</div>
        </div>
        <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; color: #999;">Tanggal</label>
            <div style="font-size: 16px; color: #1a1a2e; margin-top: 5px;">${formatDate(data.tanggal)}</div>
        </div>
        <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; color: #999;">Layanan</label>
            <div style="font-size: 16px; color: #1a1a2e; margin-top: 5px;">${data.layanan}</div>
        </div>
        ${window.currentFoto ? '<div style="margin-bottom: 20px;"><img src="' + window.currentFoto + '" style="max-width: 200px; border-radius: 4px;"></div>' : ''}
    `;
}

btnSimpanKonfirmasi.addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
        showLoading(true);
        
        const data = {
            type: 'transaksi',
            tanggal: window.transaksiData.tanggal,
            nama: window.transaksiData.nama,
            no_telp: window.transaksiData.noTelp,
            item: window.transaksiData.layanan,
            treatment: '',
            ukuran: '',
            qty: '1',
            harga: '0',
            total: '0',
            pembayaran: 'Belum Bayar',
            keterangan: '',
            estimasi: '',
            status: 'Masuk',
            foto: window.currentFoto || ''
        };
        
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message);
        }
        
        showNotification('✓ ' + result.message, 2000);
        
        // Clear data
        window.transaksiData = null;
        window.currentFoto = null;
        fotoPreview.innerHTML = '';
        fotoInput.value = '';
        transaksiForm.reset();
        
        setTimeout(() => {
            showPage('pageDashboard');
        }, 2000);
        
    } catch (error) {
        showNotification('❌ ' + error.message, 3000);
    } finally {
        showLoading(false);
    }
});

btnBackKonfirmasi.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('pageLayanan');
});

btnBackTransaksi.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('pageDashboard');
});

// ===== MENU DASHBOARD =====
const menuTransaksi = document.getElementById('menuTransaksi');
menuTransaksi.addEventListener('click', () => {
    transaksiForm.reset();
    fotoPreview.innerHTML = '';
    fotoInput.value = '';
    window.transaksiData = null;
    window.currentFoto = null;
    showPage('pageTransaksi');
});
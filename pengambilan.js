// ===== PENGAMBILAN FUNCTIONS =====

// Render daftar pelanggan dari data transaksi
function renderPengambilanList() {
    const transaksiData = JSON.parse(sessionStorage.getItem('transaksiData') || '[]');
    const pengambilanListBody = document.getElementById('pengambilanListBody');
    const emptyStatePengambilan = document.getElementById('emptyStatePengambilan');
    const pengambilanTableWrapper = document.querySelector('.pengambilan-table-wrapper');

    if (transaksiData.length === 0) {
        emptyStatePengambilan.style.display = 'flex';
        pengambilanTableWrapper.style.display = 'none';
        pengambilanListBody.innerHTML = '';
        return;
    }

    // Kelompokkan data transaksi unik berdasarkan nama & no telp
    const pelangganMap = new Map();
    transaksiData.forEach(item => {
        const key = `${item.nama}|${item.noTelp}`;
        if (!pelangganMap.has(key)) {
            pelangganMap.set(key, {
                nama: item.nama,
                noTelp: item.noTelp,
                status: item.status || 'Belum Ambil'
            });
        }
    });

    const pelangganList = Array.from(pelangganMap.values());

    if (pelangganList.length === 0) {
        emptyStatePengambilan.style.display = 'flex';
        pengambilanTableWrapper.style.display = 'none';
        pengambilanListBody.innerHTML = '';
        return;
    }

    emptyStatePengambilan.style.display = 'none';
    pengambilanTableWrapper.style.display = 'block';

    let html = '';
    pelangganList.forEach((pelanggan, index) => {
        html += `
            <div class="pengambilan-table-row">
                <div class="col-nama">${pelanggan.nama}</div>
                <div class="col-telp">${pelanggan.noTelp}</div>
                <div class="col-status">${pelanggan.status}</div>
                <div class="col-aksi">
                    <button class="btn-lihat-pengambilan" 
                        data-nama="${pelanggan.nama}" 
                        data-telp="${pelanggan.noTelp}" 
                        data-status="${pelanggan.status}"
                        aria-label="Lihat ${pelanggan.nama}">
                        Lihat
                    </button>
                </div>
            </div>
        `;
    });

    pengambilanListBody.innerHTML = html;

    document.querySelectorAll('.btn-lihat-pengambilan').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const nama = btn.getAttribute('data-nama');
            const telp = btn.getAttribute('data-telp');
            const status = btn.getAttribute('data-status');
            handleLihatPengambilan(nama, telp, status);
        });
    });
}

// Handler ketika tombol Lihat diklik - membuka modal dengan detail item
function handleLihatPengambilan(nama, noTelp, status) {
    const transaksiData = JSON.parse(sessionStorage.getItem('transaksiData') || '[]');
    const pelangganTransaksi = transaksiData.filter(item => item.nama === nama && item.noTelp === noTelp);

    if (pelangganTransaksi.length === 0) {
        showNotification('❌ Data transaksi tidak ditemukan', 3000);
        return;
    }

    document.getElementById('infoPelangganNama').textContent = nama;
    document.getElementById('infoPelangganTelp').textContent = noTelp;
    document.getElementById('infoPelangganStatus').textContent = status;
    
    document.getElementById('modalStatusPengambilan').value = status;

    displayDetailItemInModal(pelangganTransaksi);

    document.getElementById('modalPengambilanOverlay').classList.add('active');

    sessionStorage.setItem('currentPengambilanNama', nama);
    sessionStorage.setItem('currentPengambilanTelp', noTelp);
}

// ===== TAMPILKAN DETAIL ITEM DI DALAM MODAL (HANYA FOTO, TANPA TULISAN) =====
function displayDetailItemInModal(transaksiList) {
    const container = document.getElementById('modalPengambilanDetailTransaksi');
    let html = '';

    transaksiList.forEach((transaksi, idx) => {
        // Ambil foto dari transaksi
        const foto = transaksi.foto || '';
        
        // Hanya tampilkan foto, tanpa tulisan item
        if (foto) {
            html += `
                <div class="pengambilan-detail-item">
                    <img src="${foto}" alt="Foto transaksi" style="width: 100%; max-height: 250px; border-radius: 4px; object-fit: contain;">
                </div>
            `;
        }
    });

    // Jika tidak ada foto, tampilkan pesan
    if (!html) {
        html = '<div style="font-size: 14px; color: #999; text-align: center; padding: 20px;">Tidak ada foto</div>';
    }

    container.innerHTML = html;
}

// Fitur search pengambilan
function setupSearchPengambilan() {
    const searchInput = document.getElementById('searchPengambilan');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('.pengambilan-table-row');

            rows.forEach(row => {
                const nama = row.querySelector('.col-nama').textContent.toLowerCase();
                const telp = row.querySelector('.col-telp').textContent.toLowerCase();
                const status = row.querySelector('.col-status').textContent.toLowerCase();

                if (nama.includes(keyword) || telp.includes(keyword) || status.includes(keyword)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// ===== MODAL PENGAMBILAN EVENTS (EDIT STATUS HANYA DI APLIKASI) =====

const modalPengambilanOverlay = document.getElementById('modalPengambilanOverlay');
const btnClosePengambilan = document.getElementById('btnClosePengambilan');
const btnBatalPengambilan = document.getElementById('btnBatalPengambilan');
const formEditStatusPengambilan = document.getElementById('formEditStatusPengambilan');

// Close modal
function closePengambilanModal() {
    modalPengambilanOverlay.classList.remove('active');
    sessionStorage.removeItem('currentPengambilanNama');
    sessionStorage.removeItem('currentPengambilanTelp');
}

btnClosePengambilan.addEventListener('click', (e) => {
    e.preventDefault();
    closePengambilanModal();
});

btnBatalPengambilan.addEventListener('click', (e) => {
    e.preventDefault();
    closePengambilanModal();
});

// Close modal dengan ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalPengambilanOverlay.classList.contains('active')) {
        closePengambilanModal();
    }
});

// Form submit untuk simpan status - HANYA DI APLIKASI, TIDAK KE GOOGLE SHEETS
if (formEditStatusPengambilan) {
    formEditStatusPengambilan.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nama = sessionStorage.getItem('currentPengambilanNama');
        const noTelp = sessionStorage.getItem('currentPengambilanTelp');
        const newStatus = document.getElementById('modalStatusPengambilan').value;

        if (!nama || !noTelp) {
            showNotification('❌ Data pelanggan tidak valid', 3000);
            return;
        }

        try {
            let transaksiData = JSON.parse(sessionStorage.getItem('transaksiData') || '[]');
            let updateCount = 0;

            transaksiData = transaksiData.map(item => {
                if (item.nama === nama && item.noTelp === noTelp) {
                    updateCount++;
                    return { ...item, status: newStatus };
                }
                return item;
            });

            sessionStorage.setItem('transaksiData', JSON.stringify(transaksiData));

            showNotification(`✓ Status berhasil diubah menjadi "${newStatus}" untuk ${updateCount} transaksi`, 2000);

            closePengambilanModal();

            renderPengambilanList();

        } catch (error) {
            console.error('Error:', error);
            showNotification('❌ Terjadi kesalahan: ' + error.message, 4000);
        }
    });
}

// ===== EVENT LISTENERS UNTUK PENGAMBILAN =====

// Menu Pengambilan di Dashboard
const menuPengambilan = document.getElementById('menuPengambilan');
if (menuPengambilan) {
    menuPengambilan.addEventListener('click', () => {
        showPage('pagePengambilan');
        renderPengambilanList();
        setupSearchPengambilan();
    });
}

// Back button Pengambilan
const backPengambilanBtn = document.getElementById('backPengambilanBtn');
if (backPengambilanBtn) {
    backPengambilanBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('pageDashboard');
    });
}

// Initialize ketika halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    setupSearchPengambilan();
});
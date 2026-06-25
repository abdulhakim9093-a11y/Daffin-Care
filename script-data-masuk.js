// ===== DATA MASUK FUNCTIONS =====

// Render daftar data masuk dari transaksi yang sudah disimpan
function renderDataMasukList() {
    const transaksiData = JSON.parse(sessionStorage.getItem('transaksiData') || '[]');
    const dataMasukListBody = document.getElementById('dataMasukListBody');
    const emptyStateDataMasuk = document.getElementById('emptyStateDataMasuk');
    const dataMasukTableWrapper = document.querySelector('.data-masuk-table-wrapper');

    if (transaksiData.length === 0) {
        emptyStateDataMasuk.style.display = 'flex';
        dataMasukTableWrapper.style.display = 'none';
        dataMasukListBody.innerHTML = '';
        return;
    }

    emptyStateDataMasuk.style.display = 'none';
    dataMasukTableWrapper.style.display = 'block';

    let html = '';
    transaksiData.forEach((transaksi, index) => {
        let detailOrderText = '';
        if (transaksi.layananData && Array.isArray(transaksi.layananData)) {
            detailOrderText = transaksi.layananData
                .map(item => `${item.detailItem} (${item.treatment})`)
                .join(', ');
        } else {
            detailOrderText = '-';
        }

        html += `
            <div class="data-masuk-table-row">
                <div class="col-nama">${transaksi.nama}</div>
                <div class="col-telp">${transaksi.noTelp}</div>
                <div class="col-detail">${detailOrderText}</div>
                <div class="col-aksi">
                    <button class="btn-edit-data-masuk" 
                        data-index="${index}" 
                        aria-label="Edit ${transaksi.nama}">
                        Edit
                    </button>
                    <button class="btn-hapus-data-masuk" 
                        data-index="${index}" 
                        aria-label="Hapus ${transaksi.nama}">
                        Hapus
                    </button>
                </div>
            </div>
        `;
    });

    dataMasukListBody.innerHTML = html;

    document.querySelectorAll('.btn-edit-data-masuk').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const index = btn.getAttribute('data-index');
            handleEditDataMasuk(index);
        });
    });

    document.querySelectorAll('.btn-hapus-data-masuk').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const index = btn.getAttribute('data-index');
            const confirmed = await showConfirmation('Yakin ingin menghapus data ini?');
            if (confirmed) {
                handleHapusDataMasuk(index);
            }
        });
    });
}

// Fitur search data masuk
function setupSearchDataMasuk() {
    const searchInput = document.getElementById('searchDataMasuk');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('.data-masuk-table-row');

            rows.forEach(row => {
                const nama = row.querySelector('.col-nama').textContent.toLowerCase();
                const telp = row.querySelector('.col-telp').textContent.toLowerCase();
                const detail = row.querySelector('.col-detail').textContent.toLowerCase();

                if (nama.includes(keyword) || telp.includes(keyword) || detail.includes(keyword)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// Handler untuk Edit Data Masuk
function handleEditDataMasuk(index) {
    const transaksiData = JSON.parse(sessionStorage.getItem('transaksiData') || '[]');
    const transaksi = transaksiData[index];

    if (!transaksi) {
        showNotification('❌ Data tidak ditemukan', 3000);
        return;
    }

    sessionStorage.setItem('currentEditDataMasukIndex', index);

    document.getElementById('editDataMasukNama').value = transaksi.nama;
    document.getElementById('editDataMasukNoTelp').value = transaksi.noTelp;
    document.getElementById('editDataMasukPembayaran').value = transaksi.pembayaran || '';
    document.getElementById('editDataMasukKeterangan').value = transaksi.keterangan || '';
    document.getElementById('editDataMasukEstimasiSelesai').value = transaksi.estimasi || '';
    document.getElementById('editDataMasukStatus').value = transaksi.status || 'Belum Ambil';

    renderEditDataMasukDetailOrder(transaksi.layananData || []);

    if (transaksi.foto) {
        const editFotoPreview = document.getElementById('editDataMasukFotoPreview');
        editFotoPreview.innerHTML = `<img src="${transaksi.foto}" alt="Preview">`;
    }

    showPage('pageEditDataMasuk');
}

// Render detail order di halaman edit
function renderEditDataMasukDetailOrder(layananData) {
    const editDataMasukDetailOrder = document.getElementById('editDataMasukDetailOrder');

    let html = '';
    let totalKeseluruhan = 0;
    
    if (!layananData || layananData.length === 0) {
        editDataMasukDetailOrder.innerHTML = '<p style="color: #999;">Tidak ada detail order</p>';
        return;
    }

    layananData.forEach((item) => {
        const total = parseInt(item.harga) * parseInt(item.qty);
        totalKeseluruhan += total;
        html += `
            <div class="order-item">
                <div class="order-item-row-labels-top">
                    <div class="order-item-col-left">
                        <div class="order-item-label">Detail Item</div>
                    </div>
                    <div class="order-item-col-center">
                        <div class="order-item-label">Harga</div>
                    </div>
                    <div class="order-item-col-right">
                        <div class="order-item-label">Ukuran</div>
                    </div>
                </div>

                <div class="order-item-row-top">
                    <div class="order-item-col-left">
                        <div class="order-item-text">${item.detailItem}</div>
                        <div class="order-item-text">${item.treatment}</div>
                    </div>
                    <div class="order-item-col-center">
                        <div class="order-item-text">Rp ${formatCurrency(item.harga)}</div>
                    </div>
                    <div class="order-item-col-right">
                        <div class="order-item-text">${item.ukuran || '-'}</div>
                    </div>
                </div>
                
                <div class="order-item-row-labels">
                    <div class="order-item-col-left">
                        <div class="order-item-label">Qty</div>
                    </div>
                    <div class="order-item-col-center">
                        <div class="order-item-label">Total</div>
                    </div>
                    <div class="order-item-col-right">
                    </div>
                </div>

                <div class="order-item-row-bottom">
                    <div class="order-item-col-left">
                        <div class="order-item-text">${item.qty}</div>
                    </div>
                    <div class="order-item-col-center">
                        <div class="order-item-text">Rp ${formatCurrency(total)}</div>
                    </div>
                    <div class="order-item-col-right">
                    </div>
                </div>
            </div>
        `;
    });

    html += `
        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #1a1a2e;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 16px; font-weight: 700; color: #1a1a2e;">Total Keseluruhan:</span>
                <span style="font-size: 18px; font-weight: 700; color: #4caf50;">Rp ${formatCurrency(totalKeseluruhan)}</span>
            </div>
        </div>
    `;

    editDataMasukDetailOrder.innerHTML = html;
}

// Handler untuk Hapus Data Masuk
function handleHapusDataMasuk(index) {
    let transaksiData = JSON.parse(sessionStorage.getItem('transaksiData') || '[]');
    transaksiData.splice(index, 1);
    sessionStorage.setItem('transaksiData', JSON.stringify(transaksiData));
    renderDataMasukList();
    showNotification('✓ Data berhasil dihapus', 2000);
}

// ===== EVENT LISTENERS UNTUK DATA MASUK =====

// Menu Data Masuk di Dashboard
const menuDataMasuk = document.getElementById('menuDataMasuk');
if (menuDataMasuk) {
    menuDataMasuk.addEventListener('click', () => {
        showPage('pageDataMasuk');
        renderDataMasukList();
        setupSearchDataMasuk();
    });
}

// Back button Data Masuk
const backDataMasukBtn = document.getElementById('backDataMasukBtn');
if (backDataMasukBtn) {
    backDataMasukBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('pageDashboard');
    });
}

// Back button Edit Data Masuk
const backEditDataMasukBtn = document.getElementById('backEditDataMasukBtn');
if (backEditDataMasukBtn) {
    backEditDataMasukBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('currentEditDataMasukIndex');
        document.getElementById('editDataMasukFotoPreview').innerHTML = '';
        showPage('pageDataMasuk');
        renderDataMasukList();
    });
}

// ===== EDIT DATA MASUK FORM EVENTS =====

const formEditDataMasuk = document.getElementById('formEditDataMasuk');
const btnSimpanEditDataMasuk = document.getElementById('btnSimpanEditDataMasuk');
const btnCetakEditDataMasuk = document.getElementById('btnCetakEditDataMasuk');
const btnSendWAEditDataMasuk = document.getElementById('btnSendWAEditDataMasuk');
const editDataMasukFotoUploadArea = document.getElementById('editDataMasukFotoUploadArea');
const editDataMasukFotoInput = document.getElementById('editDataMasukFoto');
const editDataMasukFotoPreview = document.getElementById('editDataMasukFotoPreview');

editDataMasukFotoUploadArea.addEventListener('click', () => {
    editDataMasukFotoInput.click();
});

editDataMasukFotoInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const fileName = file.name;
        
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            showNotification('❌ Ukuran foto terlalu besar (max 5MB)', 3000);
            editDataMasukFotoInput.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            editDataMasukFotoPreview.innerHTML = `
                <img src="${event.target.result}" alt="Preview">
                <div class="foto-filename">${fileName}</div>
            `;
        };
        reader.readAsDataURL(file);
    }
});

// Simpan Edit Data Masuk
btnSimpanEditDataMasuk.addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
        const currentIndex = sessionStorage.getItem('currentEditDataMasukIndex');
        if (currentIndex === null || currentIndex === undefined) {
            showNotification('❌ Index data tidak ditemukan', 3000);
            return;
        }

        const transaksiData = JSON.parse(sessionStorage.getItem('transaksiData') || '[]');
        const transaksi = transaksiData[currentIndex];

        if (!transaksi) {
            showNotification('❌ Data tidak ditemukan', 3000);
            return;
        }

        const nama = document.getElementById('editDataMasukNama').value.trim();
        const noTelp = document.getElementById('editDataMasukNoTelp').value.trim();
        const pembayaran = document.getElementById('editDataMasukPembayaran').value;
        const keterangan = document.getElementById('editDataMasukKeterangan').value;
        const estimasiSelesai = document.getElementById('editDataMasukEstimasiSelesai').value;
        const status = document.getElementById('editDataMasukStatus').value;

        if (!nama || !noTelp) {
            showNotification('❌ Nama dan No Telp harus diisi!', 3000);
            return;
        }

        if (!pembayaran) {
            showNotification('❌ Silahkan pilih metode pembayaran!', 3000);
            return;
        }

        if (!estimasiSelesai) {
            showNotification('❌ Silahkan tentukan estimasi selesai!', 3000);
            return;
        }

        if (!validateEstimasiDate(estimasiSelesai)) {
            showNotification('❌ Estimasi selesai tidak boleh tanggal lampau!', 3000);
            return;
        }

        const confirmed = await showConfirmation(`Update data untuk ${nama}?`);
        if (!confirmed) return;

        showLoading(true);

        let fotoBase64 = transaksi.foto || '';
        if (editDataMasukFotoInput.files.length > 0) {
            fotoBase64 = await fileToBase64(editDataMasukFotoInput.files[0]);
        }

        const layananData = transaksi.layananData || [];
        const promises = layananData.map(async (item) => {
            const total = parseInt(item.harga) * parseInt(item.qty);
            
            const dataToSend = {
                tanggal: formatDate(new Date()),
                nama: nama,
                no_telp: noTelp,
                item: item.detailItem,
                treatment: item.treatment,
                ukuran: item.ukuran || '-',
                qty: item.qty,
                harga: item.harga,
                total: total,
                pembayaran: pembayaran,
                keterangan: keterangan || '-',
                estimasi: estimasiSelesai,
                status: status,
                foto: fotoBase64
            };

            return fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(dataToSend)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                return response.json();
            }).then(result => {
                validateGoogleSheetsResponse(result);
                return result;
            });
        });

        const results = await Promise.all(promises);

        transaksiData[currentIndex] = {
            nama: nama,
            noTelp: noTelp,
            pembayaran: pembayaran,
            keterangan: keterangan,
            estimasi: estimasiSelesai,
            status: status,
            foto: fotoBase64,
            tanggal: transaksi.tanggal,
            layananData: layananData
        };

        sessionStorage.setItem('transaksiData', JSON.stringify(transaksiData));

        showLoading(false);
        showNotification('✓ Data berhasil diupdate ke Google Sheets', 3000);

        setTimeout(() => {
            sessionStorage.removeItem('currentEditDataMasukIndex');
            editDataMasukFotoPreview.innerHTML = '';
            showPage('pageDataMasuk');
            renderDataMasukList();
        }, 1500);

    } catch (error) {
        console.error('Error:', error);
        showLoading(false);
        const errorMessage = handleApiError(error, 'Gagal menyimpan data ke Google Sheets');
        showNotification('❌ ' + errorMessage, 4000);
    }
});

// Cetak Edit Data Masuk
btnCetakEditDataMasuk.addEventListener('click', (e) => {
    e.preventDefault();
    window.print();
});

// Kirim WA Edit Data Masuk
btnSendWAEditDataMasuk.addEventListener('click', (e) => {
    e.preventDefault();
    
    const nama = document.getElementById('editDataMasukNama').value;
    const noTelp = document.getElementById('editDataMasukNoTelp').value;
    const pembayaran = document.getElementById('editDataMasukPembayaran').value;
    const status = document.getElementById('editDataMasukStatus').value;
    const estimasiSelesai = document.getElementById('editDataMasukEstimasiSelesai').value;
    
    const currentIndex = sessionStorage.getItem('currentEditDataMasukIndex');
    const transaksiData = JSON.parse(sessionStorage.getItem('transaksiData') || '[]');
    const transaksi = transaksiData[currentIndex];
    const layananData = transaksi.layananData || [];

    if (!pembayaran) {
        showNotification('❌ Silahkan isi semua data terlebih dahulu!', 3000);
        return;
    }

    const phoneNumber = formatPhoneForWhatsApp(noTelp);
    
    let message = `*DAFFIN CARE - Update Pesanan*\n\n`;
    message += `Nama: ${nama}\n`;
    message += `No. Telp: ${noTelp}\n`;
    message += `Pembayaran: ${pembayaran}\n`;
    message += `Status: ${status}\n`;
    message += `Estimasi Selesai: ${formatDate(estimasiSelesai)}\n\n`;
    message += `*Detail Order:*\n`;
    
    let totalKeseluruhan = 0;
    layananData.forEach((item) => {
        const total = parseInt(item.harga) * parseInt(item.qty);
        totalKeseluruhan += total;
        message += `\n• ${item.detailItem} (${item.treatment})\n`;
        message += `  Qty: ${item.qty} x Rp ${formatCurrency(item.harga)} = Rp ${formatCurrency(total)}\n`;
        if (item.ukuran) {
            message += `  Ukuran: ${item.ukuran}\n`;
        }
    });
    
    message += `\n*Total: Rp ${formatCurrency(totalKeseluruhan)}*\n\n`;
    message += `Terima kasih telah menggunakan layanan kami! 🙏`;
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
});
// ===== GOOGLE APPS SCRIPT URL =====
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyigPtqyjOVUQ_Gj_kvYOds3xeSt8g0GQ93rMnCoVFzA-MXLJutr0pyjBdWZUhUJQC1/exec';

// ===== DATA PRODUK - STRUKTUR BARU SESUAI GAMBAR =====
const produkData = {
    'Sepatu': [
        { itemDetail: 'Sepatu', treatment: 'Cleaning', harga: 35000, ukuran: '' },
        { itemDetail: 'Sepatu', treatment: 'Repaint Full', harga: 120000, ukuran: '' },
        { itemDetail: 'Sepatu', treatment: 'Repaint Midsole', harga: 80000, ukuran: '' },
        { itemDetail: 'Sepatu', treatment: 'Repaint Upper', harga: 80000, ukuran: '' },
        { itemDetail: 'Sepatu', treatment: 'Recollor', harga: 150000, ukuran: '' },
        { itemDetail: 'Sepatu', treatment: 'Reglue Full', harga: 180000, ukuran: '' },
        { itemDetail: 'Sepatu', treatment: 'Unyellowing Sole', harga: 70000, ukuran: '' }
    ],
    'Sepatu Anak': [
        { itemDetail: 'Sepatu Anak', treatment: 'Cleaning', harga: 20000, ukuran: '' }
    ],
    'Sepatu Gunung': [
        { itemDetail: 'Sepatu Gunung', treatment: 'Cleaning', harga: 45000, ukuran: '' }
    ],
    'Sepatu Offroad': [
        { itemDetail: 'Sepatu Offroad', treatment: 'Cleaning', harga: 60000, ukuran: '' }
    ],
    'Sepatu Flat': [
        { itemDetail: 'Sepatu Flat', treatment: 'Cleaning', harga: 20000, ukuran: '' }
    ],
    'Springbed': [
        { itemDetail: 'Springbed 90 X 200', treatment: 'Cleaning', harga: 180000, ukuran: '90 X 200' },
        { itemDetail: 'Springbed 100 X 200', treatment: 'Cleaning', harga: 200000, ukuran: '100 X 200' },
        { itemDetail: 'Springbed 120 X 200', treatment: 'Cleaning', harga: 250000, ukuran: '120 X 200' },
        { itemDetail: 'Springbed 160 X 200', treatment: 'Cleaning', harga: 300000, ukuran: '160 X 200' },
        { itemDetail: 'Springbed 180 X 200', treatment: 'Cleaning', harga: 350000, ukuran: '180 X 200' },
        { itemDetail: 'Springbed 200 X 200', treatment: 'Cleaning', harga: 400000, ukuran: '200 X 200' }
    ],
    'Sofa': [
        { itemDetail: 'Sofa 1 Seat', treatment: 'Cleaning', harga: 75000, ukuran: '1 Seat' },
        { itemDetail: 'Sofa 1 Seat + Sandaran', treatment: 'Cleaning', harga: 100000, ukuran: '1 Seat + Sandaran' },
        { itemDetail: 'Sofa 2 Seat', treatment: 'Cleaning', harga: 150000, ukuran: '2 Seat' },
        { itemDetail: 'Sofa 2 Seat + Sandaran', treatment: 'Cleaning', harga: 200000, ukuran: '2 Seat + Sandaran' },
        { itemDetail: 'Sofa 3 Seat', treatment: 'Cleaning', harga: 250000, ukuran: '3 Seat' },
        { itemDetail: 'Sofa 3 Seat + Sandaran', treatment: 'Cleaning', harga: 300000, ukuran: '3 Seat + Sandaran' },
        { itemDetail: 'Sofa 3 Seat + 1 Seat Mini', treatment: 'Cleaning', harga: 350000, ukuran: '3 Seat + 1 Seat Mini' },
        { itemDetail: 'Sofa Letter L', treatment: 'Cleaning', harga: 400000, ukuran: 'Letter L' },
        { itemDetail: 'Sofa Letter U', treatment: 'Cleaning', harga: 450000, ukuran: 'Letter U' }
    ],
    'Tas': [
        { itemDetail: 'Tas Small', treatment: 'Cleaning', harga: 20000, ukuran: 'Small' },
        { itemDetail: 'Tas Medium', treatment: 'Cleaning', harga: 25000, ukuran: 'Medium' },
        { itemDetail: 'Tas Large', treatment: 'Cleaning', harga: 30000, ukuran: 'Large' },
        { itemDetail: 'Tas Gunung', treatment: 'Cleaning', harga: 50000, ukuran: 'Gunung' },
        { itemDetail: 'Tas Koper', treatment: 'Cleaning', harga: 100000, ukuran: 'Koper' },
        { itemDetail: 'Tas Golf', treatment: 'Cleaning', harga: 75000, ukuran: 'Golf' },
        { itemDetail: 'Tas Laptop', treatment: 'Cleaning', harga: 20000, ukuran: 'Laptop' },
        { itemDetail: 'Tas Dompet', treatment: 'Cleaning', harga: 10000, ukuran: 'Dompet' }
    ],
    'Bantal': [
        { itemDetail: 'Bantal Guling', treatment: 'Cleaning', harga: 25000, ukuran: 'Guling' },
        { itemDetail: 'Bantal Tidur', treatment: 'Cleaning', harga: 20000, ukuran: 'Tidur' },
        { itemDetail: 'Bantal Sofa', treatment: 'Cleaning', harga: 15000, ukuran: 'Sofa' },
        { itemDetail: 'Bantal Bayi', treatment: 'Cleaning', harga: 15000, ukuran: 'Bayi' }
    ],
    'Boneka': [
        { itemDetail: 'Boneka Small', treatment: 'Cleaning', harga: 20000, ukuran: 'Small' },
        { itemDetail: 'Boneka Medium', treatment: 'Cleaning', harga: 30000, ukuran: 'Medium' },
        { itemDetail: 'Boneka Large', treatment: 'Cleaning', harga: 50000, ukuran: 'Large' }
    ],
    'Stroller': [
        { itemDetail: 'Stroller Small', treatment: 'Cleaning', harga: 125000, ukuran: 'Small' },
        { itemDetail: 'Stroller Medium', treatment: 'Cleaning', harga: 150000, ukuran: 'Medium' },
        { itemDetail: 'Stroller Large', treatment: 'Cleaning', harga: 175000, ukuran: 'Large' }
    ],
    'Karpet': [
        { itemDetail: 'Karpet Sedang', treatment: 'Cleaning', harga: 20000, ukuran: 'Sedang' },
        { itemDetail: 'Karpet Tebal', treatment: 'Cleaning', harga: 25000, ukuran: 'Tebal' },
        { itemDetail: 'Karpet Rumbai', treatment: 'Cleaning', harga: 25000, ukuran: 'Rumbai' },
        { itemDetail: 'Karpet Tempat Tidur', treatment: 'Cleaning', harga: 20000, ukuran: 'Tempat Tidur' },
        { itemDetail: 'Karpet Permadani', treatment: 'Cleaning', harga: 20000, ukuran: 'Permadani' },
        { itemDetail: 'Karpet Olahraga', treatment: 'Cleaning', harga: 20000, ukuran: 'Olahraga' }
    ],
    'Dipan & Headboard': [
        { itemDetail: 'Dipan & Headboard', treatment: 'Cleaning', harga: 150000, ukuran: '' }
    ],
    'Helm': [
        { itemDetail: 'Helm Full Face', treatment: 'Cleaning', harga: 35000, ukuran: 'Full Face' },
        { itemDetail: 'Helm Half Face', treatment: 'Cleaning', harga: 30000, ukuran: 'Half Face' }
    ],
    'Car Seat': [
        { itemDetail: 'Car Seat Toddler', treatment: 'Cleaning', harga: 175000, ukuran: 'Toddler' },
        { itemDetail: 'Car Seat Infant', treatment: 'Cleaning', harga: 175000, ukuran: 'Infant' }
    ],
    'Baby': [
        { itemDetail: 'Baby Box', treatment: 'Cleaning', harga: 150000, ukuran: 'Box' },
        { itemDetail: 'Baby Nest', treatment: 'Cleaning', harga: 150000, ukuran: 'Nest' },
        { itemDetail: 'Baby Walker', treatment: 'Cleaning', harga: 20000, ukuran: 'Walker' }
    ],
    'Kursi': [
        { itemDetail: 'Kursi Makan', treatment: 'Cleaning', harga: 30000, ukuran: 'Makan' },
        { itemDetail: 'Kursi Kantor', treatment: 'Cleaning', harga: 35000, ukuran: 'Kantor' }
    ],
    'Kasur': [
        { itemDetail: 'Kasur Bayi', treatment: 'Cleaning', harga: 50000, ukuran: 'Bayi' }
    ],
    'Bouncer': [
        { itemDetail: 'Bouncer', treatment: 'Cleaning', harga: 100000, ukuran: '' }
    ],
    'Carrier': [
        { itemDetail: 'Carrier', treatment: 'Cleaning', harga: 100000, ukuran: '' }
    ],
    'Topi': [
        { itemDetail: 'Topi', treatment: 'Cleaning', harga: 15000, ukuran: '' }
    ]
};

// ===== PAGE NAVIGATION SYSTEM =====
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// ===== RENDER DETAIL ORDER =====
function renderDetailOrder() {
    const layananData = JSON.parse(sessionStorage.getItem('layananData') || '[]');
    const detailOrderContent = document.getElementById('detailOrderContent');
    const emptyState = document.getElementById('emptyState');
    const detailOrderSection = document.getElementById('detailOrderSection');

    if (layananData.length === 0) {
        detailOrderSection.classList.remove('show');
        emptyState.classList.remove('hidden');
        detailOrderContent.innerHTML = '';
    } else {
        detailOrderSection.classList.add('show');
        emptyState.classList.add('hidden');

        let html = '';
        let totalKeseluruhan = 0;
        
        layananData.forEach((item, index) => {
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
                            <button class="btn-menu-item" data-index="${index}" aria-label="Menu item ${index}">⋮</button>
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

        detailOrderContent.innerHTML = html;

        document.querySelectorAll('.btn-menu-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const index = btn.dataset.index;
                showActionMenu(e, index);
            });
        });
    }
}

// ===== SHOW ACTION MENU (EDIT/DELETE) =====
function showActionMenu(event, index) {
    event.stopPropagation();
    
    const existingMenu = document.querySelector('.action-menu');
    if (existingMenu) existingMenu.remove();
    
    const menu = document.createElement('div');
    menu.className = 'action-menu';
    menu.setAttribute('role', 'menu');
    menu.innerHTML = `
        <button class="action-menu-item edit-item" data-index="${index}" role="menuitem">✏️ Edit</button>
        <button class="action-menu-item delete-item" data-index="${index}" role="menuitem">🗑️ Hapus</button>
    `;
    
    document.body.appendChild(menu);
    
    const rect = event.target.getBoundingClientRect();
    menu.style.top = (rect.bottom + 5) + 'px';
    menu.style.left = (rect.left - 100) + 'px';
    
    menu.querySelector('.edit-item').addEventListener('click', (e) => {
        e.stopPropagation();
        editLayananItem(index);
        menu.remove();
    });
    
    menu.querySelector('.delete-item').addEventListener('click', async (e) => {
        e.stopPropagation();
        const confirmed = await showConfirmation('Yakin ingin menghapus item ini?');
        if (confirmed) {
            deleteLayananItem(index);
        }
        menu.remove();
    });
    
    document.addEventListener('click', () => {
        if (document.querySelector('.action-menu')) {
            document.querySelector('.action-menu').remove();
        }
    }, { once: true });
}

// ===== EDIT LAYANAN ITEM =====
function editLayananItem(index) {
    const layananData = JSON.parse(sessionStorage.getItem('layananData') || '[]');
    const item = layananData[index];
    
    if (!item) return;

    currentLayanan = item.nama;
    currentEditIndex = index;
    
    openModal(item.nama);
    
    setTimeout(() => {
        document.getElementById('detailItem').value = item.detailItem;
        document.getElementById('qty').value = item.qty;
        document.getElementById('harga').value = item.harga;
        document.getElementById('treatment').value = item.treatment;
        document.getElementById('ukuran').value = item.ukuran;
    }, 100);
}

// ===== DELETE LAYANAN ITEM =====
function deleteLayananItem(index) {
    let layananData = JSON.parse(sessionStorage.getItem('layananData') || '[]');
    layananData.splice(index, 1);
    sessionStorage.setItem('layananData', JSON.stringify(layananData));
    renderDetailOrder();
    showNotification('✓ Item berhasil dihapus', 2000);
}

// ===== RENDER KONFIRMASI DETAIL ORDER =====
function renderKonfirmasiDetailOrder() {
    const layananData = JSON.parse(sessionStorage.getItem('layananData') || '[]');
    const konfirmasiDetailOrder = document.getElementById('konfirmasiDetailOrder');

    let html = '';
    let totalKeseluruhan = calculateTotal(layananData);
    
    layananData.forEach((item) => {
        const total = parseInt(item.harga) * parseInt(item.qty);
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

    konfirmasiDetailOrder.innerHTML = html;
}

// ===== MODAL FUNCTIONS =====
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const formLayanan = document.getElementById('formLayanan');
const detailItemSelect = document.getElementById('detailItem');
const treatmentSelect = document.getElementById('treatment');
const ukuranInput = document.getElementById('ukuran');
const hargaInput = document.getElementById('harga');
let currentLayanan = '';
let currentEditIndex = null;

function updateDetailItems() {
    detailItemSelect.innerHTML = '<option value="">-- Pilih --</option>';
    
    if (currentLayanan && produkData[currentLayanan]) {
        const items = produkData[currentLayanan];
        const uniqueItems = [...new Set(items.map(i => i.itemDetail))];
        uniqueItems.forEach(itemName => {
            const option = document.createElement('option');
            option.value = itemName;
            option.textContent = itemName;
            detailItemSelect.appendChild(option);
        });
    }
}

// ===== FUNCTION UPDATE HARGA BERDASARKAN DETAIL ITEM =====
function updateHargaByDetailItem() {
    const selectedDetailItem = detailItemSelect.value;
    
    if (currentLayanan && selectedDetailItem && produkData[currentLayanan]) {
        const items = produkData[currentLayanan];
        const matchedItem = items.find(i => i.itemDetail === selectedDetailItem);
        
        if (matchedItem) {
            hargaInput.value = matchedItem.harga;
        }
    }
}

// ===== FUNCTION UPDATE TREATMENT (DIPERBAHARUI) =====
function updateTreatments() {
    treatmentSelect.innerHTML = '<option value="">-- Pilih --</option>';
    
    if (currentLayanan && produkData[currentLayanan]) {
        const items = produkData[currentLayanan];
        const uniqueTreatments = [...new Set(items.map(i => i.treatment))];
        
        if (uniqueTreatments.length === 1) {
            const option = document.createElement('option');
            option.value = uniqueTreatments[0];
            option.textContent = uniqueTreatments[0];
            treatmentSelect.appendChild(option);
            treatmentSelect.value = uniqueTreatments[0];
            updateUkuran();
            updateHarga();
        } else {
            uniqueTreatments.forEach(treatmentName => {
                const option = document.createElement('option');
                option.value = treatmentName;
                option.textContent = treatmentName;
                treatmentSelect.appendChild(option);
            });
        }
    }
}

function updateUkuran() {
    ukuranInput.innerHTML = '<option value="">-- Pilih --</option>';
    
    const selectedTreatment = treatmentSelect.value;
    
    if (currentLayanan && selectedTreatment && produkData[currentLayanan]) {
        const items = produkData[currentLayanan];
        const filteredItems = items.filter(i => i.treatment === selectedTreatment);
        const uniqueUkuran = [...new Set(filteredItems.map(i => i.ukuran).filter(u => u))];
        
        if (uniqueUkuran.length > 0) {
            uniqueUkuran.forEach(ukuranName => {
                const option = document.createElement('option');
                option.value = ukuranName;
                option.textContent = ukuranName;
                ukuranInput.appendChild(option);
            });
        } else {
            ukuranInput.innerHTML = '<option value="">Tidak ada pilihan</option>';
        }
    }
}

function updateHarga() {
    const selectedTreatment = treatmentSelect.value;
    const selectedUkuran = ukuranInput.value;
    
    if (currentLayanan && selectedTreatment && produkData[currentLayanan]) {
        const items = produkData[currentLayanan];
        const matchedItem = items.find(i => 
            i.treatment === selectedTreatment && 
            (i.ukuran === selectedUkuran || selectedUkuran === '')
        );
        
        if (matchedItem) {
            hargaInput.value = matchedItem.harga;
        } else {
            hargaInput.value = '';
        }
    }
}

function openModal(layananName) {
    currentLayanan = layananName;
    modalTitle.textContent = layananName;
    formLayanan.reset();
    hargaInput.value = '';
    
    updateDetailItems();
    updateTreatments();
    
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
    formLayanan.reset();
    currentEditIndex = null;
}

// ===== CLOSE MODAL DENGAN ESC KEY =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// ===== EVENT LISTENERS UNTUK MODAL =====
detailItemSelect.addEventListener('change', () => {
    updateHargaByDetailItem();
});

treatmentSelect.addEventListener('change', () => {
    updateUkuran();
    updateHarga();
});

ukuranInput.addEventListener('change', () => {
    updateHarga();
});

// ===== PAGE 1: DASHBOARD EVENTS =====
const menuTransaksi = document.getElementById('menuTransaksi');

menuTransaksi.addEventListener('click', () => {
    showPage('pageTransaksi');
});

// ===== PAGE 2: TRANSAKSI EVENTS =====
const formTransaksi = document.getElementById('formTransaksi');
const inputNama = document.getElementById('nama');
const inputNoTelp = document.getElementById('noTelp');
const btnLanjutkan = document.getElementById('btnLanjutkan');
const tabTambahLayanan = document.getElementById('tabTambahLayanan');
const backTransaksiBtn = document.getElementById('backTransaksiBtn');

function validateForm() {
    const nama = inputNama.value.trim();
    const noTelp = inputNoTelp.value.trim();
    const isValid = nama !== '' && noTelp !== '' && validatePhoneNumber(noTelp);

    if (isValid) {
        btnLanjutkan.classList.remove('disabled');
        btnLanjutkan.classList.add('active');
        btnLanjutkan.disabled = false;
    } else {
        btnLanjutkan.classList.remove('active');
        btnLanjutkan.classList.add('disabled');
        btnLanjutkan.disabled = true;
    }
}

inputNama.addEventListener('input', validateForm);
inputNoTelp.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    validateForm();
});

backTransaksiBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearSessionData();
    inputNama.value = '';
    inputNoTelp.value = '';
    renderDetailOrder();
    validateForm();
    showPage('pageDashboard');
});

tabTambahLayanan.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.setItem('nama', inputNama.value);
    sessionStorage.setItem('noTelp', inputNoTelp.value);
    showPage('pageLayanan');
    document.getElementById('backButtonLayanan').classList.add('hidden');
});

btnLanjutkan.addEventListener('click', (e) => {
    e.preventDefault();
    if (!btnLanjutkan.disabled) {
        const layananData = JSON.parse(sessionStorage.getItem('layananData') || '[]');
        if (layananData.length === 0) {
            showNotification('❌ Silahkan tambahkan minimal 1 layanan!', 3000);
            return;
        }
        
        document.getElementById('konfirmasiNama').value = inputNama.value;
        document.getElementById('konfirmasiNoTelp').value = inputNoTelp.value;
        document.getElementById('status').value = 'Belum Ambil';
        
        renderKonfirmasiDetailOrder();
        showPage('pageKonfirmasi');
    }
});

validateForm();

// ===== PAGE 3: PILIH LAYANAN EVENTS =====
const backButtonLayanan = document.getElementById('backButtonLayanan');
const btnKembaliLayanan = document.getElementById('btnKembaliLayanan');
const searchInput = document.getElementById('searchInput');
const layananItems = document.querySelectorAll('.layanan-item');

backButtonLayanan.addEventListener('click', () => {
    showPage('pageTransaksi');
    renderDetailOrder();
    backButtonLayanan.classList.remove('hidden');
});

btnKembaliLayanan.addEventListener('click', () => {
    showPage('pageTransaksi');
    renderDetailOrder();
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    layananItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

layananItems.forEach((item) => {
    item.addEventListener('click', () => {
        const layananName = item.textContent;
        currentEditIndex = null;
        openModal(layananName);
    });
});

// ===== PAGE 4: KONFIRMASI EVENTS =====
const backKonfirmasiBtn = document.getElementById('backKonfirmasiBtn');
const btnSimpan = document.getElementById('btnSimpan');
const btnCetak = document.getElementById('btnCetak');
const btnSendWA = document.getElementById('btnSendWA');
const fotoUploadArea = document.getElementById('fotoUploadArea');
const fotoInput = document.getElementById('foto');
const fotoPreview = document.getElementById('fotoPreview');

backKonfirmasiBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('pageTransaksi');
});

fotoUploadArea.addEventListener('click', () => {
    fotoInput.click();
});

fotoInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const fileName = file.name;
        
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            showNotification('❌ Ukuran foto terlalu besar (max 5MB)', 3000);
            fotoInput.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            fotoPreview.innerHTML = `
                <img src="${event.target.result}" alt="Preview">
                <div class="foto-filename">${fileName}</div>
            `;
        };
        reader.readAsDataURL(file);
    }
});

// ===== SIMPAN DATA TRANSAKSI KE SESSION (UNTUK DATA MASUK) =====
function saveFullTransactionToSession(nama, noTelp, layananData, pembayaran, keterangan, estimasiSelesai, status, fotoBase64) {
    let transaksiData = JSON.parse(sessionStorage.getItem('transaksiData') || '[]');
    
    transaksiData.push({
        nama: nama,
        noTelp: noTelp,
        tanggal: formatDate(new Date()),
        pembayaran: pembayaran,
        keterangan: keterangan,
        estimasi: estimasiSelesai,
        status: status,
        foto: fotoBase64,
        layananData: layananData
    });
    
    sessionStorage.setItem('transaksiData', JSON.stringify(transaksiData));
}

// ===== SIMPAN BUTTON - KIRIM KE GOOGLE SHEETS =====
btnSimpan.addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
        const nama = document.getElementById('konfirmasiNama').value;
        const noTelp = document.getElementById('konfirmasiNoTelp').value;
        const layananData = JSON.parse(sessionStorage.getItem('layananData') || '[]');
        const pembayaran = document.getElementById('pembayaran').value;
        const keterangan = document.getElementById('keterangan').value;
        const estimasiSelesai = document.getElementById('estimasiSelesai').value;
        const status = document.getElementById('status').value;
        
        if (layananData.length === 0) {
            showNotification('❌ Silahkan tambahkan minimal 1 layanan!', 3000);
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

        const confirmed = await showConfirmation(`Simpan data untuk ${nama}?\n\nTotal: Rp ${formatCurrency(calculateTotal(layananData))}`);
        if (!confirmed) return;

        showLoading(true);

        let fotoBase64 = '';
        if (fotoInput.files.length > 0) {
            fotoBase64 = await fileToBase64(fotoInput.files[0]);
        }

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

        // ===== SIMPAN KE DATA MASUK (SESSION STORAGE) =====
        saveFullTransactionToSession(nama, noTelp, layananData, pembayaran, keterangan, estimasiSelesai, status, fotoBase64);

        showLoading(false);
        showNotification('✓ Data berhasil disimpan ke Google Sheets', 3000);

        setTimeout(() => {
            resetForm();
        }, 1500);

    } catch (error) {
        console.error('Error:', error);
        showLoading(false);
        
        const errorMessage = handleApiError(error, 'Gagal menyimpan data ke Google Sheets');
        showNotification('❌ ' + errorMessage, 4000);
    }
});

// ===== CETAK BUTTON =====
btnCetak.addEventListener('click', (e) => {
    e.preventDefault();
    window.print();
});

// ===== KIRIM WA BUTTON =====
btnSendWA.addEventListener('click', (e) => {
    e.preventDefault();
    
    const nama = document.getElementById('konfirmasiNama').value;
    const noTelp = document.getElementById('konfirmasiNoTelp').value;
    const layananData = JSON.parse(sessionStorage.getItem('layananData') || '[]');
    const pembayaran = document.getElementById('pembayaran').value;
    const estimasiSelesai = document.getElementById('estimasiSelesai').value;
    const status = document.getElementById('status').value;
    
    if (!pembayaran) {
        showNotification('❌ Silahkan isi semua data terlebih dahulu!', 3000);
        return;
    }

    const phoneNumber = formatPhoneForWhatsApp(noTelp);
    
    let message = `*DAFFIN CARE - Konfirmasi Pesanan*\n\n`;
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

// ===== RESET FORM FUNCTION =====
function resetForm() {
    clearSessionData();
    inputNama.value = '';
    inputNoTelp.value = '';
    fotoInput.value = '';
    fotoPreview.innerHTML = '';
    document.getElementById('pembayaran').value = '';
    document.getElementById('keterangan').value = '';
    document.getElementById('estimasiSelesai').value = '';
    document.getElementById('status').value = 'Belum Ambil';
    renderDetailOrder();
    validateForm();
    showPage('pageDashboard');
}

// ===== MODAL EVENTS =====
const btnSimpanLayanan = document.getElementById('btnSimpanLayanan');
const btnBatalLayanan = document.getElementById('btnBatalLayanan');
const qtyInput = document.getElementById('qty');

btnSimpanLayanan.addEventListener('click', (e) => {
    e.preventDefault();
    
    const detailItem = detailItemSelect.value;
    const qty = qtyInput.value;
    const harga = hargaInput.value;
    const treatment = treatmentSelect.value;
    const ukuran = ukuranInput.value;

    if (!detailItem || !qty || !harga || !treatment) {
        showNotification('❌ Silahkan isi semua field yang diperlukan!', 3000);
        return;
    }

    if (parseInt(qty) <= 0) {
        showNotification('❌ Qty harus lebih dari 0!', 3000);
        return;
    }

    if (parseInt(harga) <= 0) {
        showNotification('❌ Harga harus lebih dari 0!', 3000);
        return;
    }

    let layananData = JSON.parse(sessionStorage.getItem('layananData') || '[]');
    
    if (currentEditIndex !== null) {
        layananData[currentEditIndex] = {
            nama: currentLayanan,
            detailItem: detailItem,
            qty: qty,
            harga: harga,
            treatment: treatment,
            ukuran: ukuran
        };
        showNotification('✓ Item berhasil diupdate', 2000);
    } else {
        layananData.push({
            nama: currentLayanan,
            detailItem: detailItem,
            qty: qty,
            harga: harga,
            treatment: treatment,
            ukuran: ukuran
        });
        showNotification('✓ Item berhasil ditambahkan', 2000);
    }
    
    sessionStorage.setItem('layananData', JSON.stringify(layananData));

    let layanan = JSON.parse(sessionStorage.getItem('layanan') || '[]');
    if (!layanan.includes(currentLayanan)) {
        layanan.push(currentLayanan);
        sessionStorage.setItem('layanan', JSON.stringify(layanan));
    }

    closeModal();
    showPage('pageTransaksi');
    renderDetailOrder();
    document.getElementById('backButtonLayanan').classList.remove('hidden');
});

btnBatalLayanan.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
});
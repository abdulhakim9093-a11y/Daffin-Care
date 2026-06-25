// ===== PAGE 5: PENGELUARAN FUNCTIONS =====

let currentEditIndexPengeluaran = null;

// Render daftar pengeluaran
function renderDetailPengeluaran() {
    const pengeluaranData = JSON.parse(sessionStorage.getItem('pengeluaranData') || '[]');
    const detailPengeluaranContent = document.getElementById('detailPengeluaranContent');
    const emptyStatePengeluaran = document.getElementById('emptyStatePengeluaran');

    if (pengeluaranData.length === 0) {
        emptyStatePengeluaran.style.display = 'flex';
        detailPengeluaranContent.innerHTML = '';
    } else {
        emptyStatePengeluaran.style.display = 'none';

        let html = `
            <div class="pengeluaran-table-header">
                <div>Nama</div>
                <div>Nominal</div>
                <div>Ket</div>
            </div>
        `;
        
        let totalKeseluruhan = 0;
        
        pengeluaranData.forEach((item, index) => {
            const nominal = parseInt(item.nominal);
            totalKeseluruhan += nominal;
            
            html += `
                <div class="pengeluaran-item-row">
                    <div class="pengeluaran-item-cell">
                        <div class="pengeluaran-item-value">${item.nama}</div>
                    </div>
                    <div class="pengeluaran-item-cell">
                        <div class="pengeluaran-item-value">${formatCurrency(nominal)}</div>
                    </div>
                    <div class="pengeluaran-item-cell">
                        <div class="pengeluaran-item-value">${item.keterangan || '-'}</div>
                    </div>
                    <div class="pengeluaran-item-menu">
                        <button class="btn-menu-item-pengeluaran" data-index="${index}" aria-label="Menu pengeluaran ${index}">⋮</button>
                    </div>
                </div>
            `;
        });

        html += `
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #1a1a2e;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 16px; font-weight: 700; color: #1a1a2e;">Total:</span>
                    <span style="font-size: 18px; font-weight: 700; color: #4caf50;">Rp ${formatCurrency(totalKeseluruhan)}</span>
                </div>
            </div>
        `;

        detailPengeluaranContent.innerHTML = html;

        document.querySelectorAll('.btn-menu-item-pengeluaran').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const index = btn.dataset.index;
                showActionMenuPengeluaran(e, index);
            });
        });
    }
}

// ===== SHOW ACTION MENU PENGELUARAN (EDIT/DELETE) =====
function showActionMenuPengeluaran(event, index) {
    event.stopPropagation();
    
    const existingMenu = document.querySelector('.action-menu');
    if (existingMenu) existingMenu.remove();
    
    const menu = document.createElement('div');
    menu.className = 'action-menu';
    menu.setAttribute('role', 'menu');
    menu.innerHTML = `
        <button class="action-menu-item edit-item-pengeluaran" data-index="${index}" role="menuitem">✏️ Edit</button>
        <button class="action-menu-item delete-item-pengeluaran" data-index="${index}" role="menuitem">🗑️ Hapus</button>
    `;
    
    document.body.appendChild(menu);
    
    const rect = event.target.getBoundingClientRect();
    menu.style.top = (rect.bottom + 5) + 'px';
    menu.style.left = (rect.left - 100) + 'px';
    
    menu.querySelector('.edit-item-pengeluaran').addEventListener('click', (e) => {
        e.stopPropagation();
        editPengeluaranItem(index);
        menu.remove();
    });
    
    menu.querySelector('.delete-item-pengeluaran').addEventListener('click', async (e) => {
        e.stopPropagation();
        const confirmed = await showConfirmation('Yakin ingin menghapus item ini?');
        if (confirmed) {
            deletePengeluaranItem(index);
        }
        menu.remove();
    });
    
    document.addEventListener('click', () => {
        if (document.querySelector('.action-menu')) {
            document.querySelector('.action-menu').remove();
        }
    }, { once: true });
}

// ===== EDIT PENGELUARAN ITEM =====
function editPengeluaranItem(index) {
    const pengeluaranData = JSON.parse(sessionStorage.getItem('pengeluaranData') || '[]');
    const item = pengeluaranData[index];
    
    if (!item) return;

    currentEditIndexPengeluaran = index;
    
    document.getElementById('namaPengeluaran').value = item.nama;
    document.getElementById('nominalPengeluaran').value = item.nominal;
    document.getElementById('keteranganPengeluaran').value = item.keterangan;
    
    window.scrollTo(0, 0);
    showNotification('📝 Mode edit - ubah data dan klik Simpan', 3000);
}

// ===== DELETE PENGELUARAN ITEM =====
function deletePengeluaranItem(index) {
    let pengeluaranData = JSON.parse(sessionStorage.getItem('pengeluaranData') || '[]');
    pengeluaranData.splice(index, 1);
    sessionStorage.setItem('pengeluaranData', JSON.stringify(pengeluaranData));
    renderDetailPengeluaran();
    showNotification('✓ Item berhasil dihapus', 2000);
}

// ===== PAGE 5: PENGELUARAN EVENTS =====
const menuPengeluaran = document.getElementById('menuPengeluaran');
const formPengeluaran = document.getElementById('formPengeluaran');
const inputNamaPengeluaran = document.getElementById('namaPengeluaran');
const inputNominalPengeluaran = document.getElementById('nominalPengeluaran');
const inputKeteranganPengeluaran = document.getElementById('keteranganPengeluaran');
const btnSimpanPengeluaran = document.getElementById('btnSimpanPengeluaran');
const backPengeluaranBtn = document.getElementById('backPengeluaranBtn');

menuPengeluaran.addEventListener('click', () => {
    showPage('pagePengeluaran');
    renderDetailPengeluaran();
});

backPengeluaranBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetFormPengeluaran();
    showPage('pageDashboard');
});

btnSimpanPengeluaran.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const nama = inputNamaPengeluaran.value.trim();
    const nominal = inputNominalPengeluaran.value.trim();
    const keterangan = inputKeteranganPengeluaran.value.trim();
    
    if (!nama || !nominal) {
        showNotification('❌ Nama dan Nominal harus diisi!', 3000);
        return;
    }
    
    if (parseInt(nominal) <= 0) {
        showNotification('❌ Nominal harus lebih dari 0!', 3000);
        return;
    }
    
    let pengeluaranData = JSON.parse(sessionStorage.getItem('pengeluaranData') || '[]');
    
    if (currentEditIndexPengeluaran !== null) {
        pengeluaranData[currentEditIndexPengeluaran] = {
            nama: nama,
            nominal: nominal,
            keterangan: keterangan
        };
        showNotification('✓ Item berhasil diupdate', 2000);
        currentEditIndexPengeluaran = null;
    } else {
        pengeluaranData.push({
            nama: nama,
            nominal: nominal,
            keterangan: keterangan
        });
        showNotification('✓ Item berhasil ditambahkan', 2000);
    }
    
    sessionStorage.setItem('pengeluaranData', JSON.stringify(pengeluaranData));
    renderDetailPengeluaran();
    resetFormPengeluaran();

    try {
        showLoading(true);

        const dataToSend = {
            type: 'pengeluaran',
            tanggal: formatDate(new Date()),
            nama: nama,
            nominal: parseInt(nominal),
            keterangan: keterangan || '-'
        };

        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        validateGoogleSheetsResponse(result);

        showLoading(false);
        showNotification('✓ Data berhasil disimpan ke Google Sheets', 3000);

        setTimeout(() => {
            clearPengeluaranSession();
            showPage('pageDashboard');
        }, 1500);

    } catch (error) {
        console.error('Error:', error);
        showLoading(false);
        
        const errorMessage = handleApiError(error, 'Gagal menyimpan pengeluaran');
        showNotification('❌ ' + errorMessage, 4000);
    }
});

function resetFormPengeluaran() {
    inputNamaPengeluaran.value = '';
    inputNominalPengeluaran.value = '';
    inputKeteranganPengeluaran.value = '';
    currentEditIndexPengeluaran = null;
}

// ===== CLEAR PENGELUARAN SESSION =====
function clearPengeluaranSession() {
    sessionStorage.removeItem('pengeluaranData');
    resetFormPengeluaran();
}
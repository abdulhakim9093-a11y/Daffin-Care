// ===== MASTER MENU HANDLER =====
// File ini mengurus SEMUA event listener menu agar tidak konflik

document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Master Menu Script Loaded');

    // ===== MENU TRANSAKSI =====
    const menuTransaksi = document.getElementById('menuTransaksi');
    if (menuTransaksi) {
        menuTransaksi.addEventListener('click', function() {
            showPage('pageTransaksi');
        });
    }

    // ===== MENU PENGELUARAN =====
    const menuPengeluaran = document.getElementById('menuPengeluaran');
    if (menuPengeluaran) {
        menuPengeluaran.addEventListener('click', function() {
            showPage('pagePengeluaran');
            renderDetailPengeluaran();
        });
    }

    // ===== MENU PENGAMBILAN =====
    const menuPengambilan = document.getElementById('menuPengambilan');
    if (menuPengambilan) {
        menuPengambilan.addEventListener('click', function() {
            showPage('pagePengambilan');
            renderPengambilanList();
            setupSearchPengambilan();
        });
    }

    // ===== MENU DATA MASUK =====
    const menuDataMasuk = document.getElementById('menuDataMasuk');
    if (menuDataMasuk) {
        menuDataMasuk.addEventListener('click', function() {
            showPage('pageDataMasuk');
            renderDataMasukList();
            setupSearchDataMasuk();
        });
    }

    console.log('✓ All Menu Listeners Registered');
});
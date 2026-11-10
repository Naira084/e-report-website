// Menentukan nama tempat data di simpan di local storage
const KUNCI_STORAGE = 'E_REPORT_DATA';

// variabel global untuk menyimpan data laporan
let daftarLaporan = [];
let filterAktif = 'semua';

//fungsi muat data itu di eksekusi ketika halaman html selesai di muat
document.addEventListener('DOMContentLoaded', muatData());

// supaya badge nya mengikuti data yang masuk
function updateBadge() {
    const pending = reports.filter(r => r.status === 'Menunggu Proses').length;
    document.querySelector('.nav-badge').textContent = pending;
}

// READ => mengambiil data dari data.js
function muatData() {
    daftarLaporan = typeof dataAwalLaporan !== 'undefined' ? [...dataAwalLaporan] : [];
    // console.log(daftarLaporan);
    const tersimpan = localStorage.getItem(KUNCI_STORAGE);
    if (tersimpan) daftarLaporan = JSON.parse(tersimpan);

    tampilkanDataTabel();
}

// menampilkan data ke halaman web
function tampilkanDataTabel() {
    const tableBody = document.getElementById('report-table-body');

    //memastikan table body kosong
    tableBody.innerHTML = '';

    //menampilkan baris data
    daftarLaporan.forEach((laporan) => {
        tableBody.appendChild(buatBarisLaporan(laporan));
    })

    terapkanFilter();
    tandaiFilterAktif();
    updateStats();
}

// membuat 1 baris <tr> untuk 1 laporan
function buatBarisLaporan(laporan) {
    //membuat <tr> baru
    const baris = document.createElement('tr');

    const selesai = laporan.status === 'Selesai';
    baris.className = 'table-row';
    baris.dataset.status = selesai ? 'selesai' : 'menunggu';

    baris.innerHTML = `
    <td class="cell-reporter">
        <span class="nama">${laporan.pelapor}</span>
    </td>
    <td class="cell-category">
        <span class="category-badge">${laporan.kategori}</span>
    </td>
    <td class="cell-desc">
        <span class="desc-content">${laporan.deskripsi}</span>
    </td>
    <td class="cell-status">
        <span class="status-badge">${laporan.status}</span>
    </td>`

    return baris;
}

//CREATE => menambah data laporan baru dri form
function handleFormSubmit(event) {

    event.preventDefault(); //mencegah refresh
    // mengambiil isi form
    const form = event.target;
    const nama = form.reporter.value.trim();
    const kategori = form.kategori.value;
    const deskripsi = form.deskripsi.value.trim();

    // pengecekan value (validasi) => mengecek apakah semua input terisi
    if (!nama || !kategori || !deskripsi) {
        return console.log("Mohon lengkapi semua data!");
    }

    //membuat objek laporan baru
    const laporanBaru = {
        id: `rep-${Date.now()}`, //id unik berdasarkan waktu saat ini
        pelapor: nama,
        kategori: kategori,
        deskripsi: deskripsi,
        status: 'Menunggu'
    };

    //menambahkan laporan baru ke data lama
    daftarLaporan.unshift(laporanBaru);
    //menyimpan ke dalam local storage
    simpanData();
    tampilkanDataTabel();

    //mengosongkan form
    form.reset();

    //sweet alert
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your report has been received",
        showConfirmButton: false,
        timer: 1500
    });

    updateBadge();
}

//proses menyimpan data ek local storage
function simpanData() {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarLaporan));
}

function terapkanFilter() {
    document.querySelectorAll('#report-table-body .table-row').forEach((baris) => {
        const tampil = filterAktif === 'semua' || baris.dataset.status === filterAktif;
        baris.style.display = tampil ? '' : 'none';
    });
}

function tandaiFilterAktif() {
    const urutan = ['semua', 'menunggu', 'selesai'];
    document.querySelectorAll('.filter-btn').forEach((tombol, index) => {
        tombol.classList.toggle('active', urutan[index] === filterAktif);
    });
}

function updateStats() {
    const total = daftarLaporan.length;
    const selesai = daftarLaporan.filter((item) => item.status === 'Selesai').length;
    const menunggu = total - selesai;

    document.querySelector('.nav-badge').textContent = menunggu;

    const angka = document.querySelectorAll('.stats-number');
    angka[0].textContent = total;
    angka[1].textContent = menunggu;

    const filter = document.querySelectorAll('.filter-btn');
    filter[0].textContent = `SEMUA (${total})`;
    filter[1].textContent = `MENUNGGU (${menunggu})`;
    filter[2].textContent = `SELESAI (${selesai})`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.report-form').addEventListener('submit', handleFormSubmit);

    document.querySelectorAll('.filter-btn').forEach((tombol, index) => {
        tombol.addEventListener('click', () => {
            filterAktif = ['semua', 'menunggu', 'selesai'][index];
            tampilkanDataTabel();
        });
    });
});
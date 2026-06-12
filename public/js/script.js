document.addEventListener('DOMContentLoaded', function() {
    
    // Ambil elemen DOM yang dibutuhkan
    const tableBody = document.getElementById('student-list');
    const searchInput = document.getElementById('searchStudent');
    const avgBadge = document.getElementById('avg-score-badge');

    // 1. DATA DUMMY (Array of Objects - Minimal 10 Siswa dengan properti name, class, score)
    const dataSiswa = [
        { name: 'Teddy', class: 'Fullstack Node-1', score: 85 },
        { name: 'Nina', class: 'Fullstack Node-1', score: 90 },
        { name: 'Bahlul', class: 'Frontend React-2', score: 75 },
        { name: 'Budi', class: 'Frontend React-2', score: 80 },
        { name: 'Aris', class: 'Fullstack Node-1', score: 95 },
        { name: 'Citra', class: 'Backend Express-3', score: 88 },
        { name: 'Dedi', class: 'Backend Express-3', score: 65 },
        { name: 'Eka', class: 'Frontend React-2', score: 78 },
        { name: 'Fahmi', class: 'Fullstack Node-1', score: 82 },
        { name: 'Gita', class: 'Backend Express-3', score: 92 }
    ];

    // 2. FUNCTION UNTUK MERENDER DATA DAN MENGHITUNG RATA-RATA
    function tampilkanDashboard(siswaArray) {
        // Kosongkan isi tabel lama
        tableBody.innerHTML = '';

        // JIKA HASIL FILTER KOSONG
        if (siswaArray.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted py-4">Nama siswa tidak ditemukan, Jon.</td>
                </tr>
            `;
            avgBadge.textContent = 'Rata-rata Nilai: 0';
            return;
        }

        // A. BUILT-IN HOF .map() untuk merender data siswa ke format tabel HTML
        const rowsHTML = siswaArray.map((siswa, index) => {
            return `
                <tr>
                    <td class="fw-bold text-secondary">${index + 1}</td>
                    <td class="fw-semibold text-primary">${siswa.name}</td>
                    <td><span class="badge bg-light text-dark border">${siswa.class}</span></td>
                    <td class="fw-bold text-success">${siswa.score}</td>
                </tr>
            `;
        }).join(''); // .join('') digunakan untuk menyatukan array string menjadi satu teks HTML utuh

        // Masukkan semua baris hasil .map() ke dalam tabel body
        tableBody.innerHTML = rowsHTML;

        // B. BUILT-IN HOF .reduce() untuk menghitung total nilai siswa yang sedang tampil
        const totalNilai = siswaArray.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.score;
        }, 0); // 0 adalah nilai awal accumulator

        // Hitung rata-rata berdasarkan jumlah siswa yang sedang tampil di layar
        const rataRata = totalNilai / siswaArray.length;

        // Tampilkan hasil rata-rata di badge (dibulatkan 1 angka di belakang koma biar rapi)
        avgBadge.textContent = `Rata-rata Nilai: ${rataRata.toFixed(1)}`;
    }

    // Jalankan fungsi pertama kali agar 10 data awal langsung muncul di layar
    tampilkanDashboard(dataSiswa);

    // 3. IMPLEMENTASIKAN EVENT LISTENER PADA INPUT PENCARIAN (SEARCH BY NAME)
    searchInput.addEventListener('input', function() {
        const kataKunci = searchInput.value.toLowerCase().trim();

        // C. BUILT-IN HOF .filter() untuk menyaring nama siswa yang sesuai kata kunci pencarian
        const hasilFilter = dataSiswa.filter(siswa => {
            return siswa.name.toLowerCase().includes(kataKunci);
        });

        // Jalankan kembali fungsi render menggunakan data yang sudah di-filter
        tampilkanDashboard(hasilFilter);
    });
});
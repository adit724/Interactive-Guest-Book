document.addEventListener('DOMContentLoaded', function() {
    
    const tableBody = document.getElementById('student-list');
    const searchInput = document.getElementById('searchStudent');
    const avgBadge = document.getElementById('avg-score-badge');

    const dataSiswa = [
        { name: 'Teddy', class: 'Fullstack Node-1', score: 85 },
        { name: 'dadan', class: 'Fullstack Node-1', score: 90 },
        { name: 'Bahlul', class: 'Frontend React-2', score: 75 },
        { name: 'Budi', class: 'Frontend React-2', score: 80 },
        { name: 'Aris', class: 'Fullstack Node-1', score: 95 },
        { name: 'raka', class: 'Backend Express-3', score: 88 },
        { name: 'Dedi', class: 'Backend Express-3', score: 65 },
        { name: 'joko', class: 'Frontend React-2', score: 78 },
        { name: 'anis', class: 'Fullstack Node-1', score: 82 },
        { name: 'mega', class: 'Backend Express-3', score: 92 }
    ];

    function tampilkanDashboard(siswaArray) {
        tableBody.innerHTML = '';

        if (siswaArray.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted py-4">Nama siswa tidak ditemukan.</td>
                </tr>
            `;
            avgBadge.textContent = 'Rata-rata Nilai: 0';
            return;
        }

        // untuk merender data siswa ke format tabel HTML
        const rowsHTML = siswaArray.map((siswa, index) => {
            return `
                <tr>
                    <td class="fw-bold text-secondary">${index + 1}</td>
                    <td class="fw-semibold text-primary">${siswa.name}</td>
                    <td><span class="badge bg-light text-dark border">${siswa.class}</span></td>
                    <td class="fw-bold text-success">${siswa.score}</td>
                </tr>
            `;
        }).join(''); 

        tableBody.innerHTML = rowsHTML;

        // untuk menghitung total nilai siswa yang sedang tampil
        const totalNilai = siswaArray.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.score;
        }, 0); // 0 adalah nilai awal accumulator

        // Hitung rata-rata nilai siswa yang sedang tampil di layar
        const rataRata = totalNilai / siswaArray.length;

        avgBadge.textContent = `Rata-rata Nilai: ${rataRata.toFixed(1)}`;
    }

    tampilkanDashboard(dataSiswa);

    // IMPLEMENTASIKAN EVENT LISTENER PADA INPUT PENCARIAN 
    searchInput.addEventListener('input', function() {
        const kataKunci = searchInput.value.toLowerCase().trim();

        //  untuk menyaring nama siswa yang sesuai kata kunci pencarian
        const hasilFilter = dataSiswa.filter(siswa => {
            return siswa.name.toLowerCase().includes(kataKunci);
        });

        // Jalankan kembali fungsi render menggunakan data yang sudah di-filter
        tampilkanDashboard(hasilFilter);
    });
});
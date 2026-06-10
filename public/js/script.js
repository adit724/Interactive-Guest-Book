document.addEventListener('DOMContentLoaded', function() {
    
    const guestForm = document.getElementById('guestbook-form');
    const submitBtn = document.getElementById('submit-btn');
    const messagesContainer = document.getElementById('messages-container');
    const emptyNotice = document.getElementById('no-message-empty');

    console.log("Form ditemukan:", guestForm);

    // Fungsi utama untuk memproses pesan baru
    function prosesPesan(event) {
       
        event.preventDefault();
        event.stopPropagation(); 
        
        console.log("Sistem pencegah reload berjalan sukses!");

        const inputName = document.getElementById('fullName').value;
        const inputMessage = document.getElementById('message').value;

        // Validasi opsional agar tidak memasukkan data kosong
        if (!inputName.trim() || !inputMessage.trim()) return;

        const cardTemplate = `
            <div class="col-sm-6">
                <div class="card card-custom p-3">
                    <div class="d-flex align-items-center mb-2">
                        <i class="bi bi-person-circle text-primary fs-4 me-2"></i>
                        <span class="fw-bold text-primary">${inputName}</span>
                    </div>
                    <p class="mb-0 text-muted small">${inputMessage}</p>
                </div>
            </div>
        `;

        if (emptyNotice) {
            emptyNotice.remove();
        }

        if (messagesContainer) {
            messagesContainer.insertAdjacentHTML('afterbegin', cardTemplate);
            console.log("Pesan berhasil dirender ke layar!");
        }

        // Kosongkan form kembali
        guestForm.reset();
    }

    if (guestForm) {
        guestForm.addEventListener('submit', prosesPesan);
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            if (guestForm.checkValidity()) {
                prosesPesan(e);
            }
        });
    }
});
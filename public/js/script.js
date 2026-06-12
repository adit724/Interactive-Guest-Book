document.addEventListener('DOMContentLoaded', function() {
    
    const expenseForm = document.getElementById('expense-form');
    const inputExpenseName = document.getElementById('expenseName');
    const inputExpenseAmount = document.getElementById('expenseAmount');
    const expenseTableBody = document.getElementById('expense-list');
    const totalBadge = document.getElementById('total-expense');

    let arrayPengeluaran = JSON.parse(localStorage.getItem('myExpensesData')) || [];

    function renderKeLayar() {
        expenseTableBody.innerHTML = '';
        let hitungTotal = 0;

        if (arrayPengeluaran.length === 0) {
            expenseTableBody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center text-muted py-5">
                        <i class="bi bi-emoji-slight-smile d-block fs-2 mb-2"></i> Belum ada data pengeluaran saat ini.
                    </td>
                </tr>
            `;
            totalBadge.textContent = 'Total: Rp 0';
            return;
        }

        arrayPengeluaran.forEach((item, index) => {
            hitungTotal += parseInt(item.amount);

            const rowHTML = `
                <tr>
                    <td class="fw-bold text-secondary">${index + 1}</td>
                    <td class="fw-semibold">${item.name}</td>
                    <td class="text-danger fw-bold">Rp ${parseInt(item.amount).toLocaleString('id-ID')}</td>
                </tr>
            `;

            expenseTableBody.insertAdjacentHTML('beforeend', rowHTML);
        });

        
        totalBadge.textContent = `Total: Rp ${hitungTotal.toLocaleString('id-ID')}`;
    }

    renderKeLayar();

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const namaValue = inputExpenseName.value.trim();
        const nominalValue = inputExpenseAmount.value.trim();

        if (namaValue === '' || nominalValue === '') {
            alert('Aduh Jon! Tolong isi semua kolom (Nama & Nominal) dulu ya, jangan dikosongkan.');
            return; 
        }

        const dataBaruObject = {
            name: namaValue,
            amount: nominalValue
        };
        arrayPengeluaran.push(dataBaruObject);

        localStorage.setItem('myExpensesData', JSON.stringify(arrayPengeluaran));

        renderKeLayar();

        expenseForm.reset();
    });
});
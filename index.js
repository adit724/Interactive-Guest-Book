const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Set up Engine Handlebars (.hbs)
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

// Data awal (Dummy Data) sebelum pakai database beneran
let daftarPesan = [
    { name: 'Teddy', text: 'Love it!' },
    { name: 'Nina', text: 'Congrats!' },
    { name: 'Bahlul', text: 'Cool!' },
    { name: 'Budi', text: 'Awesome!' }
];

// ROUTE UTAMA: Mengirim data ke halaman index.hbs
app.get('/', (req, res) => {
    res.render('index', { dataPesan: daftarPesan });
});

// ROUTE SUBMIT: Menangkap data dari form lalu dimasukkan ke daftarPesan
app.post('/submit', (req, res) => {
    const namaBaru = req.body.fullName;
    const pesanBaru = req.body.message;

    if (namaBaru && pesanBaru) {
        
        daftarPesan.unshift({ name: namaBaru, text: pesanBaru });
    }

    
    res.redirect('/');
});

// Menjalankan Server di Port 3000
app.listen(PORT, () => {
    console.log(`Server Jon sudah jalan di http://localhost:${PORT}`);
});
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const PORT = 3000;

// Izinkan browser mendownload asset script.js dari folder public
app.use(express.static('public'));

// Setup Handlebars Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Route utama render file views/index.hbs
app.get('/', (req, res) => {
    res.render('index');
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Student Dashboard Jon sudah aktif di http://localhost:${PORT}`);
});
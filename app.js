const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Proyek Baru Tracker sudah aktif di http://localhost:${PORT}`);
});
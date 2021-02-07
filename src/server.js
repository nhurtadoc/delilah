const express = require('express');
const config = require('./config');
const app = express();

app.set('llave', config.llave);

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/users'));
app.use(require('./routes/products'));
app.use(require('./routes/order'));

app.listen(3000, () => {
    console.log ('Server on port', app.get('port'));
});

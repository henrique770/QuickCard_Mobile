const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/registroEstudante')(app);
require('./app/controllers/rudEstudante')(app);
require('./app/controllers/crudAnotacao')(app);
require('./app/controllers/crudBlocoAnotacao')(app);
require('./app/controllers/crudBlocoCartao')(app);
require('./app/controllers/crudCartao')(app);

app.listen(3000);
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const app = express();
app.use(bodyParser.xml());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

const port=5000;

/*########### connection to mysql database #########*/
const db = require('./models/db.js');


/*########## Routing  ########*/
var indexRoute=require('./routes/index.js');
var submitRoute=require('./routes/submit.js');



app.use('/api/',indexRoute);
app.use('/api/submit',submitRoute);




app.listen(port, () => console.log(`Listening on port ${port}`));

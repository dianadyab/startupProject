/*
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");


 sql = `CREATE TABLE interactions (id INT(11), description VARCHAR(255),drugCode VARCHAR(255),diseaseCode VARCHAR(255), type INT(11),PRIMARY KEY (id))`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("The interactions table is created!!");
  });

});
*/

'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});


  // connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('connected!');


});

module.exports = connection;

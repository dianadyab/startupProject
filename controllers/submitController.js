var js2xmlparser = require("js2xmlparser");//to convert from json to xml
var parseString = require('xml2js').parseString;//to convert from xml to js object
var db = require('../models/db.js');


module.exports = {
  getSubmitData(req, res) {

      console.log( req.body);

      //request data from the form  in JSON
      var request =req.body.request;
      console.log(request);

      //parse the request
      var drug = request.drug[0];
      var disease = request.disease[0];
      var type = request.type[0];
      console.log(drug);
      console.log(disease);
      console.log(type);//OK

    //all data is ready for search

    //connect to database , then query the database in callback function
    db.connect(function(err) {
      //query
      db.query("SELECT * FROM interactions where type=? AND diseaseCode=? AND drugCode=?",[type,disease,drug] ,function (err, result, fields) {
        if(result.length>0){
              //match
             console.log("result from database as json");
             console.log(result);
             //convert result from json to xml and handle by using js2xmlparser.parse
             var responseXML=js2xmlparser.parse("response", result[0]);
             console.log('result from database as xml');
             console.log(responseXML);
            
             //res.send(`The match from database.\n drug code : ${drugCode} \n disease code : ${diseaseCode} \n description : ${description} \n type: ${typeCode}\n\n\n\n response in xml : \n ${responseXML}`
             res.send(responseXML);





        }
        else{
          console.log('no match found');
          res.send(`There is no match ..!`);
        }
    }//end of callback function
  );//end of query function
});//end of connect function
}

}//module.export

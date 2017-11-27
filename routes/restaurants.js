var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* Connecting to Database.*/
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'restaurantsdb'
});
conn.connect(function(err,res){
    if(err)
        console.log(err.message);
    else
        console.log("connected");
});


router.route('/restaurants')
//To Retirive all the Restaurants from the DB.

.get(function(req, res) {
   	 var queryString = 'SELECT * FROM restaurantsdb';
    //query for data base schema
    conn.query(queryString,function(err, restaurantsdb) {
      if (err){
        res.send(err);
      }//res json for the list of restaurants from server.
      else{	
      res.json(restaurantsdb);
      }
    });
  })//get method

  //posting a restaurant in DB
   .post(function(req, res) {
  
  //get data from the body
    var data = {
        restaurant_name: req.body.restaurant_name,
        location: req.body.location,
        cuisines: req.body.cuisines,
        price_per_table: req.body.price_per_table,
        no_of_tables: req.body.no_of_tables,
     };

	 //A SQL Query to insert the data into the DB.
	  var queryString = 'INSERT INTO restaurants set ? ';
    
    conn.query(queryString,data,function(err, restaurantsdb) {
      if (err){
        console.log(err);
      }//res json for the list of restaurants from server.
      else{
      res.json(restaurantsdb);
      }
    });
  });//post method

  //Search For a Particular Restaurant.
  router.route('/restaurants/:restaurant_id')  

    .get(function(req,res){
          var id = req.params.restaurant_id;
          var queryString = 'SELECT * FROM restaurantsdb WHERE restaurant_id = ?';

     conn.query(queryString,[id],function(err,restaurantsdb){
              if(err){
                     console.log(err);
               }else{
                    res.json(restaurantsdb);
              }
          });     
        })//get method

//To Update contents of a particular restaurant
     
     .put(function(req,res){
        var data = {
        restaurant_id: req.body.restaurant_id,
        restaurant_name: req.body.restaurant_name,
        location: req.body.location,
        cuisines: req.body.cuisines,
        price_per_table: req.body.price_per_table,
        no_of_tables: req.body.no_of_tables,
     };    
            var id = req.params.restaurant_id;
            var queryString = "UPDATE restaurantsdb set ? WHERE restaurant_id = ? ";
 
 conn.query(queryString,[data,id],function(err,restaurantsdb){
       
if(err){
console.log(err);
}else{
console.log(res[0]);
res.json(restaurantsdb);
}
});
});//update method

//Search w.r.t Name, Loc, Cuisines, Price per table For the CUSTOMER.
router.route('/search/:key')

    .get(function(req,res){       
    var searchKey =  req.params.key;
    var cuisines = req.params.cuisines;
     var  tables = req.params.no_of_tables;
    
          var queryString = "SELECT restaurant_name,location,price_per_table,cuisines,no_of_tables as type FROM restaurants WHERE restaurant_name LIKE" + SqlString.escape(searchKey) + "OR cuisines LIKE" + 

      SqlString.escape(searchKey) + "OR location LIKE" + SqlString.escape(searchKey) + "OR no_of_tables =" + "?";

conn.query(queryString,[searchKey],function(err,rest,restaurantsdb){
             if(err){
             	console.log(err);
             }else{
              console.log(status);
                 console.log(res.message);
                 res.json(restaurantsdb);
             }
          });
});//get method


module.exports = router;
		

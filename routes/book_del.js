var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* Connecting to Database.*/
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tables'
});
conn.connect(function(err,res){
    if(err)
        console.log(err.message);
    else
        console.log("connected");
});

router.route('/booking/:customer_id')

// booking a table
     .post(function(req,res){
    var data = {
        retaurant_id: req.body.retaurant_id,
        customer_id: req.params.customer_id,
        location: req.body.location,
        cuisines: req.body.cuisines,
        total_price: req.body.total_price,       
        table_booked: req.body.table_booked,
        discount: req.body.discount
     };  
var queryString = "INSERT INTO tables set ?"
     
conn.query(queryString,[data],function(err,details){          
           if(err){
            console.log(err);
           }
           else{
            res.json(details);
           }
		});

     })//post

	 
	 //deleting a booked table from databases
     .delete(function(req,res){
      var customer_id = req.params.customer_id;
      var queryString = "DELETE FROM tables WHERE customer_id = ?"
      conn.query(queryString,[customer_id],function(err,status){          
           if(err){
            console.log(err);
           }else {
            res.json(status);
           }
			});
	})//delete

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pg = require('pg');
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
const conn = new pg.Client("postgres://xbfohsdt:ln2Bh5a0G8-EoAtWSs-8xmdQEckiUl6N@hansken.db.elephantsql.com/xbfohsdt");
conn.connect((err)=>{
    if (err) {
      console.log("error:"+err);
    } else { console.log("connected"); }
  });
app.use(bodyParser.urlencoded({extended:true}));
app.post("/post",(req,res)=>{
	console.log(req.body);
	const {name,mokka} = req.body;
	conn.query("insert into mokkabase (name,mokkka) values ($1,$2)",[name,mokka],(err)=>{
       if (err) { console.log("Error in updatting") }
       	else { console.log("added successfully") }
       	res.redirect("http://localhost:3000/")
	})
})
app.get("/get",(req,res)=>{
	conn.query("select * from mokkabase",(err,docs)=>{
		if (err) { console.log("err :"+err); }
		else {
			console.log("Delivered succesfully");
			console.log(docs.rows);
			res.json(docs.rows);
		}
	})
})
app.listen(process.env.PORT || 5000,()=>{
	console.log("Server is running on port 5000");
})
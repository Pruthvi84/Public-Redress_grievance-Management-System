const express = require("express")
const app = express()
// const bcrypt = require("bcrypt")
// app.use(express.json())
const ejs = require("ejs");
const mysql = require("mysql")
var session = require('express-session');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.json());
const db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost", //This is your localhost IP
  user: "Pruthvi Bhat", // "newuser" created in Step 1(e)
  password: "pruthvibhat@84", // password for the new user
  database: "complaint_database_system", // Database name
  port: "3306", // port name, "3306" by default
	multipleStatements: true
})
db.getConnection((err, connection) => {
  if (err) throw (err)
  console.log("DB connected successful: " + connection.threadId)
})
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get("/", function(req, res){
  res.render("homepage");
});
app.get("/sewageboard", function(req, res){
  res.render("sewageboard");
});
app.get("/electricityboard", function(req, res){
  res.render("electricityboard");
});
app.get("/waterboard", function(req, res){
  res.render("waterboard");
});
app.get("/registration", function(req,res){
  res.render("register");
})
app.get("/loginpage", function(req,res){
  res.render("login");
})
app.get("/adminlogin", function(req,res){
  res.render("admin");
})
app.get("/dashboard", function(req,res){
  res.render("dashboard")
})
app.get("/roaddashboard", function(req,res){
	res.render("roaddashboard");
})
app.get("/roadconstruction", function(req,res){
  res.render("roadconstruction")
})
app.get("/roadmaintenance", function(req,res){
  res.render("roadmaintenance")
})
app.get("/roadtransport", function(req,res){
  res.render("roadtransport")
})
app.get("/status",function(req,res){
res.render("status");
});
app.get("/grievance",function(req,res){
res.render("grievance");
});
app.get("/confirmation",function(req,res){
res.render("confirmation");
});

app.post('/registration',function(req,res){
const username=req.body.username;
const lname = req.body.lname;
const password=req.body.password;
const confirmpassword=req.body.confirmpassword;
const address = req.body.address;
const inline = req.body.inline;
const dob = req.body.dob;
const pincode = req.body.pincode;
const phonenumber=req.body.phonenumber;
const email=req.body.email;
db.query('INSERT INTO log(username,lname,password,confirmpassword,address,inline,dob,pincode,phonenumber,email) VALUES("'+username+'","'+lname+'", "'+password+'","'+confirmpassword+'","'+address+'","'+inline+'","'+dob+'","'+pincode+'","'+phonenumber+'","'+email+'")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
res.redirect('/loginpage');
})

app.post('/loginpage', function(req, res) {

	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		db.query('SELECT * FROM log WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/dashboard');
			} else {
				res.send('Incorrect Username and/or Password!');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});
app.post("/adminlogin",function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	db.query('INSERT INTO adminlogin(username,password) VALUES("'+username+'" , "'+password+'")',(err,rows)=>{
	if(err){
	throw err
	}
	else{
	console.log('Data sent bois');
	console.log(rows);
	}
	})
	res.redirect('/grievance');

})
app.post("/waterboard",function(req,res){
const phonenumber = req.body.phonenumber;
const address = req.body.AddressWaterBoard;
const landmark = req.body.Landmark;
const wateravailability = req.body.WaterAvailability;
const meterfault=req.body.MeterFault;
const pipeline=req.body.PipelineAndInfrastructure;
const textwb = req.body.textWB;
db.query('INSERT INTO waterboard(phonenumber,address,landmark, wateravailability, meterfault, pipeline, textwb,status) VALUES("'+phonenumber+'","'+address+'","'+landmark+'", "'+wateravailability+'","'+meterfault+'","'+pipeline+'","'+textwb+'","notcomplete")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
res.redirect('/confirmation')
})
app.post("/sewageboard",function(req,res){
var phonenumber = req.body.phonenumber;
var address = req.body.addresssewageboard;
var landmark=req.body.Landmark;
const manholeissue=req.body.ManholeIssue;
const drainageissue=req.body.DrainageIssue;
const garbageissue=req.body.Garbage;
const textsb = req.body.textSB;
db.query('INSERT INTO sewageboard(phonenumber,address, landmark, manholeissue, drainageissue, garbageissue,textsb,status) VALUES("'+phonenumber+'","'+address+'", "'+landmark+'","'+manholeissue+'","'+drainageissue+'","'+garbageissue+'","'+textsb+'","notcomplete")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
res.redirect('/confirmation')
})
app.post("/electricityboard",function(req,res){
const phonenumber = req.body.phonenumber;
const address = req.body.address;
const landmark=req.body.Landmark;
const linebreakdown=req.body.LineBreakDown;
const billingissue=req.body.BillingIssue;
const newconnection=req.body.NewConnection;
const texteb = req.body.textEB;
db.query('INSERT INTO electricityboard(phonenumber,address, landmark, linebreakdown, billingissue, newconnection,texteb,status) VALUES("'+phonenumber+'","'+address+'", "'+landmark+'","'+linebreakdown+'","'+billingissue+'","'+newconnection+'","'+texteb+'","notcomplete")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
res.redirect('/confirmation')
})
app.post("/roadconstruction",function(req,res){
const phonenumber = req.body.phonenumber;
const address = req.body.Address;
const landmark=req.body.Landmark;
const pincode=req.body.Pincode;
const area=req.body.Area;
const landavailable=req.body.LandAvailable;
const textrc = req.body.textC;
db.query('INSERT INTO roadconstruction(phonenumber,address, landmark, pincode, area, landavailable,textc, status) VALUES("'+phonenumber+'","'+address+'", "'+landmark+'","'+pincode+'","'+area+'","'+landavailable+'","'+textrc+'","not complete")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
res.redirect('/confirmation')
})
app.post("/roadtransport",function(req,res){
var phonenumber = req.body.phonenumber;
var slandmark = req.body.SLandmark;
var flandmark = req.body.FLandmark;
var staffbehaviour = req.body.StaffBehaviour;
const textrt = req.body.textRT;

db.query('INSERT INTO roadtransport(phonenumber,slandmark, flandmark, staffbehaviour, textrt, status) VALUES("'+phonenumber+'","'+slandmark+'", "'+flandmark+'","'+staffbehaviour+'","'+textrt+'", "notcomplete")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
res.redirect('/confirmation')
})

app.post("/roadmaintenance",function(req,res){
var phonenumber = req.body.Phonenumber;
var address = req.body.AddressRoadMain;
var landmark = req.body.Landmark;
var pincode = req.body.Pincode;
var area = req.body.Area;
var qor=req.body.QualityOfRoad;
var textrm = req.body.textRM;

db.query('INSERT INTO roadmaintenance(phonenumber,address, landmark, pincode, area,qor,textrm,status) VALUES("'+phonenumber+'","'+address+'", "'+landmark+'","'+pincode+'","'+area+'","'+qor+'","'+textrm+'","notcomplete")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
res.redirect('/confirmation')
})

app.post("/status",function(req,res){
var ph=req.body.phone;
var sql = "SELECT address,phonenumber, complaintid,photolink, status FROM waterboard w WHERE w.phonenumber = ?;SELECT address,phonenumber, complaintid, photolink,status FROM electricityboard e WHERE e.phonenumber= ?;SELECT address,phonenumber, complaintid, photolink,status FROM sewageboard sw WHERE sw.phonenumber= ?;SELECT address,phonenumber, complaintid, photolink,status FROM roadmaintenance rm WHERE rm.phonenumber= ?;SELECT address,phonenumber, complaintid, photolink,status FROM roadconstruction rc WHERE rc.phonenumber= ?;SELECT phonenumber, complaintid,photolink, status FROM roadtransport rt WHERE rt.phonenumber= ?;";
db.query(sql, [ph,ph,ph,ph,ph,ph], function(error, results, fields) {
if (error) {
throw error;
}
res.render("design",{items:results[0],items1:results[1],items2:results[2],items3:results[3],items4:results[4],items5:results[5]});
});
})

app.post("/grievance",function(req,res){
var lm=req.body.landmark;
var sql = "SELECT complaintid,address,landmark,textwb FROM waterboard w WHERE w.landmark = ?;SELECT complaintid,address,landmark,texteb FROM electricityboard e WHERE e.landmark= ?;SELECT complaintid,address,landmark, textsb FROM sewageboard sw WHERE sw.landmark= ?;SELECT complaintid,address,landmark, textrm FROM roadmaintenance rm WHERE rm.landmark= ?;SELECT complaintid,address,landmark,textc FROM roadconstruction rc WHERE rc.landmark= ?;";
db.query(sql, [lm,lm,lm,lm,lm], function(error, results, fields) {
if (error) {
throw error;
}
res.render("designgrievance",{items:results[0],items1:results[1],items2:results[2],items3:results[3],items4:results[4]});
});
})

const port = process.env.PORT || 3000;
app.listen(port)
console.log("app is listening on port" + port);

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { mysqlConnection } = require('./config/my-sql');
const adminroutes=require("./routes/adminroutes.js");
const manage_employerRouter=require("./routes/admin/manage_employer");
const manage_consultantRouter=require("./routes/admin/manange_consultant");

const manage_subadminRouter=require("./routes/manage_subadmin");
const manage_employeeRouter=require("./routes/manage_employee");
const manage_indemployeeRouter=require("./routes/manage_inde_employee");
const CommonRouter=require("./routes/common.js");
const filesRouter=require("./routes/admin/filesupload.js");
const manage_affiliates=require("./routes/manage_affiliates");
const manage_univarsity=require("./routes/manage_univarsity");
const manage_freelancer=require("./routes/manage_freelancer");
const manage_students=require("./routes/manage_students");
const loginroutes=require("./routes/login.js");
const IndEmp_consultantRouter=require("./routes/Independent_Employee/manage_consultants.js");
const IndEmp_routes=require("./routes/Independent_Employee/routes.js");
var jwt = require('jsonwebtoken');
var session = require('express-session');
const querystring = require('querystring');
const multer  = require('multer')
 const fileupload=require("express-fileupload");
  const csv=require('csv-parser');
  const fs =require('fs');
  const util=require('util');
  const readXlsxFile = require('read-excel-file/node');
  var validator = require("email-validator");
  var cookieParser = require('cookie-parser')

var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
// app.set(path.join(express.static(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views')));


app.set('view engine','ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cookieParser())
 app.use(fileupload());
 app.use( session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }

}));

 app.use("/",loginroutes);
 app.use("/login",loginroutes);
//  app.use(verifyToken);
 app.use("/",adminroutes); 
 app.use("/admin/dashboard/",adminroutes); 
 app.use("/",manage_consultantRouter);
 app.use("/admin/filesupload",filesRouter);
app.use("/",manage_indemployeeRouter);

 //employer 
 app.use("/admin/manage_employer",manage_employerRouter);
 app.use("/",manage_employerRouter);


 //employee
  app.use("/",manage_employeeRouter);
 app.use("/get_employeelist",manage_employeeRouter);
 app.use("/add_multipleemployee",manage_employeeRouter);
 app.use("/checkemplyee_dublicate",manage_employeeRouter);
 app.use("/addsingel_employeestep1",manage_employeeRouter);
 app.use("/addsingel_employeestep2",manage_employeeRouter);
 app.use("/add_singleemployee_step3",manage_employeeRouter);


 app.use("/",manage_subadminRouter);
 app.use("/",CommonRouter);


 app.use("/",manage_affiliates);
 app.use("/",manage_univarsity);
 app.use("/",manage_freelancer);
 app.use("/",manage_students);
 app.use("/",IndEmp_consultantRouter);
 app.use("/",IndEmp_routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

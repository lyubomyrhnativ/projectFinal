//підключаєм express
var express=require('express');
var app=express();
app.use(express.static(__dirname));
//підключаєм модуль body-parser і інтегруєм в express
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//підключаємо mongoose-модель
var UsersCourse=require('./userscourse');
//опрацювання кореневого шляху
app.get('/',function(req,res){
  res.sendFile(__dirname+'/main.html');
})
//завантаження даних з бази
app.get('/loadData',function(req,res){
  UsersCourse.find(function(err,data){
    console.log(data);
    res.send(data);
  })
})
//додавання нового слухача в базу
app.post('/adduser',function(req,res){
  console.log("req.body:");
  console.log(req.body);
  var user=new UsersCourse(req.body);
  user.save(function(err,data){
    console.log("data:");
    console.log(data);
    res.send(data);
  })
})
//знищення слухача з бази даних
app.post('/deleteuser',function(req,res){
  console.log("req.body:");
  console.log(req.body);
  UsersCourse.remove({_id:req.body.id},function(err,data){
    console.log(data);
    res.send("delete user!");
  })
})
//додавання нового курсу слухачу
app.post('/addcourse',function(req,res){
  console.log("addcourse - req.body:");
  console.log(req.body);
  var course=req.body.course;
  UsersCourse.update({_id:req.body.id},{$push:{courses:course}},function(err,data){
    console.log(data);
    res.send("add course!");
  })
})
//відмітка про проходження курсу слухачем
app.post('/checkcourse',function(req,res){
  console.log('checkcourse:');
  var course=req.body.course;
  UsersCourse.update({_id:req.body.id,'courses.name':course.name},
                     {$set:{'courses.$.bool':course.bool}},
    function(err,data){
      console.log(data);
      res.send('check click');
    })
})
//знищення курсу для конкретного слухача
app.post('/deletecourse',function(req,res){
  console.log("req.body-deletecourse:")
  console.log(req.body);
  var course=req.body.course;
  console.log("course:");
  console.log(course);
  UsersCourse.update({_id:req.body.id},{$pull:{courses:course}},function(err,data){
   // console.log(data);
    res.send("delete course");
  })
})
//порт прослуховування для сервера
app.listen(8080);
console.log('run server!');

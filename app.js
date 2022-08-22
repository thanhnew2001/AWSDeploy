var app = require('express')()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
 
const url = "mongodb+srv://admin:admin@cluster0.mnwyjpj.mongodb.net/db1?retryWrites=true&w=majority"
mongoose.connect(url)
 
//define a "table" structure
var StudentSchema = new mongoose.Schema({
   id: String,
   name: String
})
//create a model Student ==> students (database collection)
//Teacher => teachers , Course => courses
var Student = mongoose.model('Student', StudentSchema)
 
app.get('/students', function(req, res){
   Student.find({}, function(err, students){
       res.send(students)
   })
})
 
app.post('/students', function(req, res){
   Student.create(req.body, function(err, student){
       res.send(student)
   })
})
 app.delete('/students/:id', function(req, res){
   Student.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 app.put('/students', function(req, res){
   Student.findOneAndUpdate({_id: req.body.id},{ name: req.body.name}, function(err, result){
       res.send(result)
   })
})
 
app.get('/students/search/:keyword', function(req, res){
   Student.find({name: req.params.keyword}, function(err, result){
       res.send(result)
   })
})
 
 
app.listen(9000)

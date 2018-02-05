var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gnat:gnat77@ds133260.mlab.com:33260/mybase');
console.log("mongodb connect...")
module.exports=mongoose;

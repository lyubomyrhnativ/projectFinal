//підключаємо mongoose
var mongoose=require('./mongoose');
//створюєм схему та модель для роботи з базою даних
var schemaUsersCourse=new mongoose.Schema({
		user:{
			type:String,
			require:true,
			unique:true
		},
		courses:[
			{
				name:String,
				bool:Boolean
			}
			]
		})
var UsersCourse=mongoose.model("UsersCourse",schemaUsersCourse);
module.exports=UsersCourse;

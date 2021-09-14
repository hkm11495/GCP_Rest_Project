const ds=require("./datastore");
const datastore=ds.datastore;

class Entity{
	constructor(id){
		this.id=id;
		this.self=null;
	}
	getKey(){
		var key= datastore.key([this.constructor.name, parseInt(this.id,10)]);
		return key;
	}
	setID(id){
		this.id=id;
	}
	setSelf(req){
		var constructor_name=this.constructor.name.toLowerCase().concat("s");
		this.self = req.protocol +"://" + req.get("host") + '/' + constructor_name + '/' + this.id;	
	}
	
}

module.exports={Entity};
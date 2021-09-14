function newState(){
	var result = [];
	//random length of 10- 20
	length=Math.floor(Math.random()*11)+10;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
		charactersLength)));
   }
   return result.join('');
}

module.exports={newState};
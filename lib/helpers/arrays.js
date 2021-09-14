//evaluate if array is empty

function is_empty(array){
	if (!Array.isArray(array) || !array.length) {
		return true;
	}	
	return false;
}

function is_Array(array){
	if (Array.isArray(array) ) {
		return true;
	}	
	return false;
}

module.exports={is_empty,is_Array};
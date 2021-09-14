var client=require('./../error/client_error');

function isJson(req){
	if(req.get('content-type')==='application/json'){
		return true;
	}
	else{
		throw new client.unsupported_media_type("Server only accepts application/json data");
	}
	return false;
}

function acceptsJson(req){
	const accepts = req.accepts(['application/json']);
	if (!accepts){
		throw new client.not_acceptable("Client must accept application/json data");
	}
	return true;
}

module.exports={isJson, acceptsJson};

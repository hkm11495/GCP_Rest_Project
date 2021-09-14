/**Fails**/
/**
https://www.baeldung.com/rest-api-error-handling-best-practices#:~:text=Some%20common%20response%20codes%20include,to%20access%20the%20requested%20resource
**/

class client_error extends Error{
	constructor(detail){
		super();
		this.detail=detail;
	}
}

class bad_request extends client_error{
	constructor(detail){
		super(detail);
		this.title="Bad Request";
		this.status= 400;
		this.message="Client sent an invalid request — such as lacking required request body or parameter"
	}
}

class unauthorized extends client_error{
	constructor(detail){
		super(detail);
		this.title="Unauthorized";
		this.status= 401;
		this.message="Client failed to authenticate with the server"
	}
}

/**
authenticated but incorrect permissions
**/
class forbidden extends client_error{
	constructor(detail){
		super(detail);
		this.title="Forbidden";
		this.status= 403;
		this.message="Client authenticated but does not have permission to access the requested resource"
	}
}

class not_found extends client_error{
	constructor(detail){
		super(detail);
		this.title="Not_Found";
		this.status= 404;
		this.message="The requested resource does not exist"
	}
}


class method_not_allowed extends client_error{
	constructor(detail){
		super(detail);
		this.title="Method Not Allowed";
		this.status= 405;
		this.message="The requested resource is not supported"
	}
}

/**
 Client request accept has file type the server cannot return.
**/
class not_acceptable extends client_error{
	constructor(detail){
		super(detail);
		this.title="Not Acceptable";
		this.status= 406;
		this.message="Server does not have a current representation that would be acceptable to the Client"
	}
}

/**
client SENDS incorrect file type
**/
class unsupported_media_type extends client_error{
	constructor(detail){
		super(detail);
		this.title="Unsupported Media Type";
		this.status= 415;
		this.message="Server cannot support the format of the payload"
	}
}

function handleError(res,error){
	console.log(error);
	res.status(error.status).json({'Error':error});
	return;
}

module.exports={bad_request, unauthorized, not_found, forbidden, method_not_allowed, not_acceptable, unsupported_media_type,handleError};
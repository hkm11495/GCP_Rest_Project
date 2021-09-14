//
const express = require('express');
const app = express();
app.enable('trust proxy');
var async = require("async");
const {OAuth2Client} = require('google-auth-library');
var dotenv = require('dotenv');
dotenv.config();
const client = new OAuth2Client(process.env.AUTH0_CLIENT_ID);

async function verify_jwt(token) {
	const ticket = await client.verifyIdToken({idToken: token, audience: process.env.AUTH0_CLIENT_ID });
	const payload = ticket.getPayload();
	//console.log('payload: ' + payload);
	const userid = payload.sub;
	return userid;
}



const verify=async(req,res,next)=>{
	var auth=req.get("Authorization");
	//console.log(auth);
	var token=null;
	if (auth){
		var token=auth.split(" ")[1];
		//console.log('token: ' + token)
	}
	
	try{
		var userid=await verify_jwt(token);
		//console.log('user_id: ' + userid)
		res.locals= Object.assign({},{'userid':userid})
	}
	catch(error){
		res.locals= Object.assign({},{'error':'bad jwt'})	
	}
	next();
}

module.exports={verify};
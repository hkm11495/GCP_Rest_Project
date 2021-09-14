const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const ds=require('./datastore');
const datastore=ds.datastore;

//runs a query
function query(q){
	return datastore.runQuery(q).then((entities)=>{
		return entities;
	});
}


function map_id_self_only(id_list,obj,req){
	var map =id_list.map((id)=>{
		var new_obj=Object.create(obj);
		new_obj.id=id;
		new_obj.setSelf(req);
		return new_obj;
	});
	return map;
}


function map_all_properties(entities,obj,req){
	var map =entities.map((entity)=>{
		var new_obj=Object.create(obj);
		for (var k in new_obj) new_obj[k]=entity[k]; 
		new_obj.id=entity[datastore.KEY].id;
		new_obj.setSelf(req);
		return new_obj;
	});
	return map;
}

//get entity object
function getEntityByID(type,id){
	return datastore.get(datastore.key([type,id])).then((ds_entity) => {
		if (!ds_entity[0]){
			return null;
		}
		return ds_entity[0];
	});
}


/****
	returns a list of all entities without pagination
*****/
function getAll(type){
	return datastore.createQuery(type);
}

/****
	returns a list of all entities with pagination
	** operation param must be an async function
*****/
function pagination(type,req,operation,args){
	var q=operation.apply(null,args);
	q=q.limit(5);
	//datastore.createQuery(type).limit(5);
    if(Object.keys(req.query).includes("cursor")){
        q = q.start(req.query.cursor);
    }
	//console.log(arguments[2]);
	//operation.apply(null,args)
	return query(q).then((entities)=>{
		console.log('queried entities');
	console.log(entities);
	//this[operation].apply(this, Array.prototype.slice.call(arguments,2)).then((entities)=>{
		var results={};
		results.items=entities[0]
		if (entities[1]){
			if(entities[1].moreResults !== ds.datastore.NO_MORE_RESULTS){
				results.next = req.protocol + "://" + req.get("host") + req.baseUrl + "?cursor=" + entities[1].endCursor;
			}
		}
		return results;
	});
}



//query needs to be in the format [property, sign, value], ie ['current_boat', '=', key_boat]"
function getEntitiesByProperty(type,query){
	return datastore.createQuery(type).filter(query[0],query[1],query[2])
}

//query needs to be in the format [[property, sign, value],...], ie ['current_boat', '=', key_boat]"
function getEntitiesByProperties(type,queries){
	var q=datastore.createQuery(type);

	for (i=0;i<queries.length;i++){
		var query=queries[i];
		q=q.filter(query[0],query[1],query[2]);
	}
		
	//return datastore.createQuery(type).filter(query1[0],query1[1],query1[2]).filter(query2[0],query2[1],query2[2]);
	return q;
}


function getEntityProperty(){
	
}

function deleteEntity(type,id){
	var key = datastore.key([type, id])
	return datastore.delete(key);
}

function updateEntity(obj){
	return datastore.save(obj);
}

function createEntity(type,obj){
	var entity={
		key:datastore.key(type),
		data:obj
	};
	console.log(entity);
	return datastore.save(entity).then(()=>{
		console.log(entity.key.id);
		return getEntityByID(type,parseInt(entity.key.id,10));
	});
}

module.exports={getEntitiesByProperties, updateEntity, query, getAll, getEntityByID, getEntitiesByProperty, createEntity, deleteEntity,  pagination,map_all_properties,map_id_self_only};
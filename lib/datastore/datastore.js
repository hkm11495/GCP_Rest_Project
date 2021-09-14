
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore({projectId:'cs493project-314219'});
module.exports={datastore};
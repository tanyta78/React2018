const data={};

const subscribers = new Map();

function addListener (listener,name) {
	if(!subscribers.has(name)){
		subscribers.set(name,new Set());
	}
	subscribers.get(name).add(listener);
}

function removeListener (listener,name) {
	if(!subscribers.has(name)){
		return;
	}
	subscribers.get(name).delete(listener);
}

function setData (name,value) {
	data[name]=value;

	if(!subscribers.has(name)){
		return;
	}

	[...subscribers.get(name)].forEach(s=>{
		s(name,value);
	});
}

function getData (name) {
	return data[name];
}

export default{
	addListener,
	removeListener,
	getData,
	setData
};
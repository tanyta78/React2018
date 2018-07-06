let subscriptions = {
	'loginUser':[],
	'notification':[],
	'logoutUser':[]
};

export default {
	events:{
		loginUser:'loginUser',
		notification:'notification',
		logoutUser:'logoutUser'
	},
	subscribe:(eventName,fn)=>subscriptions[eventName].push(fn),
	trigger:(eventName,data)=>{
		subscriptions[eventName].forEach(fn=>fn(data));
	}
};
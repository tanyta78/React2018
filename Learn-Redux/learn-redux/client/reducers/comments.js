// a reducers takes in two things:

//1.the action(info about what happend)
//2. copy of current state

function postComments (state=[],action) {
	switch(action.type){
		case 'ADD_COMMENT':
		console.log(`comment added + ${action.author}+${action.comment}`);
		return[...state,{
			user:action.author,
			text:action.comment
		}];
		case 'REMOVE_COMMENT':
		console.log('comment deleted');
		return[
			...state.slice(0,action.i),
			...state.slice(action.i+1)		
		];
		default:return state;
	}
	return state;
}

function comments (state=[],action) {
	if(typeof action.postId!=='undefined'){
		return{
			//take the current state
			...state,
			//overwrite this post with a new one
			[action.postId]:postComments(state[action.postId],action)
		}
	}
	return state;
}

export default comments;
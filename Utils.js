var zw = {}
/*
*	json转tree
*	param：{data:json数据，parentId:父Id}
*/
zw.json2tree = function(data, parentId) {
	let tree = [];
	for (let i = 0; i < data.length; i++) {
		let node = data[i];
		if (node.fatherid === parentId) {
			let treeItem = {};
			treeItem.name = node.name;
			treeItem.fatherid = node.fatherid;
			treeItem.userid = node.userid;
			treeItem.nodes = json2tree(data, node.userid);
			tree.push(treeItem);
		}
	}
	return tree;
}
/**
 * 深拷贝
 */
zw.deepCopy = function(from,to={}){
	let temp = to
	for(let key in from){
		if(typeof from[key] === 'object'){
			temp[key] = new (from[key].constructor)()
			zw.deepCopy(from[key],temp[key])
		}else{
			temp[key] = from[key]
		}
	}
	return temp
}
zw.simpleDeepCopy = function(data){
	return JSON.parse(JSON.stringify(data));
}
/**
 * jsonp封装 GET
 */
zw.jsonp = function({url,params,cb}){
	return new Promise((resolve,reject)=>{
		let script = document.createElement('script');
		window[cb] = function(data){
			resolve(data)
			document.body.removeChild(script)
		}
		params = {...params,cb}
		let arr = [];
		for (const key in params) {
			arr.push(`${key}=${params[key]}`)
		}
		
		script.src = `${url}?${arr.join('&')}`
		document.body.appendChild(script)
	})
}
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
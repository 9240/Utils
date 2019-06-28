/*
*	json转tree
*	param：{data:json数据，parentId:父Id}
*/
function json2tree (data, parentId) {
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
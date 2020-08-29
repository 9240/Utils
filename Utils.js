var zw = {}
/**
 * json转tree
 * @param {Object} data 
 * @param {Number} parentId 
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
			treeItem.nodes = this.json2tree(data, node.userid);
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
			this.deepCopy(from[key],temp[key])
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
/**
 * 大整数相加
 * @param {Number} num1 
 * @param {Number} num2 
 */
zw.bigAdd = function(num1,num2){
	var numArr1 = [...(''+num1)].reverse()
	var numArr2 = [...(''+num2)].reverse()
	var Arr = []
	var newArr = []
	var carry = 0
	for (let i = 0; i < Math.max(numArr1.length, numArr2.length); i++) {
		n1 = numArr1[i] || 0
		n2 = numArr2[i] || 0
		Arr.push(Number(n1) + Number(n2))
	}
	for (let j = 0; j < Arr.length; j++) {
		if((Arr[j]+carry)>9 && j != Arr.length-1){
			newArr.push(Number(String(Arr[j]+carry)[1]))
			carry = Number(String(Arr[j]+carry)[0])
		}else if(j == Arr.length-1){
			newArr.push(Arr[j]+carry)
		}else{
			newArr.push(Arr[j])
			carry = 0
		}
	}
	return newArr.reverse().join('')
}
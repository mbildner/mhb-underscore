function isBoolean (item) {
	var boolConstrBrowserRegex = /function Boolean\(\)/;
	var boolConstrNodeRegex = /Function: Boolean/;

	return (typeof item === 'boolean') || boolConstrBrowserRegex.test(item.constructor) || boolConstrNodeRegex.test(item.constructor);
}

function isString (item) {
	var stringConstrBrowserRegex = /function String\(\)/;
	var stringConstrNodeRegex = /Function: String/;

	return (typeof item === 'string') || stringConstrBrowserRegex.test(item.constructor) || stringConstrNodeRegex.test(item.constructor);
}

function isNumber (item) {
	var numConstrBrowserRegex = /function Number\(\)/,
		numConstrNodeRegex = /Function: Boolean/;

	return (typeof item === 'number') || numConstrBrowserRegex.test(item.constructor) || numConstrNodeRegex.test(item.constructor);
}

function isArray (item) {

	return Array.isArray(item);
}

function isObject (item) {
	var objConstrBrowserRegex = /function Object\(\)/,
		objConstrNodeRegex = /Function: Object/;

	return  objConstrBrowserRegex.test(item.constructor) || objConstrNodeRegex.test(item.constructor);

}

function pairs (object) {
	var holder = [],
		key,
		value;

	for (key in object) {
		if (object.hasOwnProperty(key)) {
			value = object[key];
			holder.push([key, value]);
		}
	}

	return holder;

}

function each (list, callback, context) {
	if (context) {
		callback = callback.bind(context);
	}

	if (isArray(list)) {
		list.forEach(callback);
	}
	else if (isObject(list)) {
		var kvPairs = pairs(list);

		kvPairs
			.map(function (kvArr) {
				return kvArr.reverse();
			})
			.forEach(function (vkArr) {
				callback.apply(null, vkArr);
			});
	}
}



module.exports = {
	isBoolean: isBoolean,
	isObject: isObject,
	isNumber: isNumber,
	isArray: isArray,
	isString: isString,
	pairs: pairs,
	each: each
};

function checkProp() {
	var _obj = arguments[0]
	var _prop = arguments[1]
	var _type = arguments[2]
	var via = true
	for (var i = 3; i < arguments.length; i++) {
		_obj = _obj[arguments[i]]
		if(!_obj)
			via = false
	}
	if(!_obj[_prop] || (_obj[_prop] instanceof _type && _type)) {
		via = false
	}
	return via
}

export default {
	checkProp
}
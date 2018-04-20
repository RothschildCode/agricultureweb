import querystring from 'querystring'
import axios from 'axios'

// var base_url = '/university/Interface.php'

var http = axios.create({
	url: '/api/university/Interface.php',
	// baseURL: '/api/university/Interface.php',
	timeout: 10000,
	transformRequest: [function (data) {  
		// Do whatever you want to transform the data 
		return querystring.stringify(data)
	}],
	transformResponse: [function (data) {
		return JSON.parse(data).data
	}],
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	proxy: {
		host: '127.0.0.1',
		port: 8081
	}
})

export default http
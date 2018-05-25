import {getFileHttp} from '../common/http'

export default class EnclosureUploader {
	constructor() {
		this.resultSet = new Array()
		this.poster = getFileHttp()
	}

	upload(files, callback) {
		if(files.length <= 0) {
			callback()
		} else {
			var _this = this

			if(files && files.length > 0) {
				for(var i = 0; i < files.length; i++) {
					_this.poster({
						data: {
							filetype: 'image',
							name: '111.jpg',
							data: files[i]
						},
						method: 'post'
					}).then((res) => {
						_this.resultSet.push(res.data)
						if(_this.resultSet.length >= files.length) {
							callback(_this.urlsText())
						}
					})
				}	
			}else {
				callback(null)
			}
		}
	}

	urlsText() {
		var url = ''
		for(var i = 0; i < this.resultSet.length; i++) {
			if(i != 0) {
				url += ';'
			}
			url += this.resultSet[i]
		}
		return url
	}

}
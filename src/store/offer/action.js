import axios from 'axios'
import * as Remote from '../remote-url'
import * as util from '../util'

let url = Remote.HTTPURL

export function loadOfferList({commit}, {partyId, categoryNodeId, callback}) {
	var ajaxParams = util.ajaxParams('BJ_PAD_ACTION_QUERY_OFFERLIST')
	ajaxParams.param.categoryNodeId = categoryNodeId
	ajaxParams.param.partyId = partyId
	ajaxParams.param.item = '1'

	axios.post(url, ajaxParams).then((res) => {
		callback(res.data.resultParam.offerlist)
	})
}

export function loadOfferInitParam({commit}, callback) {
	var ajaxParams = util.ajaxParams('BJ_PAD_ACTION_QUERY_INITPARAM')
	ajaxParams.param.id = '1001'
	axios.post(url, ajaxParams).then((res) => {
		callback(res.data.resultParam.initParamList)
	})
}

export function loadOfferPriceList({commit}, {condition, callback}) {
	var ajaxParams = util.ajaxParams('BJ_PAD_ACTION_QUERY_PRICEPLANLIST')
	ajaxParams.param.category = condition.category
	ajaxParams.param.categoryNodeId = condition.categoryNodeId
	ajaxParams.param.partyId = condition.partyId
	axios.post(url, ajaxParams).then((res) => {
		callback(res.data.resultParam.offerSpecs)
	})
}
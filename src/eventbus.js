import Vue from 'vue'

var eventBus = new Vue({})

let event = {
	CHOICE_BUILDING: 'CHOICE_BUILDING',
	CHOICE_BRAND: 'CHOICE_BRAND',
	CHOICE_USER: 'CHOICE_USER',
	ADD_USER_SUCC: 'ADD_USER_SUCC',
	CHOICE_OFFER: 'CHOICE_OFFER',
	CHOICE_OFFER_SPEC: 'CHOICE_OFFER_SPEC'
}
export {
	eventBus,
	event
}
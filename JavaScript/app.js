import $ from './jquery-3.5.1.min'

import {Tab} from './tab'
import  {Search} from './search/app'
import {Tip} from "./tip/app";
import  {SetCookie} from "./setCookie/app";

$('.cookie_form').hide()
let tip = new Tip()
$.ajax({
	method:'GET',
	url:`http://localhost:3300/user/cookie`,
	success:res=>{
		new SetCookie()
		let qm_keyst = res.data.userCookie.qm_keyst
		let uin = res.data.userCookie.uin
		console.log (qm_keyst,uin)
		if(qm_keyst === undefined || uin === undefined){
			tip.template('欢迎━(*｀∀´*)ノ亻! Cookie未设置','waring')
		}else {
			tip.template('欢迎━(*｀∀´*)ノ亻! Cookie获取成功','success')
		}
		$ ('#player')
			.hide ()
		let tab = new Tab ('.nav_ul>li')
		tab.activeLi ()
		tab.getCookie()
		let search = new Search('.main')
		search.init()

	}
})


import {Tab} from './nav/tab'
import {Search} from './nav/search'
import {SetCookie} from './nav/setCookie'
import {tip} from './component/app'

$('.cookie_form').hide()

$(function () {
	$.ajax({
		method:'GET',
		url:`http://localhost:3300/user/cookie`,
		success:res=>{
			let qm_keyst = res.data.userCookie.qm_keyst
			let uin = res.data.userCookie.uin
			if(qm_keyst === undefined || uin === undefined){
				tip.template('欢迎━(*｀∀´*)ノ亻! Cookie未设置','waring')
				new SetCookie()
			}else {
				tip.template('欢迎━(*｀∀´*)ノ亻! Cookie获取成功','success')
				$('.set_cookie').css({'background-color': `#E6A23C`}).text('清除cookie').click(()=>{
					let cookie = new SetCookie()
					cookie.deleteCookie()
				})
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
})





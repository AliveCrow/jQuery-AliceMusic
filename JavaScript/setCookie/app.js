
import $ from '../jquery-3.5.1.min'
import {Tip} from "../tip/app";

export class SetCookie{
	constructor() {
		this.tip = new Tip()
		this.init()
	}

	set(cookie){
		let _this = this
		var settings = {
			"url": "http://localhost:3300/user/setCookie?=",
			"method": "POST",
			"timeout": 0,
			"headers": {
				"Content-Type": "application/json"
			},
			"data": JSON.stringify({"data":`"${cookie}"`}),
		};

		$.ajax(settings).done(function (response) {
			if(response.result ===200){
				_this.tip.template(`${response.data}`,'fail')
			}else if(response.result ===100){
				_this.tip.template(`${response.data}`,'success')
				setTimeout(()=>{
					window.location.reload();
				},400)
			}
			$('.cookie_form').fadeOut()
		})
	}

	init(){
		let form = $('.cookie_form')
		form.hide()
		let _this = this
		$('.set_cookie').click((e)=>{
			form.fadeToggle()
		})
		form.submit(function (e){
			e.preventDefault()
			let cookie = $('input[name=cookie]').val()
			_this.set(cookie)
		})
	}

	deleteCookie(){
		let _this = this
		var settings = {
			"url": "http://localhost:3300/user/setCookie?=",
			"method": "POST",
			"timeout": 0,
			"headers": {
				"Content-Type": "application/json"
			},
			"data": JSON.stringify({"data":""}),
		};

		$.ajax(settings).done(function (response) {
			_this.tip.template(`操作成功`,'waring')
			setTimeout(()=>{
				window.location.reload();
			},400)
		});
	}


}
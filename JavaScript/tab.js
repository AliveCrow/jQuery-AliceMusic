import $ from './jquery-3.5.1.min'

export class Tab{
	constructor(selector){
		this.selector=selector
		this.index = 0
	}

	activeLi(){
		let _this = this
		$(_this.selector).click(function(){
			$(this).addClass('active').siblings().removeClass('active')
		})
	}

}
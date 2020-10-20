import $ from '../jquery-3.5.1.min'


export class Tip{
	constructor() {
		this.color={
			'waring':'#E6A23C',
			'success':'#67C23A',
			'fail':'#F56C6C'
		}
	}
	template(message,colorType){
		let html = `
		<div class="tip" style="background-color:${this.color[colorType]} ">
            <span>${message}</span>
		</div>
		`
		$(html).appendTo($('body'))
		setTimeout(()=>{
			$('.tip').fadeOut()
		},1500)
	}
}
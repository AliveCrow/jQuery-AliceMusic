import $ from './jquery-3.5.1.min'

export class BtnState{
	constructor(el){
		this.el = el
		this.html = ``
		this.template()
	}
	template(){
		this.html = `<div class="change_state_btn">
        <svg t="1602743985614" class="icon play" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8616" width="200" height="200"><path d="M512 0C229.216 0 0 229.216 0 512s229.216 512 512 512 512-229.216 512-512S794.784 0 512 0zM512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96s416 186.24 416 416S741.76 928 512 928zM384 288 768 512 384 736z" p-id="8617" fill="#ffffff"></path></svg>
        <svg t="1602744019440" class="icon pause" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="200" height="200"><path d="M512 0C229.216 0 0 229.216 0 512s229.216 512 512 512 512-229.216 512-512S794.784 0 512 0zM512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96s416 186.24 416 416S741.76 928 512 928zM320 320 448 320 448 704 320 704zM576 320 704 320 704 704 576 704z" p-id="8858" fill="#ffffff"></path></svg>
    </div>`
	}

	render(){
		$('.change_state_btn').remove()
		$(this.el).append(this.html)
		$('.play').css('display','none')
		$('.pause').css('display','block')
	}

	isPlay(audio){
		if(audio){
			if(audio.paused){
				$('.play').css('display','block')
				$('.pause').css('display','none')
			}else{
				$('.play').css('display','none')
				$('.pause').css('display','block')
			}
		}else{
			$('.play').css('display','block')
			$('.pause').css('display','none')
		}
	}


}

import $ from '../jquery-3.5.1.min'


export class Load{
	constructor(slot,replace=false) {
		this.slot= $(`${slot}` )
		this.instead = replace
		this.dom = this.template()
	}
	template(){
		let html=`
    <svg t="1603018131108" class="icon loading load_rotate"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="3289" >
        <path  d="M96 512c0-19.33 15.67-35 35-35s35 15.67 35 35c0 191.09 154.91 346 346 346s346-154.91 346-346-154.91-346-346-346c-19.33 0-35-15.67-35-35s15.67-35 35-35c229.75 0 416 186.25 416 416S741.75 928 512 928 96 741.75 96 512z"
              fill="#73ac00" p-id="3290"></path>
    </svg>
		`
		let dom = document.createElement('div')
		dom.id = 'load_ico'
		$(dom).append(html)

		$(dom).appendTo(this.slot)
		return $(dom)
	}

	render(el){
		if(this.instead===true){
			$(el||this.slot).children().remove()
			$(el||this.slot).append(this.dom)
		}
		$('#load_ico').fadeIn()
	}

	remove(){
		$('#load_ico').hide()
	}


}
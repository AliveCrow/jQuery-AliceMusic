import $ from './jquery-3.5.1.min'


export class ImgSlider {
	constructor(container, selector) {
		this.container = container
		this.selector = selector
		this.index = 0
		this.intervalId;
		this.render();
	}

	sliderInit() {
		let first = $(this.selector).first()
		let last = $(this.selector).last()
		first.clone().insertAfter(last)
		last.clone().insertBefore(first)
		this.length = $(this.selector).length
		$(this.container).css('width',`${this.length*1200}px`,'left',`-1200px`)

		let id  = this.setTimer()
		$(this.container).mouseenter(()=>{
			this.stop(id)
		}).mouseleave(()=>{
			 id = this.setTimer()
		})
	}

	setTimer(){
		return setInterval(()=>{
			this.scroll()
		}, 1500)
	}

	scroll() {
		if (this.index === this.length-1) {
			this.index = 1
			$(this.container).css('left','-1200px')
		}else{
			this.index+=1
			$(this.container).animate({"left":`${-1200*this.index}px`},'slow');
		}
	}

	stop(timer){
		clearInterval(timer)
	}

	template(picUrl,h5Url){
		let text =	`<a  href='${h5Url}'><img src='${picUrl}' alt="" ></a>`
		let liDom = document.createElement('li')
		$(text).appendTo(liDom)
		return liDom
	}

	render(){
		$.ajax({
			method: "GET",
			url: 'http://localhost:3300' +
				'/recommend/banner',
			success: (res)=>{
				res.data.map(item=>{
					$(this.template(item.picUrl,item.h5Url)).appendTo($(this.container))
				})
				this.sliderInit();
			}
		})
	}

}
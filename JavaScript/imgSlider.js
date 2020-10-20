import $ from './jquery-3.5.1.min'


export class ImgSlider {
	constructor(container, selector) {
		this.container = container
		this.selector = selector
		this.index = 0
		this.intervalId;
	}

	sliderInit() {
		this.stop()
		this.index = 0
		let first = $(this.selector).first()
		let last = $(this.selector).last()
		first.clone().insertAfter(last)
		last.clone().insertBefore(first)
		this.length = $(this.selector).length
		$(this.container).css('width',`${this.length*1200}px`,'left',`-1200px`)
		this.setTimer()
		$(this.container).mouseenter(()=>{
			this.stop()
		}).mouseleave(()=>{
			 this.setTimer()
		})
	}

	setTimer(){
		this.stop()
		this.intervalId = setInterval(()=>{
			this.scroll()
		}, 2000)
	}

	scroll(keyframes, options) {
		if (this.index <  this.length - 1) {
			this.index += 1
			$ (this.container)
				.animate ({left: `${-1200 * this.index}px`},"2000");
		} else {
			this.index = 1
			$ (this.container)
				.css ('left', '-1200px')
		}
	}

	stop(){
		clearInterval(this.intervalId)
	}

	template(picUrl,h5Url){
		let text =	`<a target="-_blank"  href='${h5Url}'><img src='${picUrl}' alt="" ></a>`
		let liDom = document.createElement('li')
		liDom.className = 'slider_ul_li'
		$(text).appendTo(liDom)
		return liDom
	}

	render(){
		$.ajax({
			method: "GET",
			url: 'http://localhost:3300' +
				'/recommend/banner',
			success: (res)=>{
				for(let i=0;i<res.data.length;i++){
					$(this.template(res.data[i].picUrl,res.data[i].h5Url)).appendTo($(this.container))
				}
				this.sliderInit();
			}
		})
	}

}
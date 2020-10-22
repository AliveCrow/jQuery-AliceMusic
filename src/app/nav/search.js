import {load, getMusicData, commonData} from "../component/app";

export class Search {
	constructor(slot) {
		this.slot = slot
		this.listener = $ ('.search_form')
		this.pageSize = 0
		this.total =0
		this.pageNo = 1
		this.maxPage= 0
		this.keyword =''
		this.isonly = false
		this.load = null;
		this.over = `<p class="load_over" style="text-align: center;font-size:1rem">没有歌曲了</p>`
	}

	template() {
		let html = `
<!--           <section   class="search">-->
        <div class="search_top_text">
            <p>搜索结果</p>
        </div>
        <div class="day_bottom">
            <ul class="day_bottom_ul">
            </ul>
        </div>
<!--    </section>-->
			`
		let dom = document.createElement('section')
		dom.className = 'search'
		dom.innerHTML = html
		$('.main').append(dom)
		$('.day_bottom').append(this.over)
		$('.load_over').hide()
		this.load = load('.day_bottom')
			// new Load('.day_bottom')
		this.load.template()
		this.load.render()
	}
	init() {
		this.listener.on ('submit', (e) => {
			e.preventDefault ()
			$('.main').children().remove()
			let keyword = $ ('input[name=key]')
				.val ()
			this.template()
			this.getData(keyword,1)
			this.pageNo = 1
			this.scrollLoad()

		})
	}
	formatTime(time){
		let min = Math.floor(time /60)
		let sec = Math.floor(time%60)
		if(min<10)min = '0'+min
		if(sec<10)sec = '0'+sec
		return `${min}:${sec}`
	}
	getData(keyword,pageNo =1) {
		$.ajax ({
			method: 'GET',
			url: 'http://localhost:3300' + `/search?t=0&key=${keyword}&pageSize=20&pageNo=${pageNo}`,
			success: res => {
				$('.load_over').hide()
				this.keyword = keyword
				this.pageSize = res.data.pageSize
				this.total = res.data.total
				this.maxPage = Math.round(this.total/this.pageSize)
				commonData.playerList = res.data.list
				let a = res.data.list.map(item=>{
					let time = this.formatTime(item.interval)
					return `<li class="search_song_li" data-singmid='${item.songmid}'>
	                <a>
                        <span>
                        ${item.songname}
                        <span class="song_isvip">${item.pay.payplay?'vip':'no'}</span>
                        </span>
	                    <span>${item.singer[0].name}</span>
	                    <span>${time}</span>
	                </a>
                </li>`
				}).join('')
				$('.day_bottom_ul').append(a)
				$('.search_song_li').on('click',function(e){
					let load1 = load('',true)
					load1.template(this)
					let songmid = e.currentTarget.dataset.singmid
					let song = getMusicData
					song.getData(songmid,load1,this)
					commonData.playerListRender(songmid)

				})
			}
		})
	}
	// 滚动加载
	scrollLoad(){
		let _this = this
		let onscroll = this.throttle(function (){
			let scroll = pageYOffset+ document.documentElement.clientHeight
			let povit = document.body.clientHeight -50
			if(scroll >= povit && _this.pageNo<_this.maxPage){
				_this.pageNo +=1
				_this.getData(_this.keyword,_this.pageNo)
			}
			if(_this.pageNo >= _this.maxPage){
				_this.load.remove()
				$('.load_over').show()
			}
		},1000)
		window.addEventListener('scroll',onscroll)
	}

	//节流
	throttle(func, wait) {
		let prev, timer
		return function fn() {
			let curr = Date.now()
			let diff = curr - prev
			if (!prev || diff >= wait) {
				func()
				prev = curr
			} else if (diff < wait) {
				clearTimeout(timer)
				timer = setTimeout(fn, wait - diff)
			}
		}
	}




}
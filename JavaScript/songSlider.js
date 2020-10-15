import $ from './jquery-3.5.1.min'
import {GetMusicData} from './getMusicData';
import {Player} from './player'

export class SongSlider {
	constructor(tab, container) {
		this.container = container
		this.tab = tab
		this.area = $(`${this.tab}>li`)
		this.player
		this.songmid
		this.song
		// this.song= new GetMusicData(this.songmid)
		this.areaHash = {
			'0': '最新',
			'1': '内地',
			'2': '港台',
			'3': '欧美',
			'4': '韩国',
			'5': '日本'
		}
		this.showlist = {}
		this.decideArea()
	}
	init(){

	}
	template(picUrl, songUrl, item) {
		let text = `
		<a class="song_mid" data-songmid="${item.mid}">
			<div>
			    <img  class="song_pic" src="${picUrl}"
			         alt="">
			</div>
			<dl>
			    <dt class="song_name">${item.title}</dt>
			    <dd class="singer">${item.singer[0].name}</dd>
			</dl>
		</a>
		`
		let liDom = document.createElement('li')
		$(liDom)
			.addClass('song_list_li')
			.data('2332', '3232')
		$(text)
			.appendTo(liDom)
		return liDom
	}

	//判断地区
	decideArea() {
		let area = 0
		let _this = this
		this.area.click(function() {
			area = $(this)
				.index()
			$(this)
				.addClass('active')
				.siblings()
				.removeClass('active')
			_this.render(area)

		})
	}

	render(index) {

		$.ajax({
			method: "GET",
			url: 'http://localhost:3300' +
				`/new/songs?type=${index || 0}`,
			success: (res) => {
				$(this.container)
					.html('')
				this.showlist = res.data.list.splice(0, 10)
				this.showlist.map(item => {
					let picUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg`
					// console.log(item) item.mid;item.album.id;.name,item.singer[0].name,
					$(this.template(picUrl, null, item))
						.appendTo($(this.container))
				})
			},
			complete:()=>{
				$(`.song_mid`).on('click',(e)=>{
					let songmid = e.currentTarget.dataset.songmid
					let song = new GetMusicData(songmid)
					song.getData(songmid)
				})
			}
		})

	}
}



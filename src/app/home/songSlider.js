
import { commonData, getMusicData, lyric, load, api } from "../component/app";

export class SongSlider {
	constructor(tab, container) {
		this.container = container
		this.tab = tab
		this.player = null
		this.songmid = null
		this.song = getMusicData
		this.showlist = {}
		this.Lyric = lyric
	}
	template(picUrl, songUrl, item) {
		let text = `
		<a class="song_mid"  data-songmid="${item.mid}">
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
		$(text)
			.appendTo(liDom)

		return liDom
	}
	//判断地区
	decideArea() {
		this.load = load('.song_list_ul', true)
		this.load.template()
		let area = 0
		this.render(area)
		let _this = this
		let prev = 0
		$(`${this.tab}>li`).click(function (e) {
			_this.load.template()
			area = $(this)
				.index()
			if (prev === area) {
				_this.load.remove()
			} else {
				prev = area
				$(this)
					.addClass('active')
					.siblings()
					.removeClass('active')
				_this.render(area)
			}

		})
	}

	render(index) {
		let _this = this
		$.ajax({
			method: "GET",
			url: `${api}` +
				`new/songs?type=${index || 0}`,
			success: (res) => {
				if (res.result === 100) {
					this.load.remove()
				}

				$(this.container)
					.html('')
				this.showlist = res.data.list.splice(0, 10)
				commonData.playerList = this.showlist
				this.showlist.map((item, index) => {
					let picUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg`
					$(this.template(picUrl, null, item))
						.appendTo($(this.container))
				})

				$(`.song_mid`).on('click', (e) => {
					this.songmid = e.currentTarget.dataset.songmid
					let index = $(e.currentTarget).parent().index()
					commonData.index = index
					_this.song.getData(_this.songmid, null, _this.Lyric)
					// on()
				})
			}
		})

	}
}



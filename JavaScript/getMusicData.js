import $ from './jquery-3.5.1.min'

import {Player} from './player'
import {Tip} from "./tip/app";
import {Load} from "./load/app";

export class GetMusicData {
	constructor() {
		this.musicData = []
		this.albumid = ''
		this.PlayerUrl = ''
		this.PicUrl = ''
		this.singerName = ''
		this.songName = ''
		this.pay_play = false
		this.loadover = false
	}

	getData(songmid,load,el) {
		$.ajax({
			method: "GET",
			url: 'http://localhost:3300' + `/song?songmid=${songmid}`,
			dataType:'json',
			success: res => {
				this.albumid = res.data.track_info.album.mid
				this.PicUrl = this.musicPicUrl(this.albumid)
				this.pay_play = res.data.track_info.pay.pay_play
				this.songName = res.data.track_info.name
				this.singerName = res.data.track_info.singer[0].name
				this.musicPlayUrl(songmid)
				if(load){
					load.remove(el)
				}
			}
		})
	}

	musicPlayUrl(songmid) {
		$.ajax({
			method: "GET",
			url: 'http://localhost:3300' +
				`/song/url?id=${songmid}`,
			success: res => {
				if(res.result===400){
					let tip = new Tip()
					tip.template( `${res.errMsg}` ,'fail')
					$('.load_ico').hide()
					return
				}
				this.PlayerUrl = res.data
				let player = new Player(this)
				player.createAudio()
				$('.load_ico').hide()

			},
			complete:(res)=>{
				// responseJSON: {result: 400, errMsg: "获取播放链接出错"}

			}
		})

	}

	musicPicUrl(albumid) {
		return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumid}.jpg`
	}

}
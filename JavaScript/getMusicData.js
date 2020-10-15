import $ from './jquery-3.5.1.min'

import {Player} from './player'

export class GetMusicData {
	constructor() {
		this.musicData = []
		this.albumid = ''
		this.PlayerUrl = ''
		this.PicUrl = ''
		this.singerName = ''
		this.songName = ''
	}

	getData(songmid) {
		$.ajax({
			method: "GET",
			url: 'http://localhost:3300' + `/song?songmid=${songmid}`,
			dataType:'json',
			success: res => {

			},
			complete:(res)=>{
				this.albumid = res.responseJSON.data.track_info.album.mid
				this.PicUrl = this.musicPicUrl(this.albumid)
				this.songName = res.responseJSON.data.track_info.name
				this.singerName = res.responseJSON.data.track_info.singer[0].name
				this.musicPlayUrl(songmid)
			}
		})
	}

	musicPlayUrl(songmid) {
		$.ajax({
			method: "GET",
			url: 'http://localhost:3300' +
				`/song/urls?id=${songmid}`,
			success: res => {

			},
			complete:(res)=>{
				this.PlayerUrl = res.responseJSON.data[songmid]
				let player = new Player(this)
				player.createAudio()
			}
		})


	}

	musicPicUrl(albumid) {
		return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumid}.jpg`
	}

}
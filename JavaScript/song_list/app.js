import $ from '../jquery-3.5.1.min'
import {Load} from '../load/app'
import {GetMusicData} from "../getMusicData";

export class SongList {
	constructor(slot,data,showPic=true) {
		this.slot = slot
		this.data = data
		this.showPic = showPic
	}

	template(imgurl) {
		let html
		if(this.showPic){
			 html = `
<div class="ablum_song">
			<div class="day_top">
                <img height="260px"
                     src="${imgurl}"
                     alt="">
                <div class="day_top_text">
                    <p>${this.data.dissname || this.data.info.title}</p>
                    <p style="${this.data.update?'display:block':'display:none'}">更新于:${this.data.update}</p>
                </div>
            </div>
            <div class="day_bottom">
                <p>歌曲列表:</p>
                <ul class="ablum_song_list">
						
                </ul>
            </div>
</div>

		`
		}else {
			 html = `
		<div class="ablum_song">
		            <div class="day_bottom">
		                <p>歌曲列表:</p>
		                <ul class="ablum_song_list">
								
		                </ul>
		            </div>
		</div>

		`
		}
		$(this.slot).append(html)
		this.render()
	}
	formatTime(time){
		let min = Math.floor(time /60)
		let sec = Math.floor(time%60)
		if(min<10)min = '0'+min
		if(sec<10)sec = '0'+sec

		return `${min}:${sec}`
	}
	render(){
		let songlist = this.data.list || this.data.songlist
		let list = songlist.map(item=>{
			let time = this.formatTime(item.interval)
			let html = `<li class="song_list" data-songmid="${item.mid||item.songmid}">
				<a>
					<span>
                        ${item.name ||item.songname}
                        <span class="song_isvip">${item.pay.payplay?'vip':'no'}</span>
                        </span>
					
					<span>${item.singerName||item.singer[0].name}</span>
					<span>${time}</span>
				</a>
			</li>`
			$('.ablum_song_list').append(html)

		})
		this.play()
	}

	play(songmid){
		$('.song_list').on('click',function (e){
			let load = new Load('',true)
			load.template(this)
			let songmid = e.currentTarget.dataset.songmid
			let song = new GetMusicData(songmid)
			song.getData(songmid,load,this)
		})

	}

}
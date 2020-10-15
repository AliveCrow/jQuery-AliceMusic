import $ from './jquery-3.5.1.min'
import {Prograss} from './prograss';
import {BtnState} from './BtnState';

export class Player {
	constructor(musicData) {
		this.musicData = musicData
		this.btn = new BtnState('#player')
		this.$audio
		this.duration
		this.duration
		this.prograss;
	}

	playerInit() {
		this.prograss.start()
		$('.play')
			.click(() => {
				console.log('play')
				this.onPlay()
				this.btn.isPlay(this.$audio)
			})
		$('.pause')
			.click(() => {
				this.pause()
				this.btn.isPlay(this.$audio)
			})
	}


	hidden() {
		$('.prograss_min')
			.click((e) => {
				$('#player')
					.slideUp()
			})
	}

	show() {
		$('#player')
			.slideDown()
	}
//  http://qiniu.dreamsakula.top/C4000000NpyS0N53eQ.mp4
// 	${this.musicData.PlayerUrl}
	createAudio() {
		let audio = document.querySelector('audio')
		if (!audio) {
			audio = document.createElement('audio')
			audio.id = `Player-${new Date().getTime()}`
			audio.src = `${this.musicData.PlayerUrl}`;
			audio.autoplay = true
			audio.loop = true
			$(audio)
				.on('ended', () => {
					this.prograss.restart()
				})
			document.body.appendChild(audio)
			this.$audio = document.querySelector('audio')
			this.$audio.load()
			$(this.$audio).on('canplay',()=>{
				this.prograss = new Prograss(audio.duration)
				// this.prograss.reset(this.duration)
				this.duration=audio.duration
				this.playerInit()
			})
		}else{
			console.log('?')
			this.newPlay()
		}
		this.show()
		this.render()
		this.btn.render()

		return audio
	}

	render() {
		let text = `
 <!--播放器-->
    <img src="${this.musicData.PicUrl}" alt="" height="100px">
<!--    右半部分-->
    <div class="player_right">
        <span class="song_msg">${this.musicData.songName} - ${this.musicData.singerName}</span>
<!--        进度条-->
        <div class="prograss_container">
            <div class="prograss_group">
                <span class="played_time">00:00</span>
                <div class="prograss_bar">
                    <div class="prograss_blue"></div>
                </div>
                <span class="duration">00:00</span>
            </div>
        </div>
    </div>
		`
		$('#player')
			.html(text)
	}

	pause() {
		this.prograss.stop()
		this.$audio
			.pause()
	}

	onPlay() {
		this.prograss.start()
		this.$audio
			.play()
	}


	newPlay() {
		let audio = document.querySelector('audio')
		audio.id = `Player-${new Date().getTime()}`
		audio.src = `${this.musicData.PlayerUrl}`;
		audio.autoplay = true
		audio.loop = true
		$(audio)
			.on('ended', () => {
				this.prograss.restart()
			})
		document.body.appendChild(audio)
		this.$audio = document.querySelector('audio')
		this.$audio.load()
		$(this.$audio).on('canplay',()=>{
			this.prograss = new Prograss(audio.duration)
			this.prograss.reset(this.duration)
			this.duration=audio.duration
		})
	}


}
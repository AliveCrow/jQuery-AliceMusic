import $ from './jquery-3.5.1.min'
import {Prograss} from './prograss';
import {BtnState} from './BtnState';

export class Player {
	constructor(musicData) {
		this.musicData = musicData
		this.btn = new BtnState ('#player')
		this.$audio
		this.duration
		this.prograss;
		this.prev
	}

	playerInit() {
		this.prograss.start ()
		$ ('.play')
			.click (() => {
				this.onPlay ()
				this.btn.isPlay (this.$audio)
			})
		$ ('.pause')
			.click (() => {
				this.pause ()
				this.btn.isPlay (this.$audio)
			})
	}


	hidden() {
		$ ('.prograss_min')
			.click ((e) => {
				$ ('#player')
					.slideUp ()
			})
	}

	show() {
		$ ('#player')
			.slideDown ()
	}

//  http://qiniu.dreamsakula.top/C4000000NpyS0N53eQ.mp4
// 	${this.musicData.PlayerUrl}
	createAudio(volume) {
		this.show ()
		this.render (volume)
		this.btn.render ()
		let audio = document.querySelector ('audio')
		if (!audio) {
			audio = document.createElement ('audio')
			audio.id = `Player-${new Date ().getTime ()}`
			audio.src = `${this.musicData.PlayerUrl}`;
			audio.autoplay = true
			audio.loop = true
			audio.volume = volume

			$ (audio)
				.on ('ended', () => {
					this.prograss.restart ()
				})
			document.body.appendChild (audio)
			this.$audio = document.querySelector ('audio')
			this.$audio.load ()
			$ (this.$audio)
				.on ('canplay', () => {
					this.prograss = new Prograss (audio.duration)
					// this.prograss.reset(this.duration)
					this.duration = audio.duration
					this.playerInit ()
				})
		} else {
			this.newPlay ()
		}


		return audio
	}

	render(volume) {
		let _this = this
		let text = `
 <!--播放器-->
    <img src="${this.musicData.PicUrl}" alt="" height="100px">
<!--    右半部分-->
    <div class="player_right">
    	<div class="player_right_top">
    		<div class="player_right_top_quote">
            <span class="song_msg">${this.musicData.songName} - ${this.musicData.singerName}</span>
			<svg t="1603198937683" class="icon volume not_zero" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3383" data-spm-anchor-id="a313x.7781069.0.i10" width="200" height="200">
				<path d="M580.2 907.1c-20.2 0-39.6-6.2-56.2-17.8L308.8 731.8c-11.5-8-25.7-12.5-40.5-12.5h-74.4c-54 0-97.9-43.9-97.9-97.9V402.7c0-54 43.9-97.9 97.9-97.9h74.4c14.8 0 29-4.5 41.1-12.9l214.1-156.7c0.2-0.1 0.4-0.3 0.6-0.4 35.6-24.9 82.6-23.6 116.9 3.3 23.3 18.3 37.3 48 37.3 79.6v589.4c0 28-10.9 54.4-29.8 72.5-18.8 17.7-43 27.5-68.3 27.5zM193.9 375.6c-14.9 0-27.1 12.1-27.1 27.1v218.7c0 14.9 12.1 27.1 27.1 27.1h74.4c29.4 0 57.6 8.9 81.7 25.7l215.3 157.5c4 2.8 9.4 4.5 14.9 4.5 5 0 12.4-1.4 19.3-8 4.9-4.7 7.8-12.6 7.8-21.2V217.6c0-10-3.8-18.9-10.1-23.8-9.7-7.6-22.3-8.1-32.3-1.2L350.6 349.5c-24.7 17.3-52.9 26.2-82.3 26.2h-74.4z" fill="#ffffff" p-id="3384" data-spm-anchor-id="a313x.7781069.0.i9" class=""></path><path d="M837.7 694.9c-6.5 0-13.1-1.8-19-5.5-16.5-10.5-21.4-32.4-10.9-48.9 65.9-103.6 65.9-193.5-0.2-282.9-11.6-15.7-8.3-37.9 7.4-49.6s37.9-8.3 49.6 7.4c83.5 112.9 84.5 235.1 3 363.1-6.7 10.6-18.2 16.4-29.9 16.4zM498.2 618.3c-19.6 0-35.4-15.9-35.4-35.4V441.2c0-19.6 15.9-35.4 35.4-35.4 19.6 0 35.4 15.9 35.4 35.4v141.7c0 19.6-15.8 35.4-35.4 35.4z"  p-id="3385" data-spm-anchor-id="a313x.7781069.0.i6" class="volume_line"></path>
			</svg>
			<input type="range" class="volume_range" min="0" max="1" step="0.01" value="${volume}" >
			</div>
			<svg t="1603207544491" class="icon expansion" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6545" width="200" height="200">
				<path d="M448 554.666667c-6.4 0-10.666667 2.133333-14.933333 6.4L85.333333 908.8 85.333333 661.333333c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333l0 298.666667c0 12.8 8.533333 21.333333 21.333333 21.333333l298.666667 0c12.8 0 21.333333-8.533333 21.333333-21.333333 0-12.8-8.533333-21.333333-21.333333-21.333333L115.2 938.666667l347.733333-347.733333c4.266667-4.266667 6.4-8.533333 6.4-14.933333C469.333333 563.2 460.8 554.666667 448 554.666667zM960 42.666667 661.333333 42.666667c-12.8 0-21.333333 8.533333-21.333333 21.333333 0 12.8 8.533333 21.333333 21.333333 21.333333l247.466667 0L561.066667 433.066667C556.8 437.333333 554.666667 441.6 554.666667 448c0 12.8 8.533333 21.333333 21.333333 21.333333 6.4 0 10.666667-2.133333 14.933333-6.4L938.666667 115.2 938.666667 362.666667c0 12.8 8.533333 21.333333 21.333333 21.333333s21.333333-8.533333 21.333333-21.333333L981.333333 64C981.333333 51.2 972.8 42.666667 960 42.666667z" p-id="6546" >
				</path>
			</svg>
		</div>
<!--        进度条-->
        <div class="prograss_container">
            <div class="prograss_group">
                <span class="played_time">00:00</span>
<!--                <div class="prograss_bar">-->
<!--                    <div class="prograss_blue"></div>-->
<!--                </div>-->
                <input type="range" class="music_progress"  min="0" max="100" step="1" value="0" >
                <span class="duration">00:00</span>
            </div>
        </div>
    </div>
		`
		$ ('#player')
			.html (text)

		this.prev = volume
		$('.volume_range').css('background-size',`${Math.floor(volume*100)}%`).mouseenter(function (e){
			$(this).mousedown((e)=>{
				$(this).mousemove((e)=>{
					let vol = e.offsetX<=0?0:(e.offsetX>=100?100:e.offsetX)
					$(this).val(vol/100)
					$(this).css('background-size',`${vol}% 100%`)
					_this.$audio.volume = e.offsetX<1 ? 0 : (e.offsetX>= 100 ? 1 : e.offsetX/100)
					$(this).mouseup(()=>{
						_this.prev = $(this).val()
						$(this).unbind('mousemove')
					})
				})

			})
		})

		$('.volume').click(function (e){
			if(_this.$audio.muted){
				$('.volume_range').val(_this.prev).css('background-size',`${_this.prev*100}% 100%`)
			}else {
				$('.volume_range').val(0).css('background-size',`0% 100%`)
			}
			_this.$audio.muted = !_this.$audio.muted
		})

		$('.music_progress').mouseenter(function (e){
			let width = $(this).width()
			let ofx = e.offsetX<=0?0:(e.offsetX>=width?100:e.offsetX)
			let currentPosition = ofx/$(this).width()
			$(this).mousedown((e)=>{
				_this.prograss.currentTime = _this.$audio .duration * currentPosition
				_this.$audio.currentTime = _this.$audio .duration * currentPosition
			})

		})
	}


	pause() {
		this.prograss.stop ()
		this.$audio
			.pause ()
	}

	onPlay() {
		this.prograss.start()
		this.$audio
			.play ()
	}


	newPlay() {
		let audio = document.querySelector ('audio')
		audio.id = `Player-${new Date ().getTime ()}`
		audio.src = `${this.musicData.PlayerUrl}`;
		audio.autoplay = true
		audio.loop = true
		$ (audio)
			.on ('ended', () => {
				this.prograss.restart ()
			})
		document.body.appendChild (audio)
		this.$audio = document.querySelector ('audio')
		this.$audio.load ()
		$ (this.$audio)
			.on ('canplay', () => {
				this.prograss = new Prograss (audio.duration)
				this.prograss.reset (this.duration)
				this.duration = audio.duration
			})
	}


}
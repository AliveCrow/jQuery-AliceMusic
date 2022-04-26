import { SetCookie } from "../nav/setCookie";
import { Tab } from "../nav/tab";
import { Search } from "../nav/search";


class Lyric {
	constructor() {
		this.player = $('#player')
		this.currentTime = 0
		this.index = 0
		this.lyric = ''
		this.$audio = document.querySelector('audio')
		this.intervalId = null
	}

	//歌词渲染
	template() {
		$('#player_all')
			.remove()
		let html = `<div id="player_all" >
				        <div class="lyric_box">
				        </div>
			         </div>`
		this.player.append(html)
	}
	getLyric(songmid) {
		let _this = this
		const settings = {
			"url": api + `lyric?songmid=${songmid}`,
			// `http://localhost:3300/lyric?songmid=${songmid}`,
			"method": "GET",
		};
		$.ajax(settings)
			.done(function (response) {
				let lyric = response.data.lyric
				lyric = lyric.match(/^\[\d{2}:\d{2}.\d{2}](.+)$/gm)
				_this.resetScroll(lyric)
				_this.lyric = lyric
				let html = lyric.map(item => {
					return `<div class="player-lyrics-line">${item.slice(10)}</div>`
				})
					.join("")
				$('.lyric_box')
					.append(html)
				_this.startScroll()
			});
	}
	//歌词滚动
	lyricTime(lyric) { //返回歌词显示的时间
		return lyric.replace(/^\[(\d{2}):(\d{2}).*/, (match, p1, p2) => 60 * (+p1) + (+p2))
	}
	scrollLyric() {
		let _this = this
		//当前播放的时间
		_this.currentTime = Math.round(_this.$audio ? _this.$audio.currentTime : _this.currentTime + 1)
		for (let i = 0; i < _this.lyric.length; i++) {
			if (_this.lyricTime(_this.lyric[i]) <= _this.currentTime && (!_this.lyric[i + 1] || this.lyricTime(_this.lyric[i + 1]) >= _this.currentTime)) {
				let lt = $('.player-lyrics-line')
				$(lt[_this.index])
					.removeClass('inactive')
				$(lt[i])
					.addClass('inactive')
				_this.index = i
				break
			}
		}
		if (_this.index > 2) {
			let y = -(_this.index - 2) * 60
			$('.player-lyrics-line')
				.css('transform', `translateY(${y}px)`)
		}
	}
	startScroll() {
		this.stopScroll()
		this.intervalId = setInterval(
			this.scrollLyric.bind(this)
			, 1000)
	}
	stopScroll() {
		clearInterval(this.intervalId)
	}
	resetScroll() {
		this.stopScroll()
		this.currentTime = 0
		this.index = 0
		$('.player-lyrics-line')
			.css('transform', `translateY(0px)`)
		let $active = $('.inactive')
		if ($active) {
			$active.removeClass('inactive')
		}
	}
	toScroll(currentTime) {
		this.currentTime = currentTime
	}
	restart() {
		this.resetScroll()
		this.startScroll()
	}
}
class Prograss {
	constructor(duration) {
		this.nowTime = 0
		this.duration = duration || 0
		this.prograss = 0
		this.intervalId = null
		this.$progressRate = $('.music_progress')
		this.$playedTime = $('.played_time')
		this.$allTime = $('.duration')
		this.$audio = document.querySelector('audio')
		this.$allTime.html(this.formatTime(this.duration))
	}

	start() {
		this.stop()
		this.intervalId = setInterval(() => {
			this.update()
		}, 10)
	}

	stop() {
		clearInterval(this.intervalId)
	}

	restart() {
		this.reset()
		this.start()
	}

	reset(duration) {
		this.stop()
		this.nowTime = 0
		this.prograss = 0
		this.$progressRate.attr('value', '0')
		this.$playedTime.html(this.formatTime(this.$audio.currentTime))
		if (duration) {
			this.duration = +duration
			this.$allTime.html(this.formatTime(this.duration))
		}
	}

	update() {
		this.prograss = this.$audio.currentTime / this.duration
		this.$progressRate.attr('value', `${this.prograss * 100}`)
		this.$progressRate.css('background-size', `${this.prograss * 100}% 100%`)
		this.$playedTime.html(this.formatTime(this.$audio.currentTime))
	}

	formatTime(time) {
		let min = Math.floor(time / 60)
		let sec = Math.floor(time % 60)
		if (min < 10) min = '0' + min
		if (sec < 10) sec = '0' + sec
		return `${min}:${sec}`
	}
}
class Load {
	constructor(slot, replace = false) {
		this.slot = slot
		this.instead = replace
		this.dom = null
	}

	template(el) {
		let html = `
    <svg t="1603018131108" class="icon loading load_rotate"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="3289" >
        <path  d="M96 512c0-19.33 15.67-35 35-35s35 15.67 35 35c0 191.09 154.91 346 346 346s346-154.91 346-346-154.91-346-346-346c-19.33 0-35-15.67-35-35s15.67-35 35-35c229.75 0 416 186.25 416 416S741.75 928 512 928 96 741.75 96 512z"
              fill="#73ac00" p-id="3290"></path>
    </svg>
		`
		let dom = document.createElement('div')
		dom.className = 'load_ico'
		$(dom)
			.append(html)
		if (this.instead === true) {
			$(el || this.slot).children().hide()
			$(el || this.slot).append($(dom))
		} else {
			$(el || this.slot)
				.append($(dom))
		}
		this.dom = $(dom)

	}

	render() {
		this.dom.fadeIn()
	}

	remove(el) {
		if (this.instead === true) {
			$(el || this.slot)
				.children()
				.fadeIn()
		}
		this.dom.remove()
	}
}
class Tip {
	constructor() {
		this.color = {
			'waring': '#E6A23C',
			'success': '#67C23A',
			'fail': '#F56C6C'
		}
	}
	template(message, colorType) {
		let html = `
		<div class="tip" style="background-color:${this.color[colorType]} ">
            <span>${message}</span>
		</div>
		`
		$(html).appendTo($('body'))
		setTimeout(() => {
			$('.tip').fadeOut()
		}, 1500)
	}
}
class BtnState {
	constructor(el) {
		this.el = el
		this.html = ``
		this.template()
	}
	template() {
		this.html = `<div class="change_state_btn">
        <svg t="1602743985614" class="icon play" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8616" width="200" height="200"><path d="M512 0C229.216 0 0 229.216 0 512s229.216 512 512 512 512-229.216 512-512S794.784 0 512 0zM512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96s416 186.24 416 416S741.76 928 512 928zM384 288 768 512 384 736z" p-id="8617" fill="#ffffff"></path></svg>
        <svg t="1602744019440" class="icon pause" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="200" height="200"><path d="M512 0C229.216 0 0 229.216 0 512s229.216 512 512 512 512-229.216 512-512S794.784 0 512 0zM512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96s416 186.24 416 416S741.76 928 512 928zM320 320 448 320 448 704 320 704zM576 320 704 320 704 704 576 704z" p-id="8858" fill="#ffffff"></path></svg>
    </div>`
	}
	render() {
		$('.change_state_btn').remove()
		$(this.el).append(this.html)
		$('.play').css('display', 'none')
		$('.pause').css('display', 'block')
	}
	isPlay(audio) {
		if (audio) {
			if (audio.paused) {
				$('.play').css('display', 'block')
				$('.pause').css('display', 'none')
			} else {
				$('.play').css('display', 'none')
				$('.pause').css('display', 'block')
			}
		} else {
			$('.play').css('display', 'block')
			$('.pause').css('display', 'none')
		}
	}
}
class Player {
	constructor(musicData) {
		this.musicData = musicData
		this.btn = new BtnState('.player_left')
		this.$audio = null
		this.duration = null
		this.prev = null
		this.Lyric = null
	}
	playerInit() {
		this.prograss.start()
		$('.play')
			.click(() => {
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
			.click(() => {
				$('#player')
					.slideUp()
			})
	}
	show() {
		$('#player')
			.slideDown()
	}
	createAudio(volume) {
		this.show()
		this.render(volume)
		this.btn.render()
		let audio = document.createElement('audio')
		audio.id = `Player-${new Date().getTime()}`
		audio.src = `${this.musicData.PlayerUrl}`;
		audio.volume = 0.5
		document.body.appendChild(audio)
		this.$audio = document.querySelector('audio')
		$(this.$audio).on('canplaythrough', () => {
			console.log('233');
		})

		$(this.$audio).on('canplay', () => {
			console.log('canplay');
			this.$audio.play()
			this.prograss = new Prograss(audio.duration)
			this.duration = audio.duration
			this.playerInit()
		})
		return audio
	}
	render(volume) {
		let _this = this
		let text = `
 <!--播放器-->
 	<div class="player_left">
 	    <img src="${this.musicData.PicUrl}" alt="" height="100px">
		
	</div>
<!--    右半部分-->
    <div class="player_right">
    	<div class="player_right_top">
    		<div class="player_right_top_quote">
            <span class="song_msg">${this.musicData.songName} - ${this.musicData.singerName}</span>
			<svg t="1603198937683" class="icon volume not_zero" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3383" data-spm-anchor-id="a313x.7781069.0.i10" width="200" height="200">
				<path d="M580.2 907.1c-20.2 0-39.6-6.2-56.2-17.8L308.8 731.8c-11.5-8-25.7-12.5-40.5-12.5h-74.4c-54 0-97.9-43.9-97.9-97.9V402.7c0-54 43.9-97.9 97.9-97.9h74.4c14.8 0 29-4.5 41.1-12.9l214.1-156.7c0.2-0.1 0.4-0.3 0.6-0.4 35.6-24.9 82.6-23.6 116.9 3.3 23.3 18.3 37.3 48 37.3 79.6v589.4c0 28-10.9 54.4-29.8 72.5-18.8 17.7-43 27.5-68.3 27.5zM193.9 375.6c-14.9 0-27.1 12.1-27.1 27.1v218.7c0 14.9 12.1 27.1 27.1 27.1h74.4c29.4 0 57.6 8.9 81.7 25.7l215.3 157.5c4 2.8 9.4 4.5 14.9 4.5 5 0 12.4-1.4 19.3-8 4.9-4.7 7.8-12.6 7.8-21.2V217.6c0-10-3.8-18.9-10.1-23.8-9.7-7.6-22.3-8.1-32.3-1.2L350.6 349.5c-24.7 17.3-52.9 26.2-82.3 26.2h-74.4z" fill="#ffffff" p-id="3384" data-spm-anchor-id="a313x.7781069.0.i9" class=""></path><path d="M837.7 694.9c-6.5 0-13.1-1.8-19-5.5-16.5-10.5-21.4-32.4-10.9-48.9 65.9-103.6 65.9-193.5-0.2-282.9-11.6-15.7-8.3-37.9 7.4-49.6s37.9-8.3 49.6 7.4c83.5 112.9 84.5 235.1 3 363.1-6.7 10.6-18.2 16.4-29.9 16.4zM498.2 618.3c-19.6 0-35.4-15.9-35.4-35.4V441.2c0-19.6 15.9-35.4 35.4-35.4 19.6 0 35.4 15.9 35.4 35.4v141.7c0 19.6-15.8 35.4-35.4 35.4z"  p-id="3385" data-spm-anchor-id="a313x.7781069.0.i6" class="volume_line"></path>
			</svg>
			<input type="range" class="volume_range" min="0" max="1" step="0.01" value="${volume}" >
			<svg t="1603422989871" class="icon op" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1191" width="200" height="200"><path d="M707.584 93.184c-77.312 0-148.992 38.912-196.608 102.912-47.104-64-119.296-102.912-196.608-102.912-139.264 0-252.416 123.904-252.416 275.968 0 90.624 40.448 154.624 73.216 205.824C229.888 723.968 468.48 908.8 478.72 916.48c9.728 7.68 20.992 11.264 32.256 11.264s22.528-3.584 32.256-11.264c10.24-7.68 248.32-193.024 343.552-341.504 32.768-51.2 73.216-115.2 73.216-205.824 0-152.064-113.152-275.968-252.416-275.968zM821.76 573.44c-87.552 122.88-272.896 263.168-282.112 269.824-8.704 6.656-18.944 10.24-28.672 10.24-10.24 0-19.968-3.072-28.672-10.24-9.216-6.656-190.976-148.48-282.112-274.944-29.184-46.08-75.776-103.424-75.776-184.32 0-136.192 75.776-231.936 200.192-231.936 69.12 0 144.384 66.048 186.368 123.392 42.496-57.344 117.248-123.392 186.368-123.392 124.928 0 205.824 95.744 205.824 231.936 0 80.896-51.712 143.872-81.408 189.44z"  p-id="1192"></path></svg>
			<div class="list_group">
				<svg t="1603339918775" class="icon list" viewBox="0 0 1462 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4450" width="200" height="200"><path d="M1389.714286 146.285714H438.857143a73.142857 73.142857 0 1 1 0-146.285714h950.857143a73.142857 73.142857 0 1 1 0 146.285714zM731.428571 585.142857h-292.571428a73.142857 73.142857 0 0 1 0-146.285714h292.571428a73.142857 73.142857 0 0 1 0 146.285714z m658.285715 438.857143H438.857143a73.142857 73.142857 0 0 1 0-146.285714h950.857143a73.142857 73.142857 0 0 1 0 146.285714zM146.285714 146.285714H73.142857a73.142857 73.142857 0 1 1 0-146.285714h73.142857a73.142857 73.142857 0 0 1 0 146.285714z m0 438.857143H73.142857a73.142857 73.142857 0 1 1 0-146.285714h73.142857a73.142857 73.142857 0 0 1 0 146.285714z m0 438.857143H73.142857a73.142857 73.142857 0 1 1 0-146.285714h73.142857a73.142857 73.142857 0 0 1 0 146.285714z" p-id="4451"></path></svg>
				<ul class="list_group_ul">
				</ul>
			</div>
			</div>
			<div class="ico_group">
				<svg t="1603207544491" class="icon expansion" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6545" width="200" height="200">
					<path d="M448 554.666667c-6.4 0-10.666667 2.133333-14.933333 6.4L85.333333 908.8 85.333333 661.333333c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333l0 298.666667c0 12.8 8.533333 21.333333 21.333333 21.333333l298.666667 0c12.8 0 21.333333-8.533333 21.333333-21.333333 0-12.8-8.533333-21.333333-21.333333-21.333333L115.2 938.666667l347.733333-347.733333c4.266667-4.266667 6.4-8.533333 6.4-14.933333C469.333333 563.2 460.8 554.666667 448 554.666667zM960 42.666667 661.333333 42.666667c-12.8 0-21.333333 8.533333-21.333333 21.333333 0 12.8 8.533333 21.333333 21.333333 21.333333l247.466667 0L561.066667 433.066667C556.8 437.333333 554.666667 441.6 554.666667 448c0 12.8 8.533333 21.333333 21.333333 21.333333 6.4 0 10.666667-2.133333 14.933333-6.4L938.666667 115.2 938.666667 362.666667c0 12.8 8.533333 21.333333 21.333333 21.333333s21.333333-8.533333 21.333333-21.333333L981.333333 64C981.333333 51.2 972.8 42.666667 960 42.666667z" p-id="6546" >
				</path>
				</svg>
				<svg t="1603259694775" class="icon withdraw" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4813" width="200" height="200">
					<path d="M448 554.666667 149.333333 554.666667c-12.8 0-21.333333 8.533333-21.333333 21.333333 0 12.8 8.533333 21.333333 21.333333 21.333333l247.466667 0L49.066667 945.066667C44.8 949.333333 42.666667 953.6 42.666667 960c0 12.8 8.533333 21.333333 21.333333 21.333333 6.4 0 10.666667-2.133333 14.933333-6.4L426.666667 627.2 426.666667 874.666667c0 12.8 8.533333 21.333333 21.333333 21.333333s21.333333-8.533333 21.333333-21.333333L469.333333 576C469.333333 563.2 460.8 554.666667 448 554.666667zM981.333333 64c0-12.8-8.533333-21.333333-21.333333-21.333333-6.4 0-10.666667 2.133333-14.933333 6.4L597.333333 396.8 597.333333 149.333333c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333l0 298.666667c0 12.8 8.533333 21.333333 21.333333 21.333333l298.666667 0c12.8 0 21.333333-8.533333 21.333333-21.333333s-8.533333-21.333333-21.333333-21.333333L627.2 426.666667 974.933333 78.933333C979.2 74.666667 981.333333 70.4 981.333333 64z" p-id="4814" class="volume_line"></path>
				</svg>
			</div>

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
		$('.player_prograss')
			.html(text)

		this.prev = volume

		$('.list_group_ul').hide()
		$('.list').click(function () {
			$('.list_group_ul').slideToggle()
		}) //播放列表展示
		$('.volume_range').css('background-size', `${Math.floor(volume * 100)}%`).mouseenter(function () {
			let adjVol = (e) => {
				let vol = e.offsetX <= 0 ? 0 : (e.offsetX >= 100 ? 100 : e.offsetX)
				$(this).val(vol / 100)
				$(this).css('background-size', `${vol}% 100%`)
				_this.$audio.volume = e.offsetX < 1 ? 0 : (e.offsetX >= 100 ? 1 : e.offsetX / 100)
			}
			$(this).mousedown((e) => {
				adjVol(e)
				$(this).mousemove((e) => {
					adjVol(e)
					$(this).mouseup((e) => {
						_this.prev = $(this).val()
						$(this).unbind('mousemove')
					})
				})

			})
			$(this).mouseup((e) => {
				$(this).val(e.offsetX / 100)
				$(this).css('background-size', `${e.offsetX}% 100%`)
				$(this).unbind('mousemove')
			})



		})





		$('.volume').click(function () {
			if (_this.$audio.muted) {
				$('.volume_range').val(_this.prev).css('background-size', `${_this.prev * 100}% 100%`)
			} else {
				$('.volume_range').val(0).css('background-size', `0% 100%`)
			}
			_this.$audio.muted = !_this.$audio.muted
		})

		$('.music_progress').mouseenter(function (e) {
			let width = $(this).width()
			let ofx = e.offsetX <= 0 ? 0 : (e.offsetX >= width ? 100 : e.offsetX)
			let currentPosition = ofx / $(this).width()
			$(this).mousedown(() => {
				console.log(_this.$audio.duration * currentPosition)
				lyric.toScroll(_this.$audio.duration * currentPosition)
				_this.prograss.currentTime = _this.$audio.duration * currentPosition
				_this.$audio.currentTime = _this.$audio.duration * currentPosition
			})
		})

		$('.expansion').click(function () {
			$('#player_all').css('transform', 'translateY(0%)')
			$(this).css('display', 'none').siblings().css('display', 'block')
		})

		$('.withdraw').click(function () {
			$('#player_all').css('transform', 'translateY(95%)')
			$(this).css('display', 'none').siblings().css('display', 'block')
		})
	}
	pause() {
		lyric.stopScroll()
		this.prograss.stop()
		this.$audio
			.pause()
	}
	onPlay() {
		this.prograss.start()
		lyric.startScroll()
		this.$audio
			.play()
	}
	newPlay() {
		let audio = document.querySelector('audio')
		audio.src = `${this.musicData.PlayerUrl}`;
		// audio.autoplay = true
		// audio.loop = true
		this.$audio = document.querySelector('audio')
		// this.$audio.load()
	}
}
class SongList {
	constructor(slot, data, showPic = true) {
		this.slot = slot
		this.data = data
		this.showPic = showPic
		this.songlist = []
	}
	template(imgurl) {
		let html
		if (this.showPic) {
			html = `
<div class="ablum_song">
			<div class="day_top">
                <img height="260px"
                     src="${imgurl}"
                     alt="">
                <div class="day_top_text">
                    <p>${this.data.dissname || this.data.info.title}</p>
                    <p style="${this.data.update ? 'display:block' : 'display:none'}">更新于:${this.data.update}</p>
                </div>
            </div>
            <div class="day_bottom">
                <p>歌曲列表:</p>
                <ul class="ablum_song_list">
						
                </ul>
            </div>
</div>

		`
		} else {
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
	formatTime(time) {
		let min = Math.floor(time / 60)
		let sec = Math.floor(time % 60)
		if (min < 10) min = '0' + min
		if (sec < 10) sec = '0' + sec

		return `${min}:${sec}`
	}
	render() {
		this.songlist = this.data.list || this.data.songlist
		this.songlist.map(item => {
			let time = this.formatTime(item.interval)
			let html = `<li class="song_list" data-songmid="${item.mid || item.songmid}">
				<a>
					<span>
                        ${item.name || item.songname}
                        <span class="song_isvip">${item.pay.payplay ? 'vip' : 'no'}</span>
                        </span>
					
					<span>${item.singerName || item.singer[0].name}</span>
					<span>${time}</span>
				</a>
			</li>`
			$('.ablum_song_list').append(html)

		})
		this.play()
	}
	play() {
		let _this = this
		$('.song_list').on('click', function (e) {
			let load = new Load('', true)
			load.template(this)
			let songmid = e.currentTarget.dataset.songmid
			commonData.playerList = _this.songlist
			commonData.playerListRender(songmid)
			let song = new GetMusicData()
			song.getData(songmid, load, this)

		})

	}

}
class GetMusicData {
	constructor() {
		this.musicData = []
		this.albumid = ''
		this.PlayerUrl = ''
		this.PicUrl = ''
		this.singerName = ''
		this.songName = ''
		this.volume = 0
		this.pay_play = false
		this.loadover = false
		this.playList = []
	}

	getData(songmid, load, el) {
		$.ajax({
			method: "GET",
			url: `${api}` + `song?songmid=${songmid}`,
			dataType: 'json',
			success: res => {
				this.albumid = res.data.track_info.album.mid
				this.PicUrl = this.musicPicUrl(this.albumid)
				this.pay_play = res.data.track_info.pay.pay_play
				this.songName = res.data.track_info.name
				this.singerName = res.data.track_info.singer[0].name
				this.volume = res.data.track_info.volume.peak
				this.musicPlayUrl(songmid, el)
				if (load) {
					load.remove(el)
				}
			}
		})
	}

	musicPlayUrl(songmid) {
		let load_ico = $('.load_ico')
		$.ajax({
			method: "GET",
			url: api +
				`song/url?id=${songmid}`,
			"headers": {
				"Content-Range": "bytes=0--1,-1",
				"Content-Type": "audio/mpeg"
			},
			success: res => {
				if (res.result === 400) {
					let tip = new Tip()
					tip.template(`${res.errMsg}`, 'fail')
					load_ico.hide()
					return
				}
				$('audio').remove()
				this.PlayerUrl = res.data

				let player = new Player(this)
				player.createAudio(0.5)
				lyric.template()
				lyric.getLyric(songmid)
				commonData.playerListRender(songmid)
				load_ico.hide()
			}
		})

	}

	musicPicUrl(albumid) {
		return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumid}.jpg`
	}

}
class CommonData {
	constructor() {
		this.playerList = []
		this.index = 0
		this.maxlength = 0
		this.end = false
	}
	playerListRender(songmid) {
		let _this = this
		let audio = document.querySelector('audio')
		this.maxlength = this.playerList.length
		this.playerList.map(item => {
			let html = `<li class="player_list" data-songmid="${item.mid || item.songmid}" >${item.name || item.songname}</li>`
			let ul = $('.list_group_ul')
			ul.append(html)
		})
		$(`.list_group_ul>li[data-songmid=${songmid}]`).addClass('inplay')
		$('.list_group_ul>li').click(function (e) {
			$(audio).remove()
			GetMusicData.prototype.getData(e.target.dataset.songmid, null, lyric)
			_this.index = $(this).index()
		})
		$(audio)
			.on('ended', () => {
				this.index += 1
				if (commonData.index > commonData.maxlength - 1) {
					commonData.index = 0
				}
				GetMusicData.prototype.getData($('.list_group_ul>li')[commonData.index].dataset.songmid, null, lyric)
			})


	}
}


export const lyric = new Lyric()
export const tip = new Tip();
export const btnState = (slot) => new BtnState(slot)
export const prograss = (duration) => new Prograss(duration)
export const load = (slot, replace = false) => new Load(slot, replace)
export const player = (musicData) => new Player(musicData)
export const songList = (slot, data, showPic = true) => new SongList(slot, data, showPic)
export const getMusicData = new GetMusicData()
export const commonData = new CommonData()

export const init = () => {
	$('.cookie_form').hide()

	$(function () {
		let cookie = new SetCookie()
		$.ajax({
			method: 'GET',
			url: `${api}user/cookie`,
			success: res => {
				console.log(res);
				let qm_keyst = res.data.userCookie.qm_keyst
				let uin = res.data.userCookie.uin
				if (qm_keyst === undefined || uin === undefined) {
					tip.template('欢迎━(*｀∀´*)ノ亻! Cookie未设置', 'waring')
					cookie.init()
				} else {
					tip.template('欢迎━(*｀∀´*)ノ亻! Cookie获取成功', 'success')
					$('.set_cookie').css({ 'background-color': `#E6A23C` }).text('清除cookie').click(() => {
						cookie.deleteCookie()
					})
				}
				$('#player')
					.hide()
				let tab = new Tab('.nav_ul>li')
				tab.activeLi()
				tab.getCookie()
				let search = new Search('.main')
				search.init()
			}
		})
	})
};
export const api = `http://localhost:3333/`
// export const api = `http://alivemusic.dreamsakula.top:3300/`







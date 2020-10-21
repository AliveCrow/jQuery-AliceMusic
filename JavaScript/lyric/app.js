import $ from '../jquery-3.5.1.min'

export  class Lyric{
	constructor() {
		this.player = $('#player')
		this.currentTime = 0
		this.index = 0
		this.lyric = ''
		this.$audio = document.querySelector('audio')
		this.intervalId
	}

	template(){
		$('#player_all').remove()
		let html =`
    <div id="player_all" >
        <div class="lyric_box">
        </div>
    </div>
		`
		this.player.append(html)
	}


	getLyric(songmid){
		let _this = this
		var settings = {
			"url": `http://localhost:3300/lyric?songmid=${songmid}`,
			"method": "GET",
		};

		$.ajax(settings).done(function (response) {
			let lyric = response.data.lyric
			lyric = lyric.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)
			_this.resetScroll(lyric)
			_this.lyric = lyric
			let html = lyric.map(item=>{
				return `<div class="player-lyrics-line">${item.slice(10)}</div>`
			}).join("")
			$('.lyric_box').append(html)

			_this.startScroll()

		});
	}

	lyricTime(lyric){
		return lyric.replace(/^\[(\d{2}):(\d{2}).*/,(match, p1, p2) => 60 * (+p1) + (+p2))
	}


	scrollLyric(){
		let _this = this
		_this.currentTime = Math.round(_this.$audio? _this.$audio.currentTime : _this.currentTime+1)
		if (_this.index === _this.lyric.length - 1) return
		for(let i =0;i < _this.lyric.length;i++){
			if(_this.lyricTime(_this.lyric[i]) <= _this.currentTime && (!_this.lyric[i+1] || this.lyricTime(_this.lyric[i+1])>=_this.currentTime)){
				let lt = $ ('.player-lyrics-line')
				$(lt[_this.index]).removeClass('inactive')
				$(lt[i]).addClass('inactive')
				_this.index = i
				break
			}

		}
		console.log (_this.index)
		if(_this.index>2){
			let y = -(_this.index-2)*60
			$ ('.player-lyrics-line').css('transform',`translateY(${y}px)`)
		}
	}

	startScroll() {
		this.stopScroll()
		this.intervalId = setInterval(
			this.scrollLyric.bind(this)
		, 900)
	}
	stopScroll() {
		clearInterval(this.intervalId)
	}


	resetScroll(text){
		let _this= this
		this.stopScroll()
		this.currentTime = 0
		this.index = 0
		$ ('.player-lyrics-line').css('transform',`translateY(0px)`)
		let $active = $('.inactive')
		if ($active) {
			$active.removeClass('inactive')
		}
	}

	toScroll(currentTime){
		this.currentTime = currentTime

	}

	restart() {
		this.resetScroll()
		this.startScroll()
	}

}
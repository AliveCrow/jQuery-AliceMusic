import $ from './jquery-3.5.1.min'


export class Prograss {
	constructor(duration, currentTime) {
		this.nowTime =   0
		this.duration = duration || 0
		this.prograss = 0
		this.prograss_blue = document.querySelector('.prograss_blue')
		this.MusicValue = document.querySelector('.music_progress')
		this.played_time = document.querySelector('.played_time')
		this.alltime = document.querySelector('.duration')
		this.intervalId
		this.currentTime = currentTime || 0
		this.$audio = document.querySelector ('audio')
		this.alltime.innerHTML =this.formatTime(this.duration)
	}

	start(startTime) {
		this.stop()
		this.intervalId=setInterval(()=>{
			this.update()
		},10)
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
		this.currentTime = 0
		this.MusicValue.setAttribute('value',`0`)
		this.played_time.innerHTML = this.formatTime(this.nowTime)
		if (duration) {
			this.duration = +duration
			this.alltime.innerHTML =this.formatTime(this.duration)
		}
	}

	update() {
		this.prograss =  this.$audio.currentTime / this.duration
		this.MusicValue.setAttribute('value',`${this.prograss*100}`)
		this.MusicValue.style.backgroundSize = `${this.prograss*100}% 100%`
		this.played_time.innerHTML =this.formatTime(this.$audio.currentTime)
	}

	newUpdate(startTime){
		if (startTime >= this.duration) this.reset()
		this.prograss = startTime / this.duration
		this.MusicValue.setAttribute('value',`${this.prograss*100}`)
		this.MusicValue.style.backgroundSize = `${this.prograss*100}% 100%`
		this.played_time.innerHTML =this.formatTime(this.nowTime)
		this.alltime.innerHTML =this.formatTime(this.duration)
	}

	newStart(startTime){
		this.reset()
		let sT= startTime
		setInterval(()=>{
			sT+=0.01
			this.newStart(sT)
		},10)

	}

	formatTime(time) {
		let min = Math.floor(time / 60)
		let sec = Math.floor(time % 60)
		if (min < 10) min = '0' + min
		if (sec < 10) sec = '0' + sec
		return `${min}:${sec}`
	}

}
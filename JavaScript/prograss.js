import $ from './jquery-3.5.1.min'


export class Prograss {
	constructor(duration, intervalId) {
		this.nowTime = 0
		this.duration = duration || 0
		this.prograss = 0
		this.prograss_blue = document.querySelector('.prograss_blue')
		this.played_time = document.querySelector('.played_time')
		this.alltime = document.querySelector('.duration')
		this.intervalId = intervalId
	}

	start() {
		this.stop()
		this.intervalId=setInterval(this.update.bind(this),50)
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
		this.prograss_blue.style.transform = `translateX(-100%)`
		this.played_time.innerHTML = this.formatTime(this.nowTime)
		if (duration) {
			this.duration = +duration
			this.alltime.innerHTML =this.formatTime(this.duration)
		}
	}

	update() {
		this.nowTime += 0.05
		if (this.nowTime >= this.duration) this.reset()
		this.prograss = this.nowTime / this.duration
		this.prograss_blue.style.transform = `translateX(${this.prograss * 100 - 100}%)`
		// $('.played_time').text(this.formatTime(this.nowTime))
		// $('.duration').text(this.formatTime(this.duration))
		this.played_time.innerHTML =this.formatTime(this.nowTime)
		this.alltime.innerHTML =this.formatTime(this.duration)
	}

	formatTime(time) {
		let min = Math.floor(time / 60)
		let sec = Math.floor(time % 60)
		if (min < 10) min = '0' + min
		if (sec < 10) sec = '0' + sec
		return `${min}:${sec}`
	}

}
import {api, load, songList} from "../component/app";


export class DayRec{
	constructor(el) {
		this.el =el
		this.load= load(this.el , true)
		this.load.template()
	}

	render(){
		this.getData()
	}

	getData(){
		let _this = this
		var settings = {
			"url": `${api}recommend/daily`,
			"method": "GET",
		};

		$.ajax(settings).done(function (res) {
			_this.load.remove()
			let dayRec = songList('.day_rec',res.data,true)
			dayRec.template(res.data.logo)
		});
	}
}
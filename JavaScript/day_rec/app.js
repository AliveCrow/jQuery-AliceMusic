import {Load,SongList} from "../component/app";


export class DayRec{
	constructor(el) {
		this.el =el
		this.load= new Load(this.el , true)
		this.load.template()
	}

	render(){
		this.getData()
	}

	getData(){
		let _this = this
		var settings = {
			"url": "http://localhost:3300/recommend/daily",
			"method": "GET",
		};

		$.ajax(settings).done(function (res) {
			_this.load.remove()
			let dayRec = new SongList('.day_rec',res.data,true)
			dayRec.template(res.data.logo)
		});
	}
}
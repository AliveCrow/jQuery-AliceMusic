import {load, songList, getMusicData} from "../component/app";

export class RenderRank {
	constructor(slot) {//el要插入的元素
		this.slot = slot
		this.count = 0
		this.amblumSongList = []
		this.data = []
		this.initTime = null
		this.load= load(slot, true)
		this.load.template()
		this.SongList
	}

	init() {
		$.ajax ({
			method: 'GET',
			url: 'http://localhost:3300' + '/top/category?showDetail=1',
			dataType: 'json',
			success: (res) => {
				this.initTime = res.result
				if (this.initTime === 100) {
					this.load.remove ()
				}
				res.data.forEach (item => {
					item.list.slice (0, 2)
						.forEach (it => {
							this.data.push (it)
						})
				})
				//渲染页面内容
				this.renderHtml ()
			}
		})
	}

	renderHtml() {
		let a = this.data.map ((item, index) => {
			return `
	 <li class="rank_li_1" data-id="${item.topId}"  style="background-image:url(${item.picUrl})">
        <div class="rank_title rank_li_bgimg">
            <a class="dct" data-topId="${item.topId}" data-imgurl="${item.picUrl}"   data-content="更新于:${item.updateTime}"> ${item.label}</a>
            <ul class="rank_ul_2">
                <li class="rank_li_2">
                    <a class="ablum_songmid" data-topId="${item.topId}" data-rank="${item.song[0].rank}">
                        <span>${item.song[0].title}</span>
                        <span>${item.song[0].singerName}</span>
                    </a>
                </li>
                <li  class="rank_li_2">
                    <a class="ablum_songmid" data-topId="${item.topId}" data-rank="${item.song[1].rank}">
                        <span>${item.song[1].title}</span>
                        <span>${item.song[1].singerName}</span>
                    </a>
                </li>
                <li class="rank_li_2">
                    <a class="ablum_songmid" data-topId="${item.topId}" data-rank="${item.song[2].rank}">
                        <span>${item.song[2].title}</span>
                        <span>${item.song[2].singerName}</span>
                    </a>
                </li>
            </ul>
        </div>
    </li>
		`
		})
			.join ('')
		$ (this.slot)
			.append (a)
		this.unfold()
	}

	unfold() {
		let _this = this
		$ ('.ablum_songmid')
			.on ('click', function (e) {
				let ablumId = _this.getAmblumId (e)
				_this.getSongMid(ablumId.topid,ablumId.rank)
			})
		$('.dct').on ('click', function (e) {
			$('.rank_ul_1').css('display','none')
			let  topid= e.target.dataset.topid
			let imgurl = e.target.dataset.imgurl
			 _this.load = load('.rank', true)
			_this.load.template()
			_this.getSongMid(topid,null,imgurl)
		})
	}

	getAmblumId(e) {
		return e.currentTarget.dataset
	}

	getSongMid(amblumId,rank,imgurl){
		$.ajax({
			method:'GET',
			url:`http://localhost:3300/top?id=${amblumId}&pageSize=10`,
			success:res=>{
				if(rank){
					let songmid = res.data.list[rank-1].mid
					this.play(songmid)
				}else {
					this.amblumSongList = res.data
					this.SongList = songList('.rank',this.amblumSongList,this.data)
					this.SongList.template(imgurl)
					$('.rank>.load_ico').fadeOut()
				}

			}
		})
	}

	play(songmid){
		let song = getMusicData
		song.getData(songmid)
	}





}
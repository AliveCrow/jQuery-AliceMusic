import {load, tip, songList} from "../component/app";

export class Mymusic{
	constructor(header,body) {
		this.header = header
		this.body = body
		this.qq =''
		this.headerload= load(this.header , true)
		this.headerload.template()
		this.bodyload =load('.my_music_songlist' , false)
		this.bodyload.template()
		this.data={
			'nickname':'',
			'headpic':'',
			'lvinfo':'',
			'mymusicid':0,
			'mydissnum':0,
			'mydisslist':'',
			'dissid':0,
			'list':''
		}
		this.Tip = tip
		this.getCookie()

	}
		renderHeader(){
			let header = `
            <img src="${this.data.headpic}" alt="">
            <div class="vip_container">
                <span >${this.data.nickname}</span>
                <svg t="1603109300551" style=" ${this.data.lvinfo===0?'display:none':'display:block'}" class="icon is_vip" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     p-id="3757" width="200" height="200">
                    <path d="M886.4 403.2l-35.2 38.4-3.2 3.2-32 32-48 51.2-182.4 16-44.8 3.2-35.2 3.2-41.6 3.2-156.8 12.8L188.8 448l-6.4-6.4-35.2-38.4 169.6-185.6H704l182.4 185.6z"
                          fill="#FFFFFF" p-id="3758"></path>
                    <path d="M816 476.8L768 528l-246.4 288L188.8 448c41.6-16 131.2-48 220.8-38.4 16 0 32 3.2 44.8 6.4 28.8 6.4 60.8 19.2 89.6 35.2 6.4 3.2 16 9.6 22.4 12.8 12.8 6.4 25.6 12.8 38.4 16 83.2 32 163.2 16 211.2-3.2z"
                          fill="#0DE28B" p-id="3759"></path>
                    <path d="M720 176H297.6l-208 230.4 64 64 371.2 380.8 355.2-377.6 3.2-3.2 60.8-67.2-224-227.2z m96 300.8l-294.4 313.6L188.8 448l-41.6-44.8 169.6-185.6H704l182.4 188.8-70.4 70.4z"
                          fill="#044236" p-id="3760"></path>
                    <path d="M505.6 678.4L361.6 268.8l41.6-12.8 121.6 348.8L630.4 256l38.4 12.8L544 678.4z" fill="#044236"
                          p-id="3761"></path>
                </svg>
            </div>
			`
			$(this.header).html(header)
			this.headerload.remove()
		}
		renderMymusic(){
			this.SongList = songList(this.body,this.data,false)
			this.SongList.template(this.data.headpic)
		}
		renderDiss(){
			//my_music_songlist
			let html = `
				<div class="diss_list">
					<ul>
					</ul>
				</div>
			`
			$('.my_music_songlist').append(html)
			this.showDiss()
		}
		render(){
			this.renderDiss()
			$('.diss_list').hide()
		let _this = this
			$('.mymusic_header_ul>li').on('click',function (e){
				$(this).addClass('active').siblings().removeClass('active')
				if($(e.currentTarget).hasClass('my_like active') ){
					$('.my_music_songlist_ul').fadeIn()
					$('.diss_list').fadeOut()
				}else if($(e.currentTarget).hasClass('my_diss active')){
					$('.my_music_songlist_ul').fadeOut()
					$('.diss_list').fadeIn()
					$('.diss_list>ul>li').on('click',function (e){
						let dissid = e.currentTarget.dataset.dissid
						_this.getMyDiss(dissid)
					})
				}
			})
		}
		getCookie(){
			$.ajax({
				method:'GET',
				url:`http://localhost:3300/user/cookie`,
				success:res=>{
					this.qq = res.data.userCookie.uin
					if(!this.qq){
						this.Tip.template('还没有设置cookie(⊙o⊙)…','waring')

						return
					}
					this.getDetail()
				}
			})
		}
		getDetail(){
		$.ajax({
			method:'GET',
			url:`http://localhost:3300/user/detail?id=${this.qq}`,
			success:res=>{
				this.data={
					'nickname':res.data.creator.nick,
					'headpic':'https://'+res.data.creator.headpic.slice(5),
					'lvinfo':res.data.creator.lvinfo[0].lvinfo_bykey.url_params.length,
					'mymusicid': res.data.mymusic[0].id,
					'mydissnum':res.data.mydiss.num,
					'mydisslist':res.data.mydiss.list, //dissid picurl title  subtitle
				}
				this.renderHeader()
				this.getMymusic()
				this.render()
			}
		})
		}
		getMymusic(){
			$.ajax({
				method:'GET',
				url:`http://localhost:3300/songlist?id=${this.data.mymusicid}`,
				success:res=>{
					this.data.list = res.data.songlist
					this.bodyload.remove()
					this.renderMymusic()
				}
			})
		}
		getMyDiss(dissid){
			$.ajax({
				method:'GET',
				url:`http://localhost:3300/songlist?id=${dissid}`,
				success:res=>{
					$('.my_music').children().remove()
					let ablist = songList('.my_music',res.data,true)
					ablist.template(res.data.logo)
				}
			})
		}
		showDiss(){
		let _this = this
			this.data.mydisslist.map(item=>{
				//"http://y.gtimg.cn/music/photo_new/T002R150x150M000000fQplQ3rXsxG.jpg?n=1" id
				let html = `
					<li data-dissid="${item.dissid}" data-dissid="${item.dissid}">
						<img src="${item.picurl}" alt="">
						<span>${item.title}</span>
					</li>
				`
				$('.diss_list>ul').append(html)
			})

		}
}
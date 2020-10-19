import $ from './jquery-3.5.1.min'
import {ImgSlider} from "./imgSlider";
import {SongSlider} from "./songSlider";
import {RenderRank} from "./rank/app";
import {Mymusic} from './my_music/app'

export class Tab {
	constructor(selector) {
		this.selector = selector
		this.index = 0
		this.clickTab = 'home'
		this.currentTab = 'home'
		this.prevTab = null
		this.showPage = 'home'
		this.root = $ (`.home`)
		this.slider = new ImgSlider ('.slider_ul', '.slider_ul li')
		this.songSlider = new SongSlider ('.song_area_ul', '.song_list_ul')
	}

	activeLi() {
		this.renderHtml (this.currentTab)
		this.renderJs ()
		let _this = this
		$ (_this.selector)
			.click (function (e) {
				console.log (_this.currentTab, _this.prevTab, _this.clickTab)
				if ($ ('.search').length !== 0) {
					$ ('.search')
						.remove ()
					_this.renderHtml (_this.clickTab)
					_this.renderJs.call (_this)
				}
				$ (this)
					.addClass ('active')
					.siblings ()
					.removeClass ('active');
				//页面初始化
				_this.clickTab = $ (this)
					.data ().tab
				if (_this.clickTab === _this.currentTab) {
					_this.showPage = _this.clickTab
					_this.prevTab = _this.clickTab
				} else {
					_this.showPage = _this.clickTab
					_this.prevTab = _this.currentTab
					_this.currentTab = _this.showPage
				}

				if (_this.prevTab !== _this.currentTab && $ (this)
					.data ().tab !== _this.prevTab) {
					$ ('.main')
						.children ()
						.remove ()
					_this.renderHtml (_this.showPage)
					_this.renderJs.call (_this)
				} else {
					console.log ('no render')
				}

			})

	}


	renderJs() {
		this.slider.render ()
		this.songSlider.decideArea ()
	}

	renderHtml(type) {
		let text
		switch (type) {
			case 'home':
				text = `    
            <section data-tab="home" class="home">        
	            <!--  轮播图-->
	            <section class="slider">
	                <div class="slider_move">
	                    <ul class="clearfix slider_ul">
	                    
	                    </ul>
	                </div>
	            </section>
	            <!--        新歌推荐-->
	            <section class="new_song_recommend">
	                <div class="new_song_recommend_bg"></div>
	                <div class="new_song_leave">
	                    <h2>新歌推荐</h2>
	                    <div class="song_area">
	                        <ul class="clearfix song_area_ul">
	                            <li class="active "><a>最新</a></li>
	                            <li><a>内地</a></li>
	                            <li><a>港台</a></li>
	                            <li><a>欧美</a></li>
	                            <li><a>韩国</a></li>
	                            <li><a>日本</a></li>
	                        </ul>
	                    </div>
	                    <div class="song_list">
	                        <ul class="song_list_ul">
	                        </ul>
	                    </div>
	                </div>
	            </section>
			</section>
			`
				$ (text)
					.appendTo (`.main`)
				break

			case 'my_music':
				text = `
<section data-tab="my_music" class="my_music">
    <div class="mymusic_header">
        <div class="avatar">

        </div>
        <ul class="mymusic_header_ul">
            <li class="active my_like">我喜欢</li>
            <li class="my_diss">创建的歌单</li>
        </ul>
    </div>
    <div class="my_music_songlist">
        <ul class="my_music_songlist_ul">
        </ul>
    </div>
</section>
			`
				$ (text)
					.appendTo (`.main`)

				new Mymusic('.avatar','.my_music_songlist_ul')

				break

			case 'day_rec':
				text = `
        <section  data-tab="day_rec"  class="day_rec">
			<div class="day_top">
                <img height="260px"
                     src="http://qpic.y.qq.com/music_cover/jZUIYmdjpMC7X21oEkkTzIoKMm3e5hqNN7oVdCib9TPH7jkhiaPhQA8A/300?n=1"
                     alt="">
                <div class="day_top_text">
                    <p>每日推荐</p>
                    <p>cookie未设置</p>
                </div>
            </div>
            <div class="day_bottom">
                <p>歌曲列表:</p>
                <ul>
                    <li><a>
                        <span>个人名</span>
                        <span>作者</span>
                        <span>时长</span>
                    </a></li>
                    <li><a>
                        <span>个人名</span>
                        <span>作者</span>
                        <span>时长</span>
                    </a></li>
                    <li><a>
                        <span>个人名</span>
                        <span>作者</span>
                        <span>时长</span>
                    </a></li>
                    <li><a>
                        <span>个人名</span>
                        <span>作者</span>
                        <span>时长</span>
                    </a></li>
                    <li><a>
                        <span>个人名</span>
                        <span>作者</span>
                        <span>时长</span>
                    </a></li>
                    <li><a>
                        <span>个人名</span>
                        <span>作者</span>
                        <span>时长</span>
                    </a></li>
                </ul>
            </div>
		</section>
			`
				$ (text)
					.appendTo (`.main`)
				break

			case 'rank':
				text = `
			      <section  data-tab="rank"  class="rank">
						<ul class="rank_ul_1">
						               
			            </ul>
				  </section>
					`
				$ (text)
					.appendTo (`.main`)

				let renderRank = new RenderRank ('.rank_ul_1')
				renderRank.init ()

				break
			default:
				break
		}
		// return
	}


}
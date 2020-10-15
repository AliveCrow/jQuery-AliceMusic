
import $ from './jquery-3.5.1.min'

import {Tab} from './tab'
import {ImgSlider} from './imgSlider'
import {SongSlider} from "./songSlider";


$('#player').hide()
let tab = new Tab('.nav_ul li')
tab.activeLi()

let slider = new ImgSlider('.slider_ul','.slider_ul li')
slider.scroll()

let songSlider = new SongSlider('.song_area_ul','.song_list_ul')
songSlider.render()
songSlider.init()






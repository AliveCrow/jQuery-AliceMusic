import $ from './jquery-3.5.1.min'

import {Tab} from './tab'
import  {Search} from './search/app'



$ ('#player')
	.hide ()
let tab = new Tab ('.nav_ul>li')
tab.activeLi ()

let search = new Search('.main')
search.init()




// window.alert= (ad) => {
// 	let dom = document.createElement ('div')
// 	dom.id = 'alert'
// 	let template = `
// 		<div  style="opacity:.8; position:absolute;z-index:999;top: 54px;left: 50%;transform:translateX(-50%);background-color: #73ac00;color: #f3f3f3;padding:10px 30px;border-radius:3px; ">${ad}</div>
// 	`
// 	dom.innerHTML = template
// 	document.body.appendChild (dom)
// 	setTimeout(()=>{
// 		$('#alert').fadeOut()
// 	},2000)
// }
//
// window.alert('dsa')

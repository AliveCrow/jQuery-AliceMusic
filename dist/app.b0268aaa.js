// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"JavaScript/home/imgSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImgSlider = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ImgSlider = /*#__PURE__*/function () {
  function ImgSlider(container, selector) {
    _classCallCheck(this, ImgSlider);

    this.container = container;
    this.selector = selector;
    this.index = 0;
    this.intervalId = null;
  }

  _createClass(ImgSlider, [{
    key: "sliderInit",
    value: function sliderInit() {
      var _this = this;

      this.stop();
      this.index = 0;
      var first = $(this.selector).first();
      var last = $(this.selector).last();
      first.clone().insertAfter(last);
      last.clone().insertBefore(first);
      this.length = $(this.selector).length;
      $(this.container).css('width', "".concat(this.length * 1200, "px"), 'left', "-1200px");
      this.setTimer();
      $(this.container).mouseenter(function () {
        _this.stop();
      }).mouseleave(function () {
        _this.setTimer();
      });
    }
  }, {
    key: "setTimer",
    value: function setTimer() {
      var _this2 = this;

      this.stop();
      this.intervalId = setInterval(function () {
        _this2.scroll();
      }, 2000);
    }
  }, {
    key: "scroll",
    value: function scroll(keyframes, options) {
      if (this.index < this.length - 1) {
        this.index += 1;
        $(this.container).animate({
          left: "".concat(-1200 * this.index, "px")
        }, "2000");
      } else {
        this.index = 1;
        $(this.container).css('left', '-1200px');
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.intervalId);
    }
  }, {
    key: "template",
    value: function template(picUrl, h5Url) {
      var text = "<a target=\"-_blank\"  href='".concat(h5Url, "'><img src='").concat(picUrl, "' alt=\"\" ></a>");
      var liDom = document.createElement('li');
      liDom.className = 'slider_ul_li';
      $(text).appendTo(liDom);
      return liDom;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      $.ajax({
        method: "GET",
        url: 'http://localhost:3300' + '/recommend/banner',
        success: function success(res) {
          for (var i = 0; i < res.data.length; i++) {
            $(_this3.template(res.data[i].picUrl, res.data[i].h5Url)).appendTo($(_this3.container));
          }

          _this3.sliderInit();
        }
      });
    }
  }]);

  return ImgSlider;
}();

exports.ImgSlider = ImgSlider;
},{}],"JavaScript/component/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tip = exports.lyric = exports.GetMusicData = exports.SongList = exports.Player = exports.BtnState = exports.Tip = exports.Load = exports.Prograss = exports.Lyric = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Lyric = /*#__PURE__*/function () {
  function Lyric() {
    _classCallCheck(this, Lyric);

    this.player = $('#player');
    this.currentTime = 0;
    this.index = 0;
    this.lyric = '';
    this.$audio = document.querySelector('audio');
    this.intervalId = null;
  } //歌词渲染


  _createClass(Lyric, [{
    key: "template",
    value: function template() {
      $('#player_all').remove();
      var html = "<div id=\"player_all\" >\n\t\t\t\t        <div class=\"lyric_box\">\n\t\t\t\t        </div>\n\t\t\t         </div>";
      this.player.append(html);
    }
  }, {
    key: "getLyric",
    value: function getLyric(songmid) {
      var _this = this;

      var settings = {
        "url": "http://localhost:3300/lyric?songmid=".concat(songmid),
        "method": "GET"
      };
      $.ajax(settings).done(function (response) {
        var lyric = response.data.lyric;
        lyric = lyric.match(/^\[\d{2}:\d{2}.\d{2}](.+)$/gm);

        _this.resetScroll(lyric);

        _this.lyric = lyric;
        var html = lyric.map(function (item) {
          return "<div class=\"player-lyrics-line\">".concat(item.slice(10), "</div>");
        }).join("");
        $('.lyric_box').append(html);

        _this.startScroll();
      });
    } //歌词滚动

  }, {
    key: "lyricTime",
    value: function lyricTime(lyric) {
      return lyric.replace(/^\[(\d{2}):(\d{2}).*/, function (match, p1, p2) {
        return 60 * +p1 + +p2;
      });
    }
  }, {
    key: "scrollLyric",
    value: function scrollLyric() {
      var _this = this;

      _this.currentTime = Math.round(_this.$audio ? _this.$audio.currentTime : _this.currentTime + 1); // if (_this.index >= _this.lyric.length) {
      // 	console.log ('结束了?')
      // 	return
      // }

      for (var i = 0; i < _this.lyric.length; i++) {
        if (_this.lyricTime(_this.lyric[i]) <= _this.currentTime && (!_this.lyric[i + 1] || this.lyricTime(_this.lyric[i + 1]) >= _this.currentTime)) {
          var lt = $('.player-lyrics-line');
          $(lt[_this.index]).removeClass('inactive');
          $(lt[i]).addClass('inactive');
          _this.index = i;
          break;
        }
      }

      if (_this.index > 2) {
        var y = -(_this.index - 2) * 60;
        $('.player-lyrics-line').css('transform', "translateY(".concat(y, "px)"));
      }
    }
  }, {
    key: "startScroll",
    value: function startScroll() {
      this.stopScroll();
      this.intervalId = setInterval(this.scrollLyric.bind(this), 1000);
    }
  }, {
    key: "stopScroll",
    value: function stopScroll() {
      clearInterval(this.intervalId);
    }
  }, {
    key: "resetScroll",
    value: function resetScroll() {
      this.stopScroll();
      this.currentTime = 0;
      this.index = 0;
      $('.player-lyrics-line').css('transform', "translateY(0px)");
      var $active = $('.inactive');

      if ($active) {
        $active.removeClass('inactive');
      }
    }
  }, {
    key: "toScroll",
    value: function toScroll(currentTime) {
      this.currentTime = currentTime;
    }
  }, {
    key: "restart",
    value: function restart() {
      this.resetScroll();
      this.startScroll();
    }
  }]);

  return Lyric;
}();

exports.Lyric = Lyric;

var Prograss = /*#__PURE__*/function () {
  function Prograss(duration) {
    _classCallCheck(this, Prograss);

    this.nowTime = 0;
    this.duration = duration || 0;
    this.prograss = 0;
    this.intervalId = null;
    this.$progressRate = $('.music_progress');
    this.$playedTime = $('.played_time');
    this.$allTime = $('.duration');
    this.$audio = document.querySelector('audio');
    this.$allTime.html(this.formatTime(this.duration));
  }

  _createClass(Prograss, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.stop();
      this.intervalId = setInterval(function () {
        _this2.update();
      }, 10);
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.intervalId);
    }
  }, {
    key: "restart",
    value: function restart() {
      this.reset();
      this.start();
    }
  }, {
    key: "reset",
    value: function reset(duration) {
      this.stop();
      this.nowTime = 0;
      this.prograss = 0;
      this.$progressRate.attr('value', '0');
      this.$playedTime.html(this.formatTime(this.$audio.currentTime));

      if (duration) {
        this.duration = +duration;
        this.$allTime.html(this.formatTime(this.duration));
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.prograss = this.$audio.currentTime / this.duration;
      this.$progressRate.attr('value', "".concat(this.prograss * 100));
      this.$progressRate.css('background-size', "".concat(this.prograss * 100, "% 100%"));
      this.$playedTime.html(this.formatTime(this.$audio.currentTime));
    }
  }, {
    key: "formatTime",
    value: function formatTime(time) {
      var min = Math.floor(time / 60);
      var sec = Math.floor(time % 60);
      if (min < 10) min = '0' + min;
      if (sec < 10) sec = '0' + sec;
      return "".concat(min, ":").concat(sec);
    }
  }]);

  return Prograss;
}();

exports.Prograss = Prograss;

var Load = /*#__PURE__*/function () {
  function Load(slot) {
    var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Load);

    this.slot = slot;
    this.instead = replace;
    this.dom = null;
  }

  _createClass(Load, [{
    key: "template",
    value: function template(el) {
      var html = "\n    <svg t=\"1603018131108\" class=\"icon loading load_rotate\"  viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n         p-id=\"3289\" >\n        <path  d=\"M96 512c0-19.33 15.67-35 35-35s35 15.67 35 35c0 191.09 154.91 346 346 346s346-154.91 346-346-154.91-346-346-346c-19.33 0-35-15.67-35-35s15.67-35 35-35c229.75 0 416 186.25 416 416S741.75 928 512 928 96 741.75 96 512z\"\n              fill=\"#73ac00\" p-id=\"3290\"></path>\n    </svg>\n\t\t";
      var dom = document.createElement('div');
      dom.className = 'load_ico';
      $(dom).append(html);

      if (this.instead === true) {
        $(el || this.slot).children().hide();
        $(el || this.slot).append($(dom));
      } else {
        $(el || this.slot).append($(dom));
      }

      this.dom = $(dom);
    }
  }, {
    key: "render",
    value: function render() {
      this.dom.fadeIn();
    }
  }, {
    key: "remove",
    value: function remove(el) {
      if (this.instead === true) {
        $(el || this.slot).children().fadeIn();
      }

      this.dom.remove();
    }
  }]);

  return Load;
}();

exports.Load = Load;

var Tip = /*#__PURE__*/function () {
  function Tip() {
    _classCallCheck(this, Tip);

    this.color = {
      'waring': '#E6A23C',
      'success': '#67C23A',
      'fail': '#F56C6C'
    };
  }

  _createClass(Tip, [{
    key: "template",
    value: function template(message, colorType) {
      var html = "\n\t\t<div class=\"tip\" style=\"background-color:".concat(this.color[colorType], " \">\n            <span>").concat(message, "</span>\n\t\t</div>\n\t\t");
      $(html).appendTo($('body'));
      setTimeout(function () {
        $('.tip').fadeOut();
      }, 1500);
    }
  }]);

  return Tip;
}();

exports.Tip = Tip;

var BtnState = /*#__PURE__*/function () {
  function BtnState(el) {
    _classCallCheck(this, BtnState);

    this.el = el;
    this.html = "";
    this.template();
  }

  _createClass(BtnState, [{
    key: "template",
    value: function template() {
      this.html = "<div class=\"change_state_btn\">\n        <svg t=\"1602743985614\" class=\"icon play\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"8616\" width=\"200\" height=\"200\"><path d=\"M512 0C229.216 0 0 229.216 0 512s229.216 512 512 512 512-229.216 512-512S794.784 0 512 0zM512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96s416 186.24 416 416S741.76 928 512 928zM384 288 768 512 384 736z\" p-id=\"8617\" fill=\"#ffffff\"></path></svg>\n        <svg t=\"1602744019440\" class=\"icon pause\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"8857\" width=\"200\" height=\"200\"><path d=\"M512 0C229.216 0 0 229.216 0 512s229.216 512 512 512 512-229.216 512-512S794.784 0 512 0zM512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96s416 186.24 416 416S741.76 928 512 928zM320 320 448 320 448 704 320 704zM576 320 704 320 704 704 576 704z\" p-id=\"8858\" fill=\"#ffffff\"></path></svg>\n    </div>";
    }
  }, {
    key: "render",
    value: function render() {
      $('.change_state_btn').remove();
      $(this.el).append(this.html);
      $('.play').css('display', 'none');
      $('.pause').css('display', 'block');
    }
  }, {
    key: "isPlay",
    value: function isPlay(audio) {
      if (audio) {
        if (audio.paused) {
          $('.play').css('display', 'block');
          $('.pause').css('display', 'none');
        } else {
          $('.play').css('display', 'none');
          $('.pause').css('display', 'block');
        }
      } else {
        $('.play').css('display', 'block');
        $('.pause').css('display', 'none');
      }
    }
  }]);

  return BtnState;
}();

exports.BtnState = BtnState;

var Player = /*#__PURE__*/function () {
  function Player(musicData) {
    _classCallCheck(this, Player);

    this.musicData = musicData;
    this.btn = new BtnState('.player_left');
    this.$audio = null;
    this.duration = null;
    this.prev = null;
    this.Lyric = null;
  }

  _createClass(Player, [{
    key: "playerInit",
    value: function playerInit() {
      var _this3 = this;

      this.prograss.start();
      $('.play').click(function () {
        _this3.onPlay();

        _this3.btn.isPlay(_this3.$audio);
      });
      $('.pause').click(function () {
        _this3.pause();

        _this3.btn.isPlay(_this3.$audio);
      });
    }
  }, {
    key: "hidden",
    value: function hidden() {
      $('.prograss_min').click(function (e) {
        $('#player').slideUp();
      });
    }
  }, {
    key: "show",
    value: function show() {
      $('#player').slideDown();
    }
  }, {
    key: "createAudio",
    value: function createAudio(volume) {
      var _this4 = this;

      this.show();
      this.render(volume);
      this.btn.render();
      var audio = document.querySelector('audio');

      if (!audio) {
        audio = document.createElement('audio');
        audio.id = "Player-".concat(new Date().getTime());
        audio.src = "".concat(this.musicData.PlayerUrl);
        audio.autoplay = true; // audio.loop = true

        audio.volume = volume;
        $(audio).on('ended', function () {
          _this4.$audio.play();

          _this4.prograss.restart();

          lyric.restart();
        });
        document.body.appendChild(audio);
        this.$audio = document.querySelector('audio');
        this.$audio.load();
        $(this.$audio).on('canplay', function () {
          _this4.prograss = new Prograss(audio.duration);
          _this4.duration = audio.duration;

          _this4.playerInit();
        });
      } else {
        this.newPlay();
      }

      return audio;
    }
  }, {
    key: "render",
    value: function render(volume) {
      var _this = this;

      var text = "\n <!--\u64AD\u653E\u5668-->\n \t<div class=\"player_left\">\n \t    <img src=\"".concat(this.musicData.PicUrl, "\" alt=\"\" height=\"100px\">\n\t\t\n\t</div>\n<!--    \u53F3\u534A\u90E8\u5206-->\n    <div class=\"player_right\">\n    \t<div class=\"player_right_top\">\n    \t\t<div class=\"player_right_top_quote\">\n            <span class=\"song_msg\">").concat(this.musicData.songName, " - ").concat(this.musicData.singerName, "</span>\n\t\t\t<svg t=\"1603198937683\" class=\"icon volume not_zero\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3383\" data-spm-anchor-id=\"a313x.7781069.0.i10\" width=\"200\" height=\"200\">\n\t\t\t\t<path d=\"M580.2 907.1c-20.2 0-39.6-6.2-56.2-17.8L308.8 731.8c-11.5-8-25.7-12.5-40.5-12.5h-74.4c-54 0-97.9-43.9-97.9-97.9V402.7c0-54 43.9-97.9 97.9-97.9h74.4c14.8 0 29-4.5 41.1-12.9l214.1-156.7c0.2-0.1 0.4-0.3 0.6-0.4 35.6-24.9 82.6-23.6 116.9 3.3 23.3 18.3 37.3 48 37.3 79.6v589.4c0 28-10.9 54.4-29.8 72.5-18.8 17.7-43 27.5-68.3 27.5zM193.9 375.6c-14.9 0-27.1 12.1-27.1 27.1v218.7c0 14.9 12.1 27.1 27.1 27.1h74.4c29.4 0 57.6 8.9 81.7 25.7l215.3 157.5c4 2.8 9.4 4.5 14.9 4.5 5 0 12.4-1.4 19.3-8 4.9-4.7 7.8-12.6 7.8-21.2V217.6c0-10-3.8-18.9-10.1-23.8-9.7-7.6-22.3-8.1-32.3-1.2L350.6 349.5c-24.7 17.3-52.9 26.2-82.3 26.2h-74.4z\" fill=\"#ffffff\" p-id=\"3384\" data-spm-anchor-id=\"a313x.7781069.0.i9\" class=\"\"></path><path d=\"M837.7 694.9c-6.5 0-13.1-1.8-19-5.5-16.5-10.5-21.4-32.4-10.9-48.9 65.9-103.6 65.9-193.5-0.2-282.9-11.6-15.7-8.3-37.9 7.4-49.6s37.9-8.3 49.6 7.4c83.5 112.9 84.5 235.1 3 363.1-6.7 10.6-18.2 16.4-29.9 16.4zM498.2 618.3c-19.6 0-35.4-15.9-35.4-35.4V441.2c0-19.6 15.9-35.4 35.4-35.4 19.6 0 35.4 15.9 35.4 35.4v141.7c0 19.6-15.8 35.4-35.4 35.4z\"  p-id=\"3385\" data-spm-anchor-id=\"a313x.7781069.0.i6\" class=\"volume_line\"></path>\n\t\t\t</svg>\n\t\t\t<input type=\"range\" class=\"volume_range\" min=\"0\" max=\"1\" step=\"0.01\" value=\"").concat(volume, "\" >\n\t\t\t</div>\n\t\t\t<div class=\"ico_group\">\n\t\t\t\t<svg t=\"1603207544491\" class=\"icon expansion\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"6545\" width=\"200\" height=\"200\">\n\t\t\t\t\t<path d=\"M448 554.666667c-6.4 0-10.666667 2.133333-14.933333 6.4L85.333333 908.8 85.333333 661.333333c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333l0 298.666667c0 12.8 8.533333 21.333333 21.333333 21.333333l298.666667 0c12.8 0 21.333333-8.533333 21.333333-21.333333 0-12.8-8.533333-21.333333-21.333333-21.333333L115.2 938.666667l347.733333-347.733333c4.266667-4.266667 6.4-8.533333 6.4-14.933333C469.333333 563.2 460.8 554.666667 448 554.666667zM960 42.666667 661.333333 42.666667c-12.8 0-21.333333 8.533333-21.333333 21.333333 0 12.8 8.533333 21.333333 21.333333 21.333333l247.466667 0L561.066667 433.066667C556.8 437.333333 554.666667 441.6 554.666667 448c0 12.8 8.533333 21.333333 21.333333 21.333333 6.4 0 10.666667-2.133333 14.933333-6.4L938.666667 115.2 938.666667 362.666667c0 12.8 8.533333 21.333333 21.333333 21.333333s21.333333-8.533333 21.333333-21.333333L981.333333 64C981.333333 51.2 972.8 42.666667 960 42.666667z\" p-id=\"6546\" >\n\t\t\t\t</path>\n\t\t\t\t</svg>\n\t\t\t\t<svg t=\"1603259694775\" class=\"icon withdraw\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"4813\" width=\"200\" height=\"200\">\n\t\t\t\t\t<path d=\"M448 554.666667 149.333333 554.666667c-12.8 0-21.333333 8.533333-21.333333 21.333333 0 12.8 8.533333 21.333333 21.333333 21.333333l247.466667 0L49.066667 945.066667C44.8 949.333333 42.666667 953.6 42.666667 960c0 12.8 8.533333 21.333333 21.333333 21.333333 6.4 0 10.666667-2.133333 14.933333-6.4L426.666667 627.2 426.666667 874.666667c0 12.8 8.533333 21.333333 21.333333 21.333333s21.333333-8.533333 21.333333-21.333333L469.333333 576C469.333333 563.2 460.8 554.666667 448 554.666667zM981.333333 64c0-12.8-8.533333-21.333333-21.333333-21.333333-6.4 0-10.666667 2.133333-14.933333 6.4L597.333333 396.8 597.333333 149.333333c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333l0 298.666667c0 12.8 8.533333 21.333333 21.333333 21.333333l298.666667 0c12.8 0 21.333333-8.533333 21.333333-21.333333s-8.533333-21.333333-21.333333-21.333333L627.2 426.666667 974.933333 78.933333C979.2 74.666667 981.333333 70.4 981.333333 64z\" p-id=\"4814\" class=\"volume_line\"></path>\n\t\t\t\t</svg>\n\t\t\t</div>\n\n\t\t</div>\n<!--        \u8FDB\u5EA6\u6761-->\n        <div class=\"prograss_container\">\n            <div class=\"prograss_group\">\n                <span class=\"played_time\">00:00</span>\n<!--                <div class=\"prograss_bar\">-->\n<!--                    <div class=\"prograss_blue\"></div>-->\n<!--                </div>-->\n                <input type=\"range\" class=\"music_progress\"  min=\"0\" max=\"100\" step=\"1\" value=\"0\" >\n                <span class=\"duration\">00:00</span>\n            </div>\n        </div>\n    </div>\n\t\t");
      $('.player_prograss').html(text);
      this.prev = volume;
      $('.volume_range').css('background-size', "".concat(Math.floor(volume * 100), "%")).mouseenter(function (e) {
        var _this5 = this;

        $(this).mousedown(function (e) {
          $(_this5).mousemove(function (e) {
            var vol = e.offsetX <= 0 ? 0 : e.offsetX >= 100 ? 100 : e.offsetX;
            $(_this5).val(vol / 100);
            $(_this5).css('background-size', "".concat(vol, "% 100%"));
            _this.$audio.volume = e.offsetX < 1 ? 0 : e.offsetX >= 100 ? 1 : e.offsetX / 100;
            $(_this5).mouseup(function () {
              _this.prev = $(_this5).val();
              $(_this5).unbind('mousemove');
            });
          });
        });
      });
      $('.volume').click(function (e) {
        if (_this.$audio.muted) {
          $('.volume_range').val(_this.prev).css('background-size', "".concat(_this.prev * 100, "% 100%"));
        } else {
          $('.volume_range').val(0).css('background-size', "0% 100%");
        }

        _this.$audio.muted = !_this.$audio.muted;
      });
      $('.music_progress').mouseenter(function (e) {
        var width = $(this).width();
        var ofx = e.offsetX <= 0 ? 0 : e.offsetX >= width ? 100 : e.offsetX;
        var currentPosition = ofx / $(this).width();
        $(this).mousedown(function (e) {
          lyric.toScroll(_this.$audio.duration * currentPosition);
          _this.prograss.currentTime = _this.$audio.duration * currentPosition;
          _this.$audio.currentTime = _this.$audio.duration * currentPosition;
        });
        $(document).unbind('mousedown');
      });
      $('.expansion').click(function (e) {
        $('#player_all').css('transform', 'translateY(0%)');
        $(this).css('display', 'none').siblings().css('display', 'block');
      });
      $('.withdraw').click(function (e) {
        $('#player_all').css('transform', 'translateY(95%)');
        $(this).css('display', 'none').siblings().css('display', 'block');
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      lyric.stopScroll();
      this.prograss.stop();
      this.$audio.pause();
    }
  }, {
    key: "onPlay",
    value: function onPlay() {
      this.prograss.start();
      lyric.startScroll();
      this.$audio.play();
    }
  }, {
    key: "newPlay",
    value: function newPlay() {
      var _this6 = this;

      var audio = document.querySelector('audio');
      audio.id = "Player-".concat(new Date().getTime());
      audio.src = "".concat(this.musicData.PlayerUrl);
      audio.autoplay = true; // audio.loop = true

      $(audio).on('ended', function () {
        _this6.$audio.play();

        _this6.prograss.restart();

        lyric.restart();
      });
      document.body.appendChild(audio);
      this.$audio = document.querySelector('audio');
      this.$audio.load();
      $(this.$audio).on('canplay', function () {
        _this6.prograss = new Prograss(audio.duration);

        _this6.prograss.reset(_this6.duration);

        _this6.duration = audio.duration;
      });
    }
  }]);

  return Player;
}();

exports.Player = Player;

var SongList = /*#__PURE__*/function () {
  function SongList(slot, data) {
    var showPic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, SongList);

    this.slot = slot;
    this.data = data;
    this.showPic = showPic;
  }

  _createClass(SongList, [{
    key: "template",
    value: function template(imgurl) {
      var html;

      if (this.showPic) {
        html = "\n<div class=\"ablum_song\">\n\t\t\t<div class=\"day_top\">\n                <img height=\"260px\"\n                     src=\"".concat(imgurl, "\"\n                     alt=\"\">\n                <div class=\"day_top_text\">\n                    <p>").concat(this.data.dissname || this.data.info.title, "</p>\n                    <p style=\"").concat(this.data.update ? 'display:block' : 'display:none', "\">\u66F4\u65B0\u4E8E:").concat(this.data.update, "</p>\n                </div>\n            </div>\n            <div class=\"day_bottom\">\n                <p>\u6B4C\u66F2\u5217\u8868:</p>\n                <ul class=\"ablum_song_list\">\n\t\t\t\t\t\t\n                </ul>\n            </div>\n</div>\n\n\t\t");
      } else {
        html = "\n\t\t<div class=\"ablum_song\">\n\t\t            <div class=\"day_bottom\">\n\t\t                <p>\u6B4C\u66F2\u5217\u8868:</p>\n\t\t                <ul class=\"ablum_song_list\">\n\t\t\t\t\t\t\t\t\n\t\t                </ul>\n\t\t            </div>\n\t\t</div>\n\n\t\t";
      }

      $(this.slot).append(html);
      this.render();
    }
  }, {
    key: "formatTime",
    value: function formatTime(time) {
      var min = Math.floor(time / 60);
      var sec = Math.floor(time % 60);
      if (min < 10) min = '0' + min;
      if (sec < 10) sec = '0' + sec;
      return "".concat(min, ":").concat(sec);
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var songlist = this.data.list || this.data.songlist;
      var list = songlist.map(function (item) {
        var time = _this7.formatTime(item.interval);

        var html = "<li class=\"song_list\" data-songmid=\"".concat(item.mid || item.songmid, "\">\n\t\t\t\t<a>\n\t\t\t\t\t<span>\n                        ").concat(item.name || item.songname, "\n                        <span class=\"song_isvip\">").concat(item.pay.payplay ? 'vip' : 'no', "</span>\n                        </span>\n\t\t\t\t\t\n\t\t\t\t\t<span>").concat(item.singerName || item.singer[0].name, "</span>\n\t\t\t\t\t<span>").concat(time, "</span>\n\t\t\t\t</a>\n\t\t\t</li>");
        $('.ablum_song_list').append(html);
      });
      this.play();
    }
  }, {
    key: "play",
    value: function play() {
      $('.song_list').on('click', function (e) {
        console.log(this);
        var load = new Load('', true);
        load.template(this);
        var songmid = e.currentTarget.dataset.songmid;
        var song = new GetMusicData();
        song.getData(songmid, load, this);
      });
    }
  }]);

  return SongList;
}();

exports.SongList = SongList;

var GetMusicData = /*#__PURE__*/function () {
  function GetMusicData() {
    _classCallCheck(this, GetMusicData);

    this.musicData = [];
    this.albumid = '';
    this.PlayerUrl = '';
    this.PicUrl = '';
    this.singerName = '';
    this.songName = '';
    this.volume = 0;
    this.pay_play = false;
    this.loadover = false;
  }

  _createClass(GetMusicData, [{
    key: "getData",
    value: function getData(songmid, load, el) {
      var _this8 = this;

      $.ajax({
        method: "GET",
        url: 'http://localhost:3300' + "/song?songmid=".concat(songmid),
        dataType: 'json',
        success: function success(res) {
          _this8.albumid = res.data.track_info.album.mid;
          _this8.PicUrl = _this8.musicPicUrl(_this8.albumid);
          _this8.pay_play = res.data.track_info.pay.pay_play;
          _this8.songName = res.data.track_info.name;
          _this8.singerName = res.data.track_info.singer[0].name;
          _this8.volume = res.data.track_info.volume.peak;

          _this8.musicPlayUrl(songmid, el);

          if (load) {
            load.remove(el);
          }
        }
      });
    }
  }, {
    key: "musicPlayUrl",
    value: function musicPlayUrl(songmid) {
      var _this9 = this;

      $.ajax({
        method: "GET",
        url: 'http://localhost:3300' + "/song/url?id=".concat(songmid),
        success: function success(res) {
          if (res.result === 400) {
            var _tip = new Tip();

            _tip.template("".concat(res.errMsg), 'fail');

            $('.load_ico').hide();
            return;
          }

          _this9.PlayerUrl = res.data;
          var player = new Player(_this9);
          player.createAudio(_this9.volume);
          lyric.template();
          lyric.getLyric(songmid);
          $('.load_ico').hide();
        }
      });
    }
  }, {
    key: "musicPicUrl",
    value: function musicPicUrl(albumid) {
      return "https://y.gtimg.cn/music/photo_new/T002R300x300M000".concat(albumid, ".jpg");
    }
  }]);

  return GetMusicData;
}();

exports.GetMusicData = GetMusicData;
var lyric = new Lyric();
exports.lyric = lyric;
var tip = new Tip();
exports.tip = tip;
},{}],"JavaScript/home/songSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SongSlider = void 0;

var _app = require("../component/app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SongSlider = /*#__PURE__*/function () {
  function SongSlider(tab, container) {
    _classCallCheck(this, SongSlider);

    this.container = container;
    this.tab = tab;
    this.area = $("".concat(this.tab, ">li"));
    this.player = null;
    this.songmid = null;
    this.song = null;
    this.showlist = {};
    this.Lyric = new _app.Lyric();
  }

  _createClass(SongSlider, [{
    key: "template",
    value: function template(picUrl, songUrl, item) {
      var text = "\n\t\t<a class=\"song_mid\" data-songmid=\"".concat(item.mid, "\">\n\t\t\t<div>\n\t\t\t    <img  class=\"song_pic\" src=\"").concat(picUrl, "\"\n\t\t\t         alt=\"\">\n\t\t\t</div>\n\t\t\t<dl>\n\t\t\t    <dt class=\"song_name\">").concat(item.title, "</dt>\n\t\t\t    <dd class=\"singer\">").concat(item.singer[0].name, "</dd>\n\t\t\t</dl>\n\t\t</a>\n\t\t");
      var liDom = document.createElement('li');
      $(liDom).addClass('song_list_li');
      $(text).appendTo(liDom);
      return liDom;
    } //判断地区

  }, {
    key: "decideArea",
    value: function decideArea() {
      this.load = new _app.Load('.song_list_ul', true);
      this.load.template();
      var area = 0;
      this.render(area);

      var _this = this;

      var prev = 0;
      $("".concat(this.tab, ">li")).click(function (e) {
        _this.load.template();

        area = $(this).index();

        if (prev === area) {
          _this.load.remove();
        } else {
          prev = area;
          $(this).addClass('active').siblings().removeClass('active');

          _this.render(area);
        }
      });
    }
  }, {
    key: "render",
    value: function render(index) {
      var _this2 = this;

      var _this = this;

      $.ajax({
        method: "GET",
        url: 'http://localhost:3300' + "/new/songs?type=".concat(index || 0),
        success: function success(res) {
          if (res.result === 100) {
            _this2.load.remove();
          }

          $(_this2.container).html('');
          _this2.showlist = res.data.list.splice(0, 10);

          _this2.showlist.map(function (item) {
            var picUrl = "https://y.gtimg.cn/music/photo_new/T002R300x300M000".concat(item.album.mid, ".jpg");
            $(_this2.template(picUrl, null, item)).appendTo($(_this2.container));
          });

          var on = _this2.throttle(function (e) {
            var song = new _app.GetMusicData();
            song.getData(_this.songmid, null, _this.Lyric);
          }, 1500);

          $(".song_mid").on('click', function (e) {
            _this2.songmid = e.currentTarget.dataset.songmid;
            on();
          });
        }
      });
    }
  }, {
    key: "throttle",
    value: function throttle(func, wait) {
      var _this = this;

      var prev, timer;
      return function fn() {
        var curr = Date.now();
        var diff = curr - prev;

        if (!prev || diff >= wait) {
          func();
          prev = curr;
        } else if (diff < wait) {
          clearTimeout(timer);
          timer = setTimeout(fn, wait - diff);
        }
      };
    }
  }]);

  return SongSlider;
}();

exports.SongSlider = SongSlider;
},{"../component/app":"JavaScript/component/app.js"}],"JavaScript/rank/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderRank = void 0;

var _app = require("../component/app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import {GetMusicData} from "../commonFunc/getMusicData";
var RenderRank = /*#__PURE__*/function () {
  function RenderRank(slot) {
    _classCallCheck(this, RenderRank);

    //el要插入的元素
    this.slot = slot;
    this.count = 0;
    this.amblumSongList = [];
    this.data = [];
    this.initTime = null;
    this.load = new _app.Load(slot, true);
    this.load.template();
    this.SongList;
  }

  _createClass(RenderRank, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      $.ajax({
        method: 'GET',
        url: 'http://localhost:3300' + '/top/category?showDetail=1',
        dataType: 'json',
        success: function success(res) {
          _this2.initTime = res.result;

          if (_this2.initTime === 100) {
            _this2.load.remove();
          }

          res.data.forEach(function (item) {
            item.list.slice(0, 2).forEach(function (it) {
              _this2.data.push(it);
            });
          }); //渲染页面内容

          _this2.renderHtml();
        }
      });
    }
  }, {
    key: "renderHtml",
    value: function renderHtml() {
      var a = this.data.map(function (item, index) {
        return "\n\t <li class=\"rank_li_1\" data-id=\"".concat(item.topId, "\"  style=\"background-image:url(").concat(item.picUrl, ")\">\n        <div class=\"rank_title rank_li_bgimg\">\n            <a class=\"dct\" data-topId=\"").concat(item.topId, "\" data-imgurl=\"").concat(item.picUrl, "\"   data-content=\"\u66F4\u65B0\u4E8E:").concat(item.updateTime, "\"> ").concat(item.label, "</a>\n            <ul class=\"rank_ul_2\">\n                <li class=\"rank_li_2\">\n                    <a class=\"ablum_songmid\" data-topId=\"").concat(item.topId, "\" data-rank=\"").concat(item.song[0].rank, "\">\n                        <span>").concat(item.song[0].title, "</span>\n                        <span>").concat(item.song[0].singerName, "</span>\n                    </a>\n                </li>\n                <li  class=\"rank_li_2\">\n                    <a class=\"ablum_songmid\" data-topId=\"").concat(item.topId, "\" data-rank=\"").concat(item.song[1].rank, "\">\n                        <span>").concat(item.song[1].title, "</span>\n                        <span>").concat(item.song[1].singerName, "</span>\n                    </a>\n                </li>\n                <li class=\"rank_li_2\">\n                    <a class=\"ablum_songmid\" data-topId=\"").concat(item.topId, "\" data-rank=\"").concat(item.song[2].rank, "\">\n                        <span>").concat(item.song[2].title, "</span>\n                        <span>").concat(item.song[2].singerName, "</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </li>\n\t\t");
      }).join('');
      $(this.slot).append(a);
      this.unfold();
    }
  }, {
    key: "unfold",
    value: function unfold() {
      var _this = this;

      $('.ablum_songmid').on('click', function (e) {
        var ablumId = _this.getAmblumId(e);

        _this.getSongMid(ablumId.topid, ablumId.rank);
      });
      $('.dct').on('click', function (e) {
        $('.rank_ul_1').css('display', 'none');
        var topid = e.target.dataset.topid;
        var imgurl = e.target.dataset.imgurl;
        _this.load = new _app.Load('.rank', true);

        _this.load.template();

        _this.getSongMid(topid, null, imgurl);
      });
    }
  }, {
    key: "getAmblumId",
    value: function getAmblumId(e) {
      return e.currentTarget.dataset;
    }
  }, {
    key: "getSongMid",
    value: function getSongMid(amblumId, rank, imgurl) {
      var _this3 = this;

      $.ajax({
        method: 'GET',
        url: "http://localhost:3300/top?id=".concat(amblumId, "&pageSize=10"),
        success: function success(res) {
          if (rank) {
            var songmid = res.data.list[rank - 1].mid;

            _this3.play(songmid);
          } else {
            _this3.amblumSongList = res.data;
            _this3.SongList = new _app.SongList('.rank', _this3.amblumSongList, _this3.data);

            _this3.SongList.template(imgurl);

            $('.rank>.load_ico').fadeOut();
          }
        }
      });
    }
  }, {
    key: "play",
    value: function play(songmid) {
      var song = new _app.GetMusicData();
      song.getData(songmid);
    }
  }]);

  return RenderRank;
}();

exports.RenderRank = RenderRank;
},{"../component/app":"JavaScript/component/app.js"}],"JavaScript/my_music/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mymusic = void 0;

var _app = require("../component/app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mymusic = /*#__PURE__*/function () {
  function Mymusic(header, body) {
    _classCallCheck(this, Mymusic);

    this.header = header;
    this.body = body;
    this.qq = '';
    this.headerload = new _app.Load(this.header, true);
    this.headerload.template();
    this.bodyload = new _app.Load('.my_music_songlist', false);
    this.bodyload.template();
    this.data = {
      'nickname': '',
      'headpic': '',
      'lvinfo': '',
      'mymusicid': 0,
      'mydissnum': 0,
      'mydisslist': '',
      'dissid': 0,
      'list': ''
    };
    this.Tip = new _app.Tip();
    this.getCookie();
  }

  _createClass(Mymusic, [{
    key: "renderHeader",
    value: function renderHeader() {
      var header = "\n            <img src=\"".concat(this.data.headpic, "\" alt=\"\">\n            <div class=\"vip_container\">\n                <span >").concat(this.data.nickname, "</span>\n                <svg t=\"1603109300551\" style=\" ").concat(this.data.lvinfo === 0 ? 'display:none' : 'display:block', "\" class=\"icon is_vip\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n                     p-id=\"3757\" width=\"200\" height=\"200\">\n                    <path d=\"M886.4 403.2l-35.2 38.4-3.2 3.2-32 32-48 51.2-182.4 16-44.8 3.2-35.2 3.2-41.6 3.2-156.8 12.8L188.8 448l-6.4-6.4-35.2-38.4 169.6-185.6H704l182.4 185.6z\"\n                          fill=\"#FFFFFF\" p-id=\"3758\"></path>\n                    <path d=\"M816 476.8L768 528l-246.4 288L188.8 448c41.6-16 131.2-48 220.8-38.4 16 0 32 3.2 44.8 6.4 28.8 6.4 60.8 19.2 89.6 35.2 6.4 3.2 16 9.6 22.4 12.8 12.8 6.4 25.6 12.8 38.4 16 83.2 32 163.2 16 211.2-3.2z\"\n                          fill=\"#0DE28B\" p-id=\"3759\"></path>\n                    <path d=\"M720 176H297.6l-208 230.4 64 64 371.2 380.8 355.2-377.6 3.2-3.2 60.8-67.2-224-227.2z m96 300.8l-294.4 313.6L188.8 448l-41.6-44.8 169.6-185.6H704l182.4 188.8-70.4 70.4z\"\n                          fill=\"#044236\" p-id=\"3760\"></path>\n                    <path d=\"M505.6 678.4L361.6 268.8l41.6-12.8 121.6 348.8L630.4 256l38.4 12.8L544 678.4z\" fill=\"#044236\"\n                          p-id=\"3761\"></path>\n                </svg>\n            </div>\n\t\t\t");
      $(this.header).html(header);
      this.headerload.remove();
    }
  }, {
    key: "renderMymusic",
    value: function renderMymusic() {
      this.SongList = new _app.SongList(this.body, this.data, false);
      this.SongList.template(this.data.headpic);
    }
  }, {
    key: "renderDiss",
    value: function renderDiss() {
      //my_music_songlist
      var html = "\n\t\t\t\t<div class=\"diss_list\">\n\t\t\t\t\t<ul>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t";
      $('.my_music_songlist').append(html);
      this.showDiss();
    }
  }, {
    key: "render",
    value: function render() {
      this.renderDiss();
      $('.diss_list').hide();

      var _this = this;

      $('.mymusic_header_ul>li').on('click', function (e) {
        $(this).addClass('active').siblings().removeClass('active');

        if ($(e.currentTarget).hasClass('my_like active')) {
          $('.my_music_songlist_ul').fadeIn();
          $('.diss_list').fadeOut();
        } else if ($(e.currentTarget).hasClass('my_diss active')) {
          $('.my_music_songlist_ul').fadeOut();
          $('.diss_list').fadeIn();
          $('.diss_list>ul>li').on('click', function (e) {
            var dissid = e.currentTarget.dataset.dissid;

            _this.getMyDiss(dissid);
          });
        }
      });
    }
  }, {
    key: "getCookie",
    value: function getCookie() {
      var _this2 = this;

      $.ajax({
        method: 'GET',
        url: "http://localhost:3300/user/cookie",
        success: function success(res) {
          _this2.qq = res.data.userCookie.uin; // console.log (this.qq)

          if (!_this2.qq) {
            _this2.Tip.template('还没有设置cookie(⊙o⊙)…', 'waring');

            return;
          }

          _this2.getDetail();
        }
      });
    }
  }, {
    key: "getDetail",
    value: function getDetail() {
      var _this3 = this;

      $.ajax({
        method: 'GET',
        url: "http://localhost:3300/user/detail?id=".concat(this.qq),
        success: function success(res) {
          _this3.data = {
            'nickname': res.data.creator.nick,
            'headpic': 'https://' + res.data.creator.headpic.slice(5),
            'lvinfo': res.data.creator.lvinfo[0].lvinfo_bykey.url_params.length,
            'mymusicid': res.data.mymusic[0].id,
            'mydissnum': res.data.mydiss.num,
            'mydisslist': res.data.mydiss.list //dissid picurl title  subtitle

          };

          _this3.renderHeader();

          _this3.getMymusic();

          _this3.render();
        }
      });
    }
  }, {
    key: "getMymusic",
    value: function getMymusic() {
      var _this4 = this;

      $.ajax({
        method: 'GET',
        url: "http://localhost:3300/songlist?id=".concat(this.data.mymusicid),
        success: function success(res) {
          _this4.data.list = res.data.songlist;

          _this4.bodyload.remove();

          _this4.renderMymusic();
        }
      });
    }
  }, {
    key: "getMyDiss",
    value: function getMyDiss(dissid) {
      $.ajax({
        method: 'GET',
        url: "http://localhost:3300/songlist?id=".concat(dissid),
        success: function success(res) {
          $('.my_music').children().remove();
          var songList = new _app.SongList('.my_music', res.data, true);
          songList.template(res.data.logo);
        }
      });
    }
  }, {
    key: "showDiss",
    value: function showDiss() {
      var _this = this;

      this.data.mydisslist.map(function (item) {
        //"http://y.gtimg.cn/music/photo_new/T002R150x150M000000fQplQ3rXsxG.jpg?n=1" id
        var html = "\n\t\t\t\t\t<li data-dissid=\"".concat(item.dissid, "\" data-dissid=\"").concat(item.dissid, "\">\n\t\t\t\t\t\t<img src=\"").concat(item.picurl, "\" alt=\"\">\n\t\t\t\t\t\t<span>").concat(item.title, "</span>\n\t\t\t\t\t</li>\n\t\t\t\t");
        $('.diss_list>ul').append(html);
      });
    }
  }]);

  return Mymusic;
}();

exports.Mymusic = Mymusic;
},{"../component/app":"JavaScript/component/app.js"}],"JavaScript/day_rec/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayRec = void 0;

var _app = require("../component/app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DayRec = /*#__PURE__*/function () {
  function DayRec(el) {
    _classCallCheck(this, DayRec);

    this.el = el;
    this.load = new _app.Load(this.el, true);
    this.load.template();
  }

  _createClass(DayRec, [{
    key: "render",
    value: function render() {
      this.getData();
    }
  }, {
    key: "getData",
    value: function getData() {
      var _this = this;

      var settings = {
        "url": "http://localhost:3300/recommend/daily",
        "method": "GET"
      };
      $.ajax(settings).done(function (res) {
        _this.load.remove();

        var dayRec = new _app.SongList('.day_rec', res.data, true);
        dayRec.template(res.data.logo);
      });
    }
  }]);

  return DayRec;
}();

exports.DayRec = DayRec;
},{"../component/app":"JavaScript/component/app.js"}],"JavaScript/nav/tab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = void 0;

var _imgSlider = require("../home/imgSlider");

var _songSlider = require("../home/songSlider");

var _app = require("../rank/app");

var _app2 = require("../my_music/app");

var _app3 = require("../day_rec/app");

var _app4 = require("../component/app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tab = /*#__PURE__*/function () {
  function Tab(selector) {
    _classCallCheck(this, Tab);

    this.selector = selector;
    this.index = 0;
    this.clickTab = 'home';
    this.currentTab = 'home';
    this.prevTab = null;
    this.showPage = 'home';
    this.root = $(".home");
    this.slider = new _imgSlider.ImgSlider('.slider_ul', '.slider_ul li');
    this.songSlider = new _songSlider.SongSlider('.song_area_ul', '.song_list_ul');
    this.Tip = _app4.tip;
    this.uin;
    this.qm_keyst;
    this.getCookie();
  }

  _createClass(Tab, [{
    key: "activeLi",
    value: function activeLi() {
      this.renderHtml(this.currentTab);
      this.renderJs();

      var _this = this;

      $(_this.selector).click(function (e) {
        if ($('.search').length !== 0) {
          $('.search').remove();

          _this.renderHtml(_this.clickTab);

          _this.renderJs.call(_this);
        }

        $(this).addClass('active').siblings().removeClass('active'); //页面初始化

        _this.clickTab = $(this).data().tab;

        if (_this.clickTab === _this.currentTab) {
          _this.showPage = _this.clickTab;
          _this.prevTab = _this.clickTab;
        } else {
          _this.showPage = _this.clickTab;
          _this.prevTab = _this.currentTab;
          _this.currentTab = _this.showPage;
        }

        if (_this.prevTab !== _this.currentTab && $(this).data().tab !== _this.prevTab) {
          $('.main').children().remove();

          if (_this.showPage === 'my_music' || _this.showPage === 'day_rec') {
            if (!_this.qm_keyst || !_this.uin) {
              _this.Tip.template('还没有设置cookie(⊙o⊙)…', 'waring');

              return;
            }
          }

          _this.renderHtml(_this.showPage);

          _this.renderJs.call(_this);
        } else {
          console.log('no render');
        }
      });
    }
  }, {
    key: "renderJs",
    value: function renderJs() {
      this.slider.render();
      this.songSlider.decideArea();
    }
  }, {
    key: "getCookie",
    value: function getCookie() {
      var _this2 = this;

      $.ajax({
        method: 'GET',
        url: "http://localhost:3300/user/cookie",
        success: function success(res) {
          _this2.qm_keyst = res.data.userCookie.qm_keyst;
          _this2.uin = res.data.userCookie.uin;
        }
      });
    }
  }, {
    key: "renderHtml",
    value: function renderHtml(type) {
      var text;

      switch (type) {
        case 'home':
          text = "    \n            <section data-tab=\"home\" class=\"home\">        \n\t            <!--  \u8F6E\u64AD\u56FE-->\n\t            <section class=\"slider\">\n\t                <div class=\"slider_move\">\n\t                    <ul class=\"clearfix slider_ul\">\n\t                    \n\t                    </ul>\n\t                </div>\n\t            </section>\n\t            <!--        \u65B0\u6B4C\u63A8\u8350-->\n\t            <section class=\"new_song_recommend\">\n\t                <div class=\"new_song_recommend_bg\"></div>\n\t                <div class=\"new_song_leave\">\n\t                    <h2>\u65B0\u6B4C\u63A8\u8350</h2>\n\t                    <div class=\"song_area\">\n\t                        <ul class=\"clearfix song_area_ul\">\n\t                            <li class=\"active \"><a>\u6700\u65B0</a></li>\n\t                            <li><a>\u5185\u5730</a></li>\n\t                            <li><a>\u6E2F\u53F0</a></li>\n\t                            <li><a>\u6B27\u7F8E</a></li>\n\t                            <li><a>\u97E9\u56FD</a></li>\n\t                            <li><a>\u65E5\u672C</a></li>\n\t                        </ul>\n\t                    </div>\n\t                    <div class=\"song_list\">\n\t                        <ul class=\"song_list_ul\">\n\t                        </ul>\n\t                    </div>\n\t                </div>\n\t            </section>\n\t\t\t</section>\n\t\t\t";
          $(text).appendTo(".main");
          break;

        case 'my_music':
          text = "\n<section data-tab=\"my_music\" class=\"my_music\">\n    <div class=\"mymusic_header\">\n        <div class=\"avatar\">\n\n        </div>\n        <ul class=\"mymusic_header_ul\">\n            <li class=\"active my_like\">\u6211\u559C\u6B22</li>\n            <li class=\"my_diss\">\u521B\u5EFA\u7684\u6B4C\u5355</li>\n        </ul>\n    </div>\n    <div class=\"my_music_songlist\">\n        <ul class=\"my_music_songlist_ul\">\n        </ul>\n    </div>\n</section>\n\t\t\t";
          $(text).appendTo(".main");
          new _app2.Mymusic('.avatar', '.my_music_songlist_ul');
          break;

        case 'day_rec':
          text = "\n       \t\t\t <section  data-tab=\"day_rec\"  class=\"day_rec\">\n\n\t\t\t\t</section>\n\t\t\t";
          $(text).appendTo(".main");
          var dayRec = new _app3.DayRec('.day_rec');
          dayRec.render();
          break;

        case 'rank':
          text = "\n\t\t\t      <section  data-tab=\"rank\"  class=\"rank\">\n\t\t\t\t\t\t<ul class=\"rank_ul_1\">\n\t\t\t\t\t\t               \n\t\t\t            </ul>\n\t\t\t\t  </section>\n\t\t\t\t\t";
          $(text).appendTo(".main");
          var renderRank = new _app.RenderRank('.rank_ul_1');
          renderRank.init();
          break;

        default:
          break;
      } // return

    }
  }]);

  return Tab;
}();

exports.Tab = Tab;
},{"../home/imgSlider":"JavaScript/home/imgSlider.js","../home/songSlider":"JavaScript/home/songSlider.js","../rank/app":"JavaScript/rank/app.js","../my_music/app":"JavaScript/my_music/app.js","../day_rec/app":"JavaScript/day_rec/app.js","../component/app":"JavaScript/component/app.js"}],"JavaScript/nav/search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;

var _app = require("../component/app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Search = /*#__PURE__*/function () {
  function Search(slot) {
    _classCallCheck(this, Search);

    this.slot = slot;
    this.listener = $('.search_form');
    this.pageSize = 0;
    this.total = 0;
    this.pageNo = 1;
    this.maxPage = 0;
    this.keyword = '';
    this.isonly = false;
    this.load = null;
    this.over = "<p class=\"load_over\" style=\"text-align: center;font-size:1rem\">\u6CA1\u6709\u6B4C\u66F2\u4E86</p>";
  }

  _createClass(Search, [{
    key: "template",
    value: function template() {
      var html = "\n<!--           <section   class=\"search\">-->\n        <div class=\"search_top_text\">\n            <p>\u641C\u7D22\u7ED3\u679C</p>\n        </div>\n        <div class=\"day_bottom\">\n            <ul class=\"day_bottom_ul\">\n            </ul>\n        </div>\n<!--    </section>-->\n\t\t\t";
      var dom = document.createElement('section');
      dom.className = 'search';
      dom.innerHTML = html;
      $('.main').append(dom);
      $('.day_bottom').append(this.over);
      $('.load_over').hide();
      this.load = new _app.Load('.day_bottom');
      this.load.template();
      this.load.render();
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.listener.on('submit', function (e) {
        e.preventDefault();
        $('.main').children().remove();
        var keyword = $('input[name=key]').val();

        _this2.template();

        _this2.getData(keyword, 1);

        _this2.pageNo = 1;

        _this2.scrollLoad();
      });
    }
  }, {
    key: "formatTime",
    value: function formatTime(time) {
      var min = Math.floor(time / 60);
      var sec = Math.floor(time % 60);
      if (min < 10) min = '0' + min;
      if (sec < 10) sec = '0' + sec;
      return "".concat(min, ":").concat(sec);
    }
  }, {
    key: "getData",
    value: function getData(keyword) {
      var _this3 = this;

      var pageNo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3300' + "/search?t=0&key=".concat(keyword, "&pageSize=20&pageNo=").concat(pageNo),
        success: function success(res) {
          $('.load_over').hide();
          _this3.keyword = keyword;
          _this3.pageSize = res.data.pageSize;
          _this3.total = res.data.total;
          _this3.maxPage = Math.round(_this3.total / _this3.pageSize);
          var a = res.data.list.map(function (item) {
            var time = _this3.formatTime(item.interval);

            return "<li class=\"search_song_li\" data-singmid='".concat(item.songmid, "'>\n\t                <a>\n                        <span>\n                        ").concat(item.songname, "\n                        <span class=\"song_isvip\">").concat(item.pay.payplay ? 'vip' : 'no', "</span>\n                        </span>\n\t                    <span>").concat(item.singer[0].name, "</span>\n\t                    <span>").concat(time, "</span>\n\t                </a>\n                </li>");
          }).join('');
          $('.day_bottom_ul').append(a);
          $('.search_song_li').on('click', function (e) {
            var load = new _app.Load('', true);
            load.template(this);
            var songmid = e.currentTarget.dataset.singmid;
            var song = new _app.GetMusicData();
            song.getData(songmid, load, this);
          });
        }
      });
    } // 滚动加载

  }, {
    key: "scrollLoad",
    value: function scrollLoad() {
      var _this = this;

      var onscroll = this.throttle(function () {
        var scroll = pageYOffset + document.documentElement.clientHeight;
        var povit = document.body.clientHeight - 50;

        if (scroll >= povit && _this.pageNo < _this.maxPage) {
          _this.pageNo += 1;

          _this.getData(_this.keyword, _this.pageNo);
        }

        if (_this.pageNo >= _this.maxPage) {
          _this.load.remove();

          $('.load_over').show();
        }
      }, 1000);
      window.addEventListener('scroll', onscroll);
    } //节流

  }, {
    key: "throttle",
    value: function throttle(func, wait) {
      var prev, timer;
      return function fn() {
        var curr = Date.now();
        var diff = curr - prev;

        if (!prev || diff >= wait) {
          func();
          prev = curr;
        } else if (diff < wait) {
          clearTimeout(timer);
          timer = setTimeout(fn, wait - diff);
        }
      };
    }
  }]);

  return Search;
}();

exports.Search = Search;
},{"../component/app":"JavaScript/component/app.js"}],"JavaScript/nav/setCookie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetCookie = void 0;

var _app = require("../component/app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SetCookie = /*#__PURE__*/function () {
  function SetCookie() {
    _classCallCheck(this, SetCookie);

    this.tip = _app.tip;
    this.init();
  }

  _createClass(SetCookie, [{
    key: "set",
    value: function set(cookie) {
      var _this = this;

      var settings = {
        "url": "http://localhost:3300/user/setCookie?=",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "data": "\"".concat(cookie, "\"")
        })
      };
      $.ajax(settings).done(function (response) {
        if (response.result === 200) {
          _this.tip.template("".concat(response.data), 'fail');
        } else if (response.result === 100) {
          _this.tip.template("".concat(response.data), 'success');

          setTimeout(function () {
            window.location.reload();
          }, 400);
        }

        $('.cookie_form').fadeOut();
      });
    }
  }, {
    key: "init",
    value: function init() {
      var form = $('.cookie_form');
      form.hide();

      var _this = this;

      $('.set_cookie').click(function (e) {
        form.fadeToggle();
      });
      form.submit(function (e) {
        e.preventDefault();
        var cookie = $('input[name=cookie]').val();

        _this.set(cookie);
      });
    }
  }, {
    key: "deleteCookie",
    value: function deleteCookie() {
      var _this = this;

      var settings = {
        "url": "http://localhost:3300/user/setCookie?=",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "data": ""
        })
      };
      $.ajax(settings).done(function (response) {
        _this.tip.template("\u64CD\u4F5C\u6210\u529F", 'waring');

        setTimeout(function () {
          window.location.reload();
        }, 400);
      });
    }
  }]);

  return SetCookie;
}();

exports.SetCookie = SetCookie;
},{"../component/app":"JavaScript/component/app.js"}],"JavaScript/app.js":[function(require,module,exports) {
"use strict";

var _tab = require("./nav/tab");

var _search = require("./nav/search");

var _setCookie = require("./nav/setCookie");

var _app = require("./component/app");

$('.cookie_form').hide();
$(function () {
  $.ajax({
    method: 'GET',
    url: "http://localhost:3300/user/cookie",
    success: function success(res) {
      var qm_keyst = res.data.userCookie.qm_keyst;
      var uin = res.data.userCookie.uin;

      if (qm_keyst === undefined || uin === undefined) {
        _app.tip.template('欢迎━(*｀∀´*)ノ亻! Cookie未设置', 'waring');

        new _setCookie.SetCookie();
      } else {
        _app.tip.template('欢迎━(*｀∀´*)ノ亻! Cookie获取成功', 'success');

        $('.set_cookie').css({
          'background-color': "#E6A23C"
        }).text('清除cookie').click(function () {
          var cookie = new _setCookie.SetCookie();
          cookie.deleteCookie();
        });
      }

      $('#player').hide();
      var tab = new _tab.Tab('.nav_ul>li');
      tab.activeLi();
      tab.getCookie();
      var search = new _search.Search('.main');
      search.init();
    }
  });
});
},{"./nav/tab":"JavaScript/nav/tab.js","./nav/search":"JavaScript/nav/search.js","./nav/setCookie":"JavaScript/nav/setCookie.js","./component/app":"JavaScript/component/app.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54888" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","JavaScript/app.js"], null)
//# sourceMappingURL=dist/app.b0268aaa.js.map
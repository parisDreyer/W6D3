/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class APIUtil {
  static searchUsers(queryVal, success) {
    $.ajax({
      url: `users/search`,//?query=${queryVal}`,
      method: 'GET',
      data: {
        query: queryVal
      },
      dataType: 'JSON'
    }).then((users) => success(users));
  }
  
}

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { post, remove } = __webpack_require__(/*! ./toggle_ajax */ "./frontend/toggle_ajax.js");

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');
    this.render();
    this.bindEvents();
    // this.handleClick();
  }
  bindEvents(){
    
    this.$el.on('click', this.handleClick.bind(this));
  }
  
  render(){
    if (this.followState === 'unfollowed') {
      this.$el.text("Follow!");
    } else { 
      this.$el.text("Unfollow!"); 
    }
  }
  
  handleClick(){ // bind this as a callback to click event in constructor
    // debugger;
    if (this.followState === "followed") {
      // const unfollowed = new Promise(() => {
      
      this.$el.attr('disabled', true);
      this.$el.text("Unfollowing...");
      remove(this.userId)
        .then(() => {
          this.$el.attr('disabled', false);
          this.followState = "unfollowed";
          this.render();
      });
    } else {
      this.$el.attr('disabled', true);
      this.$el.text("Following...");
      // const followed = new Promise(() => {
      post(this.userId)
        .then(() => {
          this.$el.attr('disabled', false);
          this.followState = "followed";
          this.render();
        });
    }
  }
}

module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/toggle_ajax.js":
/*!*********************************!*\
  !*** ./frontend/toggle_ajax.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {


function post(user_id) {
  // const $button = $('.follow-toggle');
  // $button.click((e) => {
    // e.preventDefault();
    return $.ajax({
      url: `/users/${user_id}/follow`,
      method: 'POST',
      data: { followee_id: user_id, },
      dataType: 'JSON'
    });
  // });
}

function remove(user_id) {
  // const $button = $('.follow-toggle');
  // $button.click((e) => {
    return $.ajax({
      url: `/users/${user_id}/follow`,
      method: 'DELETE',
      dataType: 'JSON'
    });
  // });
}


module.exports = { post, remove };

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");
// function documentReady() {
  $(() => {
    $('.follow-toggle').each((idx, e)=> {
      new FollowToggle(e);
    });
      
    new UsersSearch();
  });
  
// }


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class UsersSearch {
  constructor() {
    const $inputEl = $('.users-search-input');
    $inputEl.on('input', e => {
      const value = $inputEl.val();
      this.handleInput(value);
    });
  }
  
  handleInput(value) {
    APIUtil.searchUsers(value, this.success.bind(this));
  }
  
  success(users) {
    users.each((el, idx) => {
      $('ul').append(`<li>${el.username}</li>`);
    });
  }
}

module.exports = UsersSearch;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
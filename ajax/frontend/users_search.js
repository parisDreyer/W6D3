const APIUtil = require('./api_util');

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

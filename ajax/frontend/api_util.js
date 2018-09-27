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
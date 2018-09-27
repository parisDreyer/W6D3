
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
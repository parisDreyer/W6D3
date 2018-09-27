const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
// function documentReady() {
  $(() => {
    $('.follow-toggle').each((idx, e)=> {
      new FollowToggle(e);
    });
      
    new UsersSearch();
  });
  
// }

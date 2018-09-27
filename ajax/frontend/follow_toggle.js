const { post, remove } = require('./toggle_ajax');

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
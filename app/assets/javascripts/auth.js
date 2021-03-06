$(document).ready(function(){
  if (!$('body').hasClass('ajax')) { return false; }
console.log("loaded")
  var auth = {
    setAuthButtons: function () {
      var existance = !$.isEmptyObject($.auth.user);

      if (existance) {
        $('#logout').show();
        $('#login').hide();
        $('#signup').hide();
        $('#search').show();
      } else {
        $('#logout').hide();
        $('#login').show();
        $('#signup').show();
        $('#search').hide();
      }
    },
    bindLogOutClick: function () {
      var that = this;

      $('#logout').on('click', function (e) {
        e.preventDefault();
        $.auth.signOut().then(function(resp){
          that.setAuthButtons();
          location.href = "/";
        }).fail(function(resp){
          that.setAuthButtons();
        });
      });
    },
    bindLogInClick: function () {
      var that = this;

      var cb = function (e) {
        e.preventDefault();
        var params = {
          email: $('#login-modal #login-form input[name="email"]').val(),
          password: $('#login-modal #login-form input[name="password"]').val()
        };

        $.auth.emailSignIn(params).then(function(resp){
          $('#login-modal').modal('hide');
          that.setAuthButtons();
        }).fail(function(resp){
          console.log(resp);
        });
      };

      $('#login').on('click', function (e) {
        e.preventDefault();

        $('#login-modal').modal('show');
      });
      $('#login-modal #login-btn').on('click', cb);
      $('#login-modal #login-form').on('submit', cb);
    },
    bindSignUpClick: function () {
      var that = this;

      var cb = function (e) {
        e.preventDefault();

        var params = {
          name: $('#signup-modal #signup-form input[name="name"]').val(),
          email: $('#signup-modal #signup-form input[name="email"]').val(),
          password: $('#signup-modal #signup-form input[name="password"]').val(),
          password_confirmation: $('#signup-modal #signup-form input[name="password_confirmation"]').val()
        };

        $.auth.emailSignUp(params).then(function(user){
          $('#signup-modal').modal('hide');
          that.setAuthButtons();
        }).fail(function(resp){
          console.log(resp);
        });
      };

      $('#signup').on('click', function (e) {
        e.preventDefault();

        $('#signup-modal').modal('show');
      });
      $('#signup-modal #signup-btn').on('click', cb);
      $('#signup-modal #signup-form').on('submit', cb);
    },
    bindFacebookClick: function () {
      $('.fb-login-btn, .fb-signup-btn').on('click', function(e){
        e.preventDefault();
        $.auth.oAuthSignIn({
          provider: 'facebook'
        }).then(function(user) {
          location.href = "/";
        })
        .fail(function(resp) {
          console.log('Authentication failure: ' + resp.errors.join(' '));
        });
      });
    },
    authSettings: function () {
      var that = this;

      $.auth.configure({
        // By default, you only need to configure apiUrl
        // Note that if you put a '/' at the end of the link, there will be errors when calling the api
        apiUrl: location.origin
      }).then(function(resp){
        that.setAuthButtons();
      }).fail(function(resp){
        console.log(resp);
        that.setAuthButtons();
      });
    },
    bindAddFeedsClick: function () {
      $('#search').on('click', function (e) {
        e.preventDefault();

        $('#search-modal').modal('show');
      });
    },
    init: function () {
      this.authSettings();
      this.bindLogOutClick();
      this.bindLogInClick();
      this.bindSignUpClick();
      this.bindFacebookClick();
      this.bindAddFeedsClick();
    }
  };
  auth.init();
});
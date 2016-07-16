$(document).ready(function() {
  // Signup Button auth function
  $('#signup-form').on('submit', function(e){
    e.preventDefault();

    $.auth.emailSignUp({
      email: $('#signup-form input[name="email"]').val(),
      password: $('#signup-form input[name="password"]').val(),
      password_confirmation: $('#signup-form input[name="password_confirmation"]').val()
    }).then(function(resp){
      console.log(resp);
    }).fail(function(resp){
      console.log(resp);
    });
  });

  // Logout Button
  $('#logout-button').on('click', function(e){
    e.preventDefault();
    $.auth.signOut();
  });

  // Login Button
  $('#login-form').on('submit', function(e){
    e.preventDefault();

    $.auth.emailSignIn({
      email: $('#login-form input[name="email"]').val(),
      password: $('#login-form input[name="password"]').val(),
      password_confirmation: $('#login-form input[name="password_confirmation"]').val()
    }).then(function(resp){
      console.log(resp);
    }).fail(function(resp){
      console.log(resp);
    });
  });

});
$(document).ready(function(){

  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight'); 
      } else {
        label.removeClass('highlight');   
      }   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
        label.removeClass('highlight'); 
      } 
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }

  });

  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });

  $('.forgot').on('click', function(){
    alert("We've just sent you an email, please check it !");
  });

  // Sign up
   $("#submit-register").click(function(){
          event.preventDefault();
        var data = {
          "name": $('.first-name').val() + ' ' + $('.last-name').val(),
          "username": $('.new-username').val(),
          "password": $('.new-password').val(),
          "email": $('.new-email').val(),
          "avatar_link": "",
          "gender": "male",
          "date_of_birth": "1996-04-02T17:00:00.000Z",
          "role": "member"
        };
        $.ajax({
            url: 'https://thawing-forest-86527.herokuapp.com/api/sign_up',
            type: 'POST',
            data: JSON.stringify(data),
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(result) {
                document.location.href = 'login.html';
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Check your information again");
            }
        });
    });

    // login
    var token;
    var login = false;
    $(".login").click(function(){
        event.preventDefault();
        var data = {
            "username": $('.username').val(),
            "password": $('.password').val()
        };
        $.ajax({
            url: 'https://thawing-forest-86527.herokuapp.com/api/login',
            type: 'POST',
            data: JSON.stringify(data),
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(result) {
                login = true;
                console.log(result);
                token = result.token;
                document.cookie =
                    "access-token=" + result.token +
                    "; max-age=" + 60*60*24*30 +
                    "; path=/" ;
                document.cookie =
                    "username=" + data.username +
                    "; max-age=" + 60*60*24*30 +
                    "; path=/" ;
                document.location.href = '../index.html';
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Check your information again");
            }
        });
    });

});


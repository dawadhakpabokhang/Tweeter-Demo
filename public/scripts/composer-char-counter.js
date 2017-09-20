function init(){

  $('.tweet-text').on('keyup', function(event) {
    let currentString = $(this).val();
    let counterStart = 140;
    let remainingCharacters = counterStart - currentString.length;
    $(this).siblings('.counter').html(remainingCharacters);
    if (parseInt(remainingCharacters) < 0 ) {
      $(this).siblings('.counter').css('color', 'red');
    } else{
      $(this).siblings('.counter').css('color', 'inherit');
    }
  });

};

window.onload = init;
$(function() {
  //fv-video
  var fvVideo = $('#fv-mov').get(0);
  function VideoPlay(){
    fvVideo.play();
  }
  //
  var tlsclArrow = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 750,
    loop: true
  });
  tlsclArrow
  .add({
    targets: '.bar',
    height: '96',
    translateY: 0,
  })
  .add({
    targets: '.bar',
    translateY: 100,
  });

  //cookie
  if($.cookie("disappear") != "ok"){
    $(".popup").removeClass("ok");
    //intro
    var tl = anime.timeline({
      loop: false,
      easing: 'easeInOutSine',
      begin: function(anim) {
        //$('#copy-title').fadeIn();
      },
      complete: function(anim) {
        $('#splash').addClass('off');
        $('#fv .inner').addClass('on');
        VideoPlay();
      }
    });
    tl
    .add({
      targets: '#copy-title',
      opacity:[1,0],
      duration: 1000,
      delay: 500,
    })
    .add({
      targets: '#bi-logo',
      opacity:[0,1],
      duration: 1000,
      delay: 500,
    })
    .add({
      targets: '#bi-logo',
      opacity:[1],
      duration: 1000,
      delay: 1000,
    });

  } else {
    $(".popup").addClass("ok");
  }

  $('#cookie-btn').on('click',function(){
    $.cookie("disappear", "ok", { expires: 7, path: "/" });
    $(".popup").addClass("ok");
  });

});

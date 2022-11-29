$(function() {
  //fv-video
  var fvVideo = $('#fv-mov').get(0);
  function VideoPlay(){
    fvVideo.play();
  }
  //scrollBar
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
    var fvtl = anime.timeline({
      loop: false,
      easing: 'easeInOutSine',
      begin: function(anim) {
        //$('#copy-title').fadeIn();
      },
      complete: function(anim) {
        $('#splash').addClass('off');
        $('.wrapper, #gmenu').addClass('on');
        VideoPlay();
      }
    });
    fvtl
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
      duration: 500,
      delay: 1000,
    });

  } else {
    $(".popup").addClass("ok");
    $('#splash').addClass('off');
    $('.wrapper #gmenu').addClass('on');
    VideoPlay();
  }
  //cookie判定
  $('#cookie-btn').on('click',function(){
    $.cookie("disappear", "ok", { expires: 7, path: "/" });
    $(".popup").addClass("ok");
  });

  //Slide
  $('#visual .slide').slick({
    autoplay:true,
    autoplaySpeed:6000,
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'linear'
  });

  $('#facility .slide').slick({
    autoplay:false,
    dots: true,
    infinite: true,
    speed: 400,
    centerMode: true,
    centerPadding: '25rem',
    slidesToShow: 1,
    easing: 'easeInExpo',
    responsive: [
  {
    breakpoint: 1081,
    settings: {
      centerMode: true,
      centerPadding: '10rem',
      slidesToShow: 1
    }
  },
  {
    breakpoint: 541,
    settings: {
      centerMode: true,
      centerPadding: '5rem',
      slidesToShow: 1
    }
  }
]
  });
  //tabs
  $( "#tabs" ).tabs({
    active: 0,
    activate: function( event, ui ) { $('#facility .slide').slick('setPosition'); },
    hide: { effect: "fadeOut", duration: 400 }
  });
  $( ".tabs-bottom .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *" )
  .removeClass( "ui-corner-all ui-corner-top" )
  .addClass( "ui-corner-bottom" );
  // move the nav to the bottom
  $( ".tabs-bottom .ui-tabs-nav" ).appendTo( ".tabs-bottom" );

  //hoverImg
  $(".link.banner a").hover(function () {
    $(this).children('img').attr("src",$(this).children("img").attr("src").replace(/^(.+)(\.[a-zA-Z]+)$/, "$1_on$2"))
  },function () {
    $(this).children('img').attr("src",$(this).children("img").attr("src").replace(/^(.+)_on(\.[a-zA-Z]+)$/, "$1$2"));
  });

});

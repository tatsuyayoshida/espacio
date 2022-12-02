$(function() {
  $('.wrapper, #gmenu').addClass('on');
  $('.wrapper .overlay').fadeOut(1000);

  //cookie check
  if($.cookie("disappear") != "ok"){
    $(".popup").removeClass("ok");

  } else {
    $(".popup").addClass("ok");

  }
  //slide
  $('#fv .slide').slick({
    autoplay:true,
    autoplaySpeed:6000,
    arrows:false,
    dots: true,
    pauseOnHover:false,
    infinite: true,
    speed: 1000,
    fade: true,
    lazyLoad: 'ondemand',
    cssEase: 'linear'
  });

  $('#about .upper .slide,#about .lower .slide').slick({
    autoplay:false,
    dots: true,
    infinite: true,
    speed: 400,
    centerMode: true,
    centerPadding: '25rem',
    slidesToShow: 1,
    lazyLoad: 'ondemand',
    easing: 'easeInExpo',
    responsive: [
      {
        breakpoint: 1081,
        settings: {
          centerMode: true,
          centerPadding: '10rem',
          lazyLoad: 'ondemand',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 541,
        settings: {
          centerMode: true,
          centerPadding: '5rem',
          lazyLoad: 'ondemand',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 415,
        settings: {
          centerMode: true,
          centerPadding: '2rem',
          lazyLoad: 'ondemand',
          slidesToShow: 1
        }
      },
    ]
  });

  //hoverImg
  $(".link.banner a.hvr").hover(function () {
    $(this).find('img').attr("src",$(this).find("img").attr("src").replace(/^(.+)(\.[a-zA-Z]+)$/, "$1_on$2"));
  },function () {
    $(this).find('img').attr("src",$(this).find("img").attr("src").replace(/^(.+)_on(\.[a-zA-Z]+)$/, "$1$2"));
  });
  //hoverMov
  var fvVideo = $('#fv-mov').get(0);
  var $elem = $('.mov');
  $(".link.banner a.mov").hover(function () {
    fvVideo.play();
  },function () {
    fvVideo.pause();
  });

  var $isScrolling = 0 ;
  var $timeoutId ;
  $(document).on( "scroll", function () {
    $isScrolling = 1 ;

    clearTimeout( $timeoutId );
    $timeoutId = setTimeout( function () {
      $isScrolling = 0 ;
    }, 100 );
  });

  //cookie判定
  var clickEventCookieOk = (( window.ontouchstart!==null ) ? 'click':'touchend');
  $(document).on(clickEventCookieOk,'#cookie-btn',function(){
    if ($isScrolling === 0) {
      $.cookie("disappear", "ok", { expires: 7, path: "/" });
      $(".popup").addClass("ok");
    }
  });

  //anchorscroll
  var clickEventAnchorType = (( window.ontouchstart!==null ) ? 'click':'touchend');
  $(document).on(clickEventAnchorType,'a.scrl',function(){
    if ($isScrolling === 0) {
      var adjust = -100;
      var speed = 500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top + adjust;
      $('body,html').animate({scrollTop:position}, speed, 'easeInOutSine');
      return false;
    }
  });
  var clickEventSpBtn = (( window.ontouchstart!==null ) ? 'click':'touchend');
  $(document).on(clickEventSpBtn,'#sp-btn,#gmenu .menu a.scrl',function(){
    if ($isScrolling === 0) {
      $('#sp-btn,#menu').toggleClass('on');
    }
  });




});

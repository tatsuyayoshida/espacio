$(function() {
  //fv-video
  var fvVideo = $('#fv-mov').get(0);
  var $elem = $('.mov');
  var sp = '_sp.';
  var pc = '_pc.';
  var replaceWidth = 768;
  function imageSwitch() {
    var windowWidth = parseInt($(window).width());
    $elem.each(function() {
      var $this = $(this);
      if(windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace(sp, pc));
      } else {
        $this.attr('src', $this.attr('src').replace(pc, sp));
      }
    });
  }
  imageSwitch();

  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      imageSwitch();
    }, 100);
  });

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

  //cookie check
  if($.cookie("disappear") != "ok"){
    $(".popup").removeClass("ok");
    //intro
    setTimeout(function(){
      var fvtl = anime.timeline({
        loop: false,
        easing: 'easeInOutSine',
        begin: function(anim) {
          //$('#copy-title').fadeIn();
        },
        complete: function(anim) {
          $('#splash').addClass('off');
          $('.wrapper, #gmenu').addClass('on');
          $('.wrapper .overlay').fadeOut(1000);
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
    },200);
  } else {
    $(".popup").addClass("ok");
    $('#splash').addClass('off');
    $('.wrapper,#gmenu').addClass('on');
    $('.wrapper .overlay').fadeOut(1000);
    VideoPlay();
  }


  //Slide
  $('#visual .slide').slick({
    autoplay:true,
    autoplaySpeed:6000,
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    lazyLoad: 'ondemand',
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
  $(".link.banner a").hover(function () {
    $(this).find('img').attr("src",$(this).find("img").attr("src").replace(/^(.+)(\.[a-zA-Z]+)$/, "$1_on$2"))
  },function () {
    $(this).find('img').attr("src",$(this).find("img").attr("src").replace(/^(.+)_on(\.[a-zA-Z]+)$/, "$1$2"));
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
      $.cookie("disappear", "ok", { expires: 30, path: "/" });
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

  //mailto
  var clickEventMailto = (( window.ontouchstart!==null ) ? 'click':'touchend');
  $(document).on(clickEventMailto,'.mailto',function(){
    if ($isScrolling === 0) {
      var address = $( this ).attr( 'href' ).replace( '+', '@' );
      var subject = $( this ).data( 'subject' );
      var body = $( this ).data( 'body' );
      var obj = {};
      if( subject ) {
        obj['subject'] = subject;
      }
      if( body ) {
        obj['body'] = body + '\n';
      }
      var prm = ( Object.keys( obj ).length ) ? '?' + $.param( obj ) : '';
      location.href = 'mailto:' + address + prm;
      return false;
    }
  });


});

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
    VideoPlay();
  }


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

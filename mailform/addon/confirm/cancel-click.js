
	
	
	
	
	function cancel_click() {
		
		$( 'input#form_submit_button' ).nextAll( 'input' ).remove();
		ios_bugfix();
		
		$( 'div#confirm_field' ).css( 'display', 'none' );
		$( 'div#confirm_field dl' ).html( '' );
		$( 'form#mail_form' ).fadeIn( 'slow' );
		$( 'html, body' ).animate({
			scrollTop: $( 'form#mail_form' ).offset().top - 70
		}, 500 );
		
	}
<?php

		$confirm_body = '';
		
		
		for ( $i = 1; $i < $this->order_count + 1; $i++ ) {
			
			if ( $this->post_isset[$i] !== '' ) {
				if ( $this->order_isset[$i][2] === 'false' ) {
					
					if ( $confirm_body !== '' ) {
						$confirm_body .= '</dd>'.PHP_EOL;
					}
					
					$confirm_body .= ''.PHP_EOL;
					$confirm_body .= '	<dt>'.$this->order_isset[$i][3].'</dt>'.PHP_EOL;
					$confirm_body .= '	<dd>'.nl2br( $this->post_isset[$i] );
					
				} else {
					
					$confirm_body .= '　'.$this->post_isset[$i];
					
				}
			}
			
			if ( $i == $this->order_count ) {
				$confirm_body .= '</dd>'.PHP_EOL;
			}
			
		}
		
		echo 'confirm_successCONFIRM_DELIMITER' . $confirm_body;

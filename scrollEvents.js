/**
 * Creates additional events on scroll to aid the creation of scroll-dependent
 * functionality such as sticky sidebars, sticky menus, animations, etc.
 */
(function($) {
	
	var scrollEvents = {

        /**
         * @var jQueryObject Window object.
         */
        $window : $(),

        /**
         * @var jQueryObject Body object.
         */
        $body : $(),
		
        /**
         * @var int Previous offset from top in pixels.
         */
		last_position : 0,

        /**
         * @var int Current offset from top in pixels.
         */
		current_position : 0,

        /**
         * @var int Height of the viewport in pixels.
         */
		window_height : 0,

        /**
         * @var int Height of the page in pixels.
         */
		body_height : 0,
		
		/**
		 * Enable additional scroll events.
		 */ 
		init : function() {

            // Avoid binding additional events if initialized repeatedly.
            this.destroy();
			
            // Initialize all variables.
            this.$window = $(window);
            this.$body = $('body');
			this.last_position = this.current_position = this.$window.scrollTop();
            this.window_height = this.$window.height();
            this.body_height = this.$body.height();

            // Bind events.
            // Pass scrollEvents as a parameter (as "this" will reference the
            // window object).
            this.$window.on( 'resize', { 'scrollEvents' : this }, this.on_resize );
            this.$window.on( 'scroll', { 'scrollEvents' : this }, this.on_scroll );
			
		},

        /**
		 * Disable additional scroll events.
		 */
        destroy : function() {

            // Reset all variables.
            this.$window = this.$body = $();
            this.last_position = this.current_position = this.window_height = this.body_height = 0;
            
            // Unbind events.
            this.$window.off( 'resize', this.on_resize );
            this.$window.off( 'scroll', this.on_scroll );

        },

        /**
		 * Actions to execute on window resize.
		 */
         on_resize : function( event ) {

            // Got scrollEvents passed through the resize event's data object, as
            // "this" references the window object.
            var _this = event.data.scrollEvents;

            // Update window height
            _this.window_height = _this.$window.height();

            // Update variables that may have changed as a consequence of the
            // resize, and check if the resizing has caused scrolling.
            _this.on_scroll();

        },
		
        /**
		 * Actions to execute on scroll.
		 */
		on_scroll : function( event ) {

            // Got scrollEvents passed through the scroll event's data object, as
            // "this" references the window object.
            var _this = event.data.scrollEvents;
			
            // Update current position.
			_this.current_position = _this.$window.scrollTop();

            // Update body height every time, as it can change due to scroll
            //animations.
            _this.body_height = _this.$body.height();

            // Check which scroll events should be triggered.
            _this.maybe_trigger_scroll_up();
            _this.maybe_trigger_scroll_down();
            _this.maybe_trigger_reached_top();
            _this.maybe_trigger_reached_bottom();

            // Save current position aside for later comparison.
			_this.last_position = _this.$window.scrollTop();

		},        

        /**
		 * If scroll up detected, trigger 'scroll up' event. 
		 */
        maybe_trigger_scroll_up : function() {

			if( this.current_position < this.last_position ) {
				this.$window.trigger( 'ssanzdev_scroll_up', [this.current_position,this.last_position] );
            }

        },

        /**
		 * If scroll down detected, trigger 'scroll down' event. 
		 */
         maybe_trigger_scroll_down : function() {

            if( this.current_position > this.last_position ) {
				this.$window.trigger( 'ssanzdev_scroll_down', [this.current_position,this.last_position] );
            }

        },

        /**
		 * If user has scrolled all the way to the top, trigger 'reached top' event. 
		 */
        maybe_trigger_reached_top : function() {

            if( 0 === this.current_position && 0 !== this.last_position ) {
                this.$window.trigger( 'ssanzdev_scroll_reached_top', [this.last_position] );
            }

        },

        /**
		 * If user has scrolled all the way to the bottom, trigger 'reached bottom' event. 
		 */
        maybe_trigger_reached_bottom : function() {

            var is_bottom_now = this.current_position + this.window_height === this.body_height,
			    was_bottom_before = this.last_position + this.window_height === this.body_height;
			
            if( is_bottom_now && !was_bottom_before ) {
				this.$window.trigger( 'ssanzdev_scroll_reached_bottom', [this.last_position] );
			}

        },
		
	};

    // Add to window object to be able to use it from other files.
	window.ssanzdev_scrollEvents = scrollEvents;
	
})(jQuery);
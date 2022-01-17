# scrollEvents jQuery library
Creates additional events on scroll to aid the creation of scroll-dependent functionality such as sticky sidebars, sticky menus, animations, etc.

For demonstration purposes only.

## Install
Include the jQuery and scrollEvents.js files in your HTML document.
```
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="scrollEvents.js"></script>
```

## Start listening for additional scroll events
Call the window.ssanzdev_scrollEvents.init() function on the document ready event to start listening for additional scroll events.
```
// Start listening for additional scroll events.
window.ssanzdev_scrollEvents.init();
```

## Additional scroll events
### On scroll up
```
$(window).on( 'ssanzdev_scroll_up', function( event, current_position, last_position ) {
    // Actions to execute on scroll up
});
```
### On scroll down
```
$(window).on( 'ssanzdev_scroll_down', function( event, current_position, last_position ) {
    // Actions to execute on scroll down
});
```
### On reach top of the page
```
$(window).on( 'ssanzdev_scroll_reached_top', function( event, last_position ) {
    // Actions to execute when user has scrolled all the way to the top
});
```
### On reach bottom of the page
```
$(window).on( 'ssanzdev_scroll_reached_bottom', function( event, current_position, last_position ) {
    // Actions to execute when user has scrolled all the way to the bottom
});
```

## Stop listening for additional scroll events
Call the window.ssanzdev_scrollEvents.destroy() function to stop listening for additional scroll events.
```
// Stop listening for additional scroll events.
window.ssanzdev_scrollEvents.destroy();
```
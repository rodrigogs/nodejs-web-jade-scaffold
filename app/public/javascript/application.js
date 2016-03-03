'use strict';

var startSlider = function (containerId) {
    var _SlideshowTransitions = [
        {$Duration:700,$Opacity:2,$Brother:{$Duration:1000,$Opacity:2}},
        {$Duration:700,$Opacity:2,$Brother:{$Duration:1000,$Opacity:2}},
        {$Duration:700,$Opacity:2,$Brother:{$Duration:1000,$Opacity:2}},
        {$Duration:700,$Opacity:2,$Brother:{$Duration:1000,$Opacity:2}}
    ];

    var options = {
        $AutoPlay: true,
        $SlideshowOptions: {
                $Class: $JssorSlideshowRunner$,
                $Transitions: _SlideshowTransitions,
                $TransitionsOrder: 1,
                $ShowLink: true
            }
    };
    var jssor_slider = new $JssorSlider$(containerId, options);
};
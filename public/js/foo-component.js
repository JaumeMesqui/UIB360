AFRAME.registerComponent('hover-video', {
    schema: {
        value: { default: '' }
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        el.addEventListener('mouseenter', function () {
            var video = document.getElementById("myVideo");
            video.pause();
        });

        el.addEventListener('mouseleave', function () {
            var video = document.getElementById("myVideo");
            video.play();
        });
    }
});


AFRAME.registerComponent('foo', {

    init: function () {
        this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);
    },

    tick: function () {
        ComprovarPunts();
        
    }

});



/*
AFRAME.registerComponent('video-handler', {
    init: function () {
        let el = this.el;
        let video = el.getAttribute('src');
        console.log(video)
        video.pause();
        el.addEventListener('mouseenter', function () {
            video.play();
        });
        el.addEventListener('mouseleave', function () {
            video.pause();
        });
    }
});
*/

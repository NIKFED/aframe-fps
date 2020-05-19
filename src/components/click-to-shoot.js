/**
 * Click mouse to shoot.
 */
AFRAME.registerComponent('click-to-shoot', {
    init: function () {
        document.body.addEventListener('keyup', () => {
            if (event.keyCode === 32) { // Space
                this.el.emit('shoot');
                ASHOOTER.currentScore.shoots++;
            }
        });
    }
});

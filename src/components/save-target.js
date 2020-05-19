AFRAME.registerComponent('save-target', {
    schema: {
        rotation: {
            x: 0,
            y: 0,
            z: 0
        }
    },

    init: function () {
        this.el.addEventListener('save-target-died', this.saveTargetDied.bind(this));
        this.el.setAttribute('target', {
            healthPoints: ASHOOTER.settings.healthSaveTarget
        });
    },

    tick: function () {
        this.el.object3D.rotation.set(
            THREE.Math.degToRad(this.schema.rotation.x),
            THREE.Math.degToRad(this.schema.rotation.y++),
            THREE.Math.degToRad(this.schema.rotation.z)
        );

    },

    saveTargetDied: function () {
        console.log('Save target die');
        this.el.parentNode.removeChild(this.el);
        let sceneEl = document.querySelector('a-scene');
        sceneEl.emit('end-game');
    },
});

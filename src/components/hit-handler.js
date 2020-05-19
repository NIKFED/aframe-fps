/**
 * Change color when hit.
 */
AFRAME.registerComponent('hit-handler', {
    dependencies: ['material'],

    init: function () {
        var el = this.el;

        el.addEventListener('hit', () => {
            if (el.id === 'saveTarget') {
                document.getElementById('damageSaveTarget').components.sound.playSound();
            } else if (el.className === 'enemy') {
                console.log('hit enemy');
                document.getElementById('damageEnemy').components.sound.playSound();
            }
        });

        el.addEventListener('die', () => {
            if (el.id === 'saveTarget') {
                document.getElementById('damageSaveTarget').components.sound.playSound();
                el.emit('save-target-died');
            } else if (el.className === 'enemy') {
                document.getElementById('damageEnemy').components.sound.playSound();
                ASHOOTER.currentScore.points++;
                switch(this.el.id.substring(this.el.id.length - 1, this.el.id.length)) {
                    case '1':
                        ASHOOTER.enemy.isEnemy1Die = true;
                        break;
                    case '2':
                        ASHOOTER.enemy.isEnemy2Die = true;
                        break;
                }
                el.emit('enemy-died');
            }
        });
    }
});

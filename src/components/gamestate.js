/* global AFRAME */
import Inscription from "../basic/inscription";
import Score from "../basic/score";

AFRAME.registerComponent('gamestate', {
    schema: {
        isStart: {default: false}
    },

    init: function () {
        this.getUserName();
        this.schema.isStart = false;
        // sound
        document.getElementById('mainThemeMusic').components.sound.playSound();
        // Inscription
        ASHOOTER.currentScore.inscription = new Inscription('Start Game',
            '0 0 0.5',
            '0 0 0',
            'menu');
        ASHOOTER.currentScore.inscription.createEntity();

        // bindings
        this.el.addEventListener("start-game", this.startGame.bind(this));
        this.el.addEventListener("end-game", this.endGame.bind(this));

    },

    getUserName: function () {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', evt => {

            if (xhr.status == 200) {
                let response = JSON.parse(xhr.response);
                ASHOOTER.currentScore.name = response.nick;
            }
        });

        xhr.open('get', '/api/username/get', true);
        xhr.send();
    },

    startGame: function () {
        if (!this.schema.isStart) {
            console.log('start game');
            this.schema.isStart = true;
            let enemies = document.getElementById('enemies');

            enemies.emit('spawn-enemy');
        }
    },

    endGame: function () {
        console.log('End game');
        ASHOOTER.currentScore.inscription.name = 'End Game';
        ASHOOTER.currentScore.inscription.changeInscription('yellow');
        ASHOOTER.currentScore.inscription.changePosition('0 2.0 0.5');

        // Score
        let scoreInscription = new Inscription('Score',
            '-3 0.5 0.5',
            '0 0 0',
            'menu');
        scoreInscription.createEntity();
        ASHOOTER.currentScore.score = new Score(ASHOOTER.currentScore.points,
            '1.5 0.5 0.5',
            '0 0 0',
            'menu');
        ASHOOTER.currentScore.score.createEntity();

        let transitionResult = new Inscription('press enter for results',
            '0 -1.6 0.5',
            '0 0 0',
            'menu');
        transitionResult.createEntity();
        transitionResult.inscription.setAttribute('transition-results', '');
        transitionResult.inscription.setAttribute('text', {
            width: 20
        });
        transitionResult.changeInscription('grey');

        // Enemy shoot stop
        let enemies = document.getElementById('enemies');

        enemies.emit('enemies-stop-shoot');

        // Output results
        const xhr = new XMLHttpRequest();

        xhr.open('post', '/api/username/result', true);

        let formData = new FormData();
        formData.append("username", ASHOOTER.currentScore.name);
        formData.append("score", ASHOOTER.currentScore.points);

        xhr.send(formData);
    }
});

AFRAME.registerComponent('start-game', {
    init: function () {
        let el = this.el;

        el.addEventListener('die', () => {
            if (!this.schema.isStart) {
                ASHOOTER.currentScore.inscription.name = 'Shoot enemies';
                ASHOOTER.currentScore.inscription.changeInscription('green');

                let sceneEl = document.querySelector('a-scene');
                sceneEl.emit('start-game');
            }
        });
    }
});

AFRAME.registerComponent('transition-results', {
    init: function () {
        document.addEventListener('keydown', this.transitionResults.bind(this));
    },

    transitionResults: function () {
        if (event.keyCode === 13) { // Enter
            window.location.href = '/results';
        }
    }
});

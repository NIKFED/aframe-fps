import Enemy from "../basic/enemy";
import getRandomInt from "../basic/mathFunction";

AFRAME.registerComponent('enemies', {
    schema: {
        isStart: {default: false},
        enemy1: {default: null},
        enemy2: {default: null},
        enemy1Posiiton: {default: null},
        enemy2Posiiton: {default: null},
        timerId1: {default: null},
        timerId2: {default: null},
        timerMovementId1: {default: null},
        timerMovementId2: {default: null},
        arrayPosition: []
    },

    init: function () {
        this.el.addEventListener('enemy-died', this.enemyDied.bind(this));
        this.el.addEventListener('spawn-enemy', this.spawnEnemies.bind(this));
        // this.el.addEventListener('enemy-shoot', this.enemyShoot.bind(this));
        this.el.addEventListener('enemies-stop-shoot', this.enemiesStopShoot.bind(this));
    },

    tick: function () {
        if (this.schema.enemy1.isMovement) {
            let el = document.getElementById(this.schema.enemy1.getNameModelByIndex()).object3D;
            el.position.y += 0.01 * ASHOOTER.settings.enemyMovement;
            if (el.position.y >= 3.0) {
                this.schema.enemy1.isMovement = false;
                setTimeout( () => {
                    this.enemyShoot(this.schema.enemy1);
                }, 1000);
            }
        }
        if (this.schema.enemy2.isMovement) {
            let el = document.getElementById(this.schema.enemy2.getNameModelByIndex()).object3D;
            el.position.y += 0.01 * ASHOOTER.settings.enemyMovement;
            if (el.position.y >= 3.0) {
                this.schema.enemy2.isMovement = false;
                setTimeout( () => {
                    this.enemyShoot(this.schema.enemy2);
                }, 1000);
            }
        }
    },

    spawnEnemies: function () {
        console.log('log isEnemy1Die:');
        console.log(ASHOOTER.enemy.isEnemy1Die);
        console.log('log isEnemy2Die:');
        console.log(ASHOOTER.enemy.isEnemy2Die);
        // create enemies
        if (ASHOOTER.enemy.isEnemy1Die) {
            this.createEnemyCharacter(1);
        }

        if (ASHOOTER.enemy.isEnemy2Die) {
            this.createEnemyCharacter(2);
        }
    },

    createEnemyCharacter: function (number) {
        let seed;
        do {
            seed = getRandomInt(4);
        } while (this.schema.arrayPosition.includes(seed));
        this.schema.arrayPosition.push(seed);
        let positionEnemy;
        let rotationEnemy;
        switch (seed) {
            case 0:
                positionEnemy = ASHOOTER.enemyInfo.enemy1.position;
                rotationEnemy = ASHOOTER.enemyInfo.enemy1.rotation;
                break;
            case 1:
                positionEnemy = ASHOOTER.enemyInfo.enemy2.position;
                rotationEnemy = ASHOOTER.enemyInfo.enemy2.rotation;
                break;
            case 2:
                positionEnemy = ASHOOTER.enemyInfo.enemy3.position;
                rotationEnemy = ASHOOTER.enemyInfo.enemy3.rotation;
                break;
            case 3:
                positionEnemy = ASHOOTER.enemyInfo.enemy4.position;
                rotationEnemy = ASHOOTER.enemyInfo.enemy4.rotation;
                break;
        }
        switch (number) {
            case 1:
                this.schema.enemy1Posiiton = seed;
                ASHOOTER.enemy.isEnemy1Die = false;
                console.log('spawn 1 enemy');
                this.schema.enemy1 = new Enemy('1',
                    positionEnemy,
                    rotationEnemy,
                    'enemies',
                    'stitch');
                this.schema.enemy1.createEntity();
                this.schema.enemy1.isMovement = true;
                break;
            case 2:
                this.schema.enemy2Posiiton = seed;
                ASHOOTER.enemy.isEnemy2Die = false;
                console.log('spawn 2 enemy');
                this.schema.enemy2 = new Enemy('2',
                    positionEnemy,
                    rotationEnemy,
                    'enemies',
                    'yuna');
                this.schema.enemy2.createEntity();
                this.schema.enemy2.isMovement = true;
                break;
        }
    },

    enemyDied: function () {
        if (ASHOOTER.enemy.isEnemy1Die) {
            console.log('dead enemy 1');
            console.log(this.schema.arrayPosition);
            this.schema.arrayPosition = this.schema.arrayPosition.filter(item => item !== this.schema.enemy1Posiiton);
            this.enemyStopShoot('1');
            this.removeEnemy(this.schema.enemy1);
        }
        if (ASHOOTER.enemy.isEnemy2Die) {
            console.log('dead enemy 2');
            console.log(this.schema.arrayPosition);
            this.schema.arrayPosition = this.schema.arrayPosition.filter(item => item !== this.schema.enemy2Posiiton);
            this.enemyStopShoot('2');
            this.removeEnemy(this.schema.enemy2);
        }
    },

    removeEnemy: function (enemy) {
        this.el.removeChild(document.getElementById(enemy.name));

        setTimeout( () => {
            this.spawnEnemies();
        }, 1000 * ASHOOTER.settings.enemySpawn);
    },

    enemyShoot: function (enemy) {
        if (enemy.index === '1') {
            console.log('Enemy1: I\'m shoot');
            this.schema.timerId1 = setInterval(() => {
                enemy.camera.emit('shoot');
            }, ASHOOTER.settings.enemyShoot * 1000);
        } else {
            console.log('Enemy2: I\'m shoot');
            this.schema.timerId2 = setInterval(() => {
                enemy.camera.emit('shoot');
            }, ASHOOTER.settings.enemyShoot * 1000);
        }
    },

    enemyStopShoot: function (index) {
        if (index === '1') {
            console.log('Enemy1: I\'m stop shoot');
            clearTimeout(this.schema.timerId1);
        }
        else {
            console.log('Enemy2: I\'m stop shoot');
            clearTimeout(this.schema.timerId2);
        }
    },

    enemiesStopShoot: function () {
        console.log('All stop shoot');
        clearTimeout(this.schema.timerId1);
        clearTimeout(this.schema.timerId2);
    }
});

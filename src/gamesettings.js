/* global AFRAME settings */
ASHOOTER.settings = {
    healthSaveTarget: 12, // Здоровье защищаемого объекта
    healthEnemy: 3, // Здоровье врагов
    enemyShoot: 5, // Скорость стрельбы врагов
    enemyMovement: 3, // Скорость передвижения врагов,
    enemySpawn: 0.5 // Частота спавна врагов
};

ASHOOTER.currentScore = {
    name: '',
    points: 0,
    inscription: null,
    score: null,
    shoots: 0
};

ASHOOTER.enemy = {
    isEnemy1Die: true,
    isEnemy2Die: true,
    isEnemy3Die: false,
    isEnemy4Die: false
};

var Enemy = pc.createScript('enemy');

// initialize code called once per entity
Enemy.prototype.initialize = function() {
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.collision.on('contact', this.duringContact, this);
};


Enemy.prototype.onCollisionStart = function (result) {
    if (result.other.name == "enemy1" || result.other.name == "ENEMYTYPE1") {
         if (this.entity.getPosition().y > result.other.getPosition().y) {
            result.other.destroy();
        }
    }
}

Enemy.prototype.duringContact = function (result1) {
    if (result1.other.name == "enemy1" || result1.other.name == "ENEMYTYPE1") {
         if (this.entity.anim.baseLayer.activeState === 'Punch') {
            result1.other.destroy();
        }
    }
}

// update code called every frame
Enemy.prototype.update = function(dt) {

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Enemy.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/
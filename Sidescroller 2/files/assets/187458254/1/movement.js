var Movement = pc.createScript('movement');

Movement.attributes.add('speed', {
    type: 'number',    
    default: 0.1,
    min: 0.05,
    max: 0.5,
    precision: 2,
    description: 'Controls the movement speed'
});

// initialize code called once per entity
Movement.prototype.initialize = function() {
    this.force = new pc.Vec3();
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.canJump = 1;
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.keyDown, this);
    this.app.keyboard.on(pc.EVENT_KEYUP, this.keyUp, this);
};

Movement.prototype.onCollisionStart = function (result) {
    if (result.other.rigidbody) {
        this.canJump = 1;
    }
}

// update code called every frame
Movement.prototype.update = function(dt) {
    
    if (this.app.keyboard.wasPressed(pc.KEY_P) && (this.entity.anim.baseLayer.activeState !== 'Punch')) {
        this.entity.anim.setBoolean('Punch', true);
    }

    if (this.app.keyboard.wasReleased(pc.KEY_P) && (this.entity.anim.baseLayer.activeState === 'Punch')) {
        this.entity.anim.setBoolean('Punch', false);
    }

    if (this.app.keyboard.wasPressed(pc.KEY_SPACE) && (this.entity.anim.baseLayer.activeState !== 'Jump')) {
        this.entity.anim.setBoolean('Jump', true);
    }

    if (this.app.keyboard.wasReleased(pc.KEY_SPACE) && (this.entity.anim.baseLayer.activeState === 'Jump')) {
        this.entity.anim.setBoolean('Jump', false);
    }

    if (this.app.keyboard.wasPressed(pc.KEY_LEFT) && (this.entity.anim.baseLayer.activeState !== 'Run')) {
        this.entity.anim.setBoolean('Run', true);
    }

    if (this.app.keyboard.wasReleased(pc.KEY_LEFT) && (this.entity.anim.baseLayer.activeState === 'Run')) {
        this.entity.anim.setBoolean('Run', false);
    }

    if (this.app.keyboard.wasPressed(pc.KEY_RIGHT) && (this.entity.anim.baseLayer.activeState !== 'Run')) {
        this.entity.anim.setBoolean('Run', true);
    }

    if (this.app.keyboard.wasReleased(pc.KEY_RIGHT) && (this.entity.anim.baseLayer.activeState === 'Run')) {
        this.entity.anim.setBoolean('Run', false);
    }

     if (this.app.keyboard.wasPressed(pc.KEY_UP) && (this.entity.anim.baseLayer.activeState !== 'Run')) {
        this.entity.anim.setBoolean('Run', true);
    }

    if (this.app.keyboard.wasReleased(pc.KEY_UP) && (this.entity.anim.baseLayer.activeState === 'Run')) {
        this.entity.anim.setBoolean('Run', false);
    }

    if (this.app.keyboard.wasPressed(pc.KEY_DOWN) && (this.entity.anim.baseLayer.activeState !== 'Run')) {
        this.entity.anim.setBoolean('Run', true);
    }

     if (this.app.keyboard.wasPressed(pc.KEY_DOWN) && (this.entity.anim.baseLayer.activeState === 'Run')) {
        this.entity.anim.setBoolean('Run', false);
    }


  
    var forceX = 0;
    var forceZ = 0;

    // calculate force based on pressed keys
    if (this.app.keyboard.isPressed(pc.KEY_LEFT)) {
        forceX = -this.speed;
    } 

    if (this.app.keyboard.isPressed(pc.KEY_RIGHT)) {
        forceX += this.speed;
    }

    if (this.app.keyboard.isPressed(pc.KEY_UP)) {
        forceZ = -this.speed;
    } 

    if (this.app.keyboard.isPressed(pc.KEY_DOWN)) {
        forceZ += this.speed;
    }

    this.force.x = forceX;
    this.force.z = forceZ;

    // if we have some non-zero force
    if (this.force.length()) {

        // calculate force vector
        var rX = Math.cos(-Math.PI * 0.25);
        var rY = Math.sin(-Math.PI * 0.25);
        this.force.set(this.force.x * rX - this.force.z * rY, 0, this.force.z * rX + this.force.x * rY);

        // clamp force to the speed
        if (this.force.length() > this.speed) {
            this.force.normalize().scale(this.speed);
        }
    }

    // apply impulse to move the entity
    this.entity.rigidbody.applyImpulse(this.force);
};    

//jump mechanic
Movement.prototype.onKeyDown = function (event) {
    if (event.key == pc.KEY_SPACE && this.canJump == 1) {
    this.entity.rigidbody.applyImpulse(0, 2, 0);
    this.canJump = 0;
    } 
}

var EnemyAI = pc.createScript('enemyAI');

// Expose the range and speed properties to the PlayCanvas editor
EnemyAI.attributes.add('range', { type: 'number', default: 10, title: 'Detection Range' });
EnemyAI.attributes.add('speed', { type: 'number', default: 5, title: 'Movement Speed' });

// Initialize code called once per entity
EnemyAI.prototype.initialize = function() {
    // Find the player entity by name
    this.player = this.app.root.findByName('PlayerCharacter');
    
    if (!this.player) {
        console.error('Player entity with the name "PlayerCharacter" was not found.');
        return;
    }
};

// Update code called every frame
EnemyAI.prototype.update = function(dt) {
    if (!this.player) return;

    // Get the position of the enemy and the player
    var enemyPos = this.entity.getPosition();
    var playerPos = this.player.getPosition();

    // Calculate the distance between the enemy and the player
    var distance = enemyPos.distance(playerPos);

    // Check if the player is within the specified range
    if (distance < this.range) {
        // Calculate direction to the player
        var direction = playerPos.clone().sub(enemyPos).normalize();

        // Move towards the player
        this.entity.rigidbody.applyForce(direction.scale(this.speed));
    }
};



// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// EnemyAi.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/
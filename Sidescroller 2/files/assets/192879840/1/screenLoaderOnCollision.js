var SceneLoaderOnCollision = pc.createScript('sceneLoaderOnCollision');

// Initialize the script
SceneLoaderOnCollision.prototype.initialize = function() {
    // Find the player character and invisible wall entities
    this.player = this.app.root.findByName('PlayerCharacter');
    this.invisibleWall = this.app.root.findByName('InvisibleWall'); //have to decide betwen scene loader or tile generator
    
    if (!this.player || !this.invisibleWall) {
        console.error('PlayerCharacter or InvisibleWall not found in the scene.');
        return;
    }
    
    // Listen for collision events
    this.invisibleWall.collision.on('collisionstart', this.onCollisionStart, this);
};

// Collision start event handler
SceneLoaderOnCollision.prototype.onCollisionStart = function (result) {
    // Check if the collision is with the player
    if (result.other === this.player) {
        // Load a new scene
        this.loadNewScene('newSceneName'); //have to change name still
    }
};

// Function to load a new scene
SceneLoaderOnCollision.prototype.loadNewScene = function (sceneName) {
    this.app.loadScene(sceneName, function (err, result) {
        if (err) {
            console.error('Failed to load scene:', err);
        } else {
            console.log('Scene loaded successfully:', sceneName);
        }
    });
};

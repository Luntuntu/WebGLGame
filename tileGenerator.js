var TileGenerator = pc.createScript('tileGenerator');

// Initialize the script
TileGenerator.prototype.initialize = function() {
    // Find the player character and invisible wall entities
    this.player = this.app.root.findByName('PlayerCharacter');
    this.invisibleWall = this.app.root.findByName('InvisibleWall');
    
    if (!this.player || !this.invisibleWall) {
        console.error('PlayerCharacter or InvisibleWall not found in the scene.');
        return;
    }
    
    // Listen for collision events
    this.invisibleWall.collision.on('collisionstart', this.onCollisionStart, this);

    // Setup tile properties
    this.tileSize = 10; // Size of each tile
    this.tileSpacing = 1; // Space between tiles
    this.tilePrefab = this.app.assets.find('plane', 'asset').resource; // Assumes "plane" asset is named "plane" in assets
};

// Collision start event handler
TileGenerator.prototype.onCollisionStart = function (result) {
    // Check if the collision is with the player
    if (result.other === this.player) {
        this.generateTiles();
    }
};

// Function to generate tiles
TileGenerator.prototype.generateTiles = function () {
    var startX = -50;
    var startZ = -50;
    var endX = 50;
    var endZ = 50;
    
    for (var x = startX; x <= endX; x += this.tileSize + this.tileSpacing) {
        for (var z = startZ; z <= endZ; z += this.tileSize + this.tileSpacing) {
            var tile = new pc.Entity();
            tile.addComponent('model', {
                type: 'plane'
            });
            tile.setLocalPosition(x, 0, z);
            this.app.root.addChild(tile);
        }
    }
};

// Create a new script in PlayCanvas named 'aiMovement'
var AiMovement = pc.createScript('aiMovement');

// Initialize the script
AiMovement.prototype.initialize = function() {
    // Speed of movement
    this.speed = 1; // Units per second
    // Distance to move forward and backward
    this.distance = 3; // Units
    // Direction of movement (1 for forward, -1 for backward)
    this.direction = 1;
    // Track how far the entity has moved
    this.traveled = 0;
};

// Update the script every frame
AiMovement.prototype.update = function(dt) {
    // Calculate the movement delta
    var move = this.speed * dt * this.direction;
    
    // Move the entity along its local Z-axis
    this.entity.translateLocal(0, 0, move);
    
    // Update the traveled distance
    this.traveled += move;

    // Check if the entity has moved beyond the distance threshold
    if (Math.abs(this.traveled) >= this.distance) {
        // Reverse direction
        this.direction *= -1;
        // Reset the traveled distance for the new direction
        this.traveled = 0;
    }
};

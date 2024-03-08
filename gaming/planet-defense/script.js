class Planet {
    constructor() {
        this.x = 400;
        this.y = 600;
        this.radius = 80;
    
}
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        context.stroke();
        
    }
}

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    const planet = new Planet();
    planet.draw(ctx);
});
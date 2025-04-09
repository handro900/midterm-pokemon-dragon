document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    const dragonImage = new Image();
    dragonImage.src = 'https://obi2.kean.edu/~ykumar@kean.edu/dragon.jpg';

    const itemImage = new Image();
    itemImage.src = 'https://obi2.kean.edu/~ykumar@kean.edu/goat.png';
    const obstacleImage = new Image();
    obstacleImage.src = 'https://obi2.kean.edu/~ykumar@kean.edu/obstacle.jpg';
    let dragon = {
        x: 100,
        y: 300,
        width: 50,
        height: 50,
        speed: 5
    };
    let items = [];
    let obstacles = [];
    let score = 0;
    let gameOver = false;
    function spawnItems() {
        items.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - 30),
            width: 30,
            height: 30
        });
    }
    function spawnObstacles() {
        obstacles.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - 30),
            width: 30,
            height: 30
        });
    }
    function update() {
        if (gameOver) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (keys['ArrowUp'] && dragon.y > 0) {
            dragon.y -= dragon.speed;
        }
        if (keys['ArrowDown'] && dragon.y < canvas.height - dragon.height) {
            dragon.y += dragon.speed;
        }
        items.forEach(item => {
            item.x -= 5;
            if (item.x + item.width < 0) {
                items.shift();
            }
            if (dragon.x < item.x + item.width &&
                dragon.x + dragon.width > item.x &&
                dragon.y < item.y + item.height &&
                dragon.y + dragon.height > item.y) {
                score += 10;
                items.shift();
            }
        });
        obstacles.forEach(obstacle => {
            obstacle.x -= 5;
            if (obstacle.x + obstacle.width < 0) {
                obstacles.shift();
            }
            if (dragon.x < obstacle.x + obstacle.width &&
                dragon.x + dragon.width > obstacle.x &&
                dragon.y < obstacle.y + obstacle.height &&
                dragon.y + dragon.height > obstacle.y) {
                gameOver = true;
                alert('Game Over! Final Score: ' + score);
                document.location.reload();
            }
        });
        draw();
    }
    function draw() {
        ctx.drawImage(dragonImage, dragon.x, dragon.y, dragon.width, dragon.height);
        items.forEach(item => {
            ctx.drawImage(itemImage, item.x, item.y, item.width, item.height);
        });
        obstacles.forEach(obstacle => {
            ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 20);
    }
    let keys = {};
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
    setInterval(spawnItems, 2000);
    setInterval(spawnObstacles, 3000);
    setInterval(update, 1000 / 60);
});

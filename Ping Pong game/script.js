document.addEventListener("DOMContentLoaded", () => {
  //targetting the ball variable
  let table = document.getElementById("ping-pong-table");
  let paddle = document.getElementById("paddle");
  let ball = document.getElementById("ball");

  //here the ballX and ballY will be helping us to set a starting point
  let ballX = 10; //distance of the top of the ball wrt ping pong table
  let ballY = 10; //distance of the left of the ball wrt ping pong table

  let dx = 2; //displacement factor in x-direction 2-> you will displace 2px in +x direction, -2 means you will displace 2px in -x direction
  let dy = 2; //displacement factor in y-direction
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  setInterval(function exec() {
    ballX += dx;
    ballY += dy;

    ball.style.top = `${ballY}px`;
    ball.style.left = `${ballX}px`;

    // if (ballX > 680 || ballX <= 0) dx *= -1;
    // if (ballY > 380 || ballY <= 0) dy *= -1;
    if (ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) dx *= -1; //change X direction
    if (ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) dy *= -1;
  }, 1);

  let paddleY = 0;
  let dPY = 5; //displacement for paddle in Y direction

  document.addEventListener("keydown", (event) => {
    if (event.keyCode == 38 && paddleY > 0) {
      //up arrow key is pressed
      paddleY += -1 * dPY;
    } else if (
      event.keyCode == 40 &&
      paddleY < table.offsetHeight - paddle.offsetHeight
    ) {
      //down arrow
      paddleY += dPY;
    }
    paddle.style.top = `${paddleY}px`;
  });
});

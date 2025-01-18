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
    /**
     * ballX < paddle.offsetLeft + paddle.offsetWidth -> if left(wrt table) of the paddle  < right(wrt table) of the paddle
     * ballY > paddle.offsetTop -> If top(wrt table) of ball > top (wrt table) of paddle
     * ballY + ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight ->
     * ballY + ball.offsetHeight -> bottom of ball
     * paddle.offsetTop + paddle.offsetHeight ->bottom of paddle
     */
    if (
      ballX < paddle.offsetLeft + paddle.offsetWidth &&
      ballY > paddle.offsetTop &&
      ballY + ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight
    ) {
      dx *= -1;
    }

    if (ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) dx *= -1; //change X direction
    if (ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) dy *= -1;
  }, 1);

  let paddleY = 0;
  let dPY = 20; //displacement for paddle in Y direction

  document.addEventListener("keydown", (event) => {
    event.preventDefault(); //preventsdefault scrolling behaviour of up and down keys
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

  document.addEventListener("mousemove", (event) => {
    let mouseDistanceFromTop = event.clientY; //this is the distance of the mouse point from the top of the screen
    let distanceOfTableFromTopofScreen = table.offsetTop;
    let mousePointControl =
      mouseDistanceFromTop -
      distanceOfTableFromTopofScreen -
      paddle.offsetHeight / 2;
    paddleY = mousePointControl;
    if (paddleY <= 0 || paddleY > table.offsetHeight - paddle.offsetHeight)
      return; //if bottom of the paddle touches bottom if the table
    paddle.style.top = `${paddleY}px`;
  });
});

# bowling

In september of 2020 I got the following programming task from one of my job applications. I decided to do it again in javascript and see how much I have improved. I'm aiming to write clean and testable code.

## task

Write a function that calculates the total score of a bowling game. It has one parameter, a string that represents the game. And returns the total score as a number.

### rules of the game

- Each frame consists of throwing the ball - at maximum - twice to knock down all the pins
- If you knock down all the pins with the first ball, it is called a "strike"
- If you knock down all the pins with the second ball, it is called a "spare"
- Each games consists of ten frames. If you bowl a strike in the tenth frame, you get two more balls. If you throw a spare, you get one more ball.
- Open frames are frames without a strike or spare
- Scoring is based on the number of pins you knock down. However, if you bowl a spare, you get to add the pins in your next ball to that frame. For strikes, you get the next two balls.

### parameter string

- frames are separated with one - and only one - space, there are no leading or trailing spaces
- a strike is represented by an "x"
- a miss - when no pins were knocked down - is represented by a "-"
- if both balls miss in a frame, the frame is represented by only one "-"
- spares end with "/"
- the number of pins knocked down is reresented by numbers

#### examples

- x x x x x x x x x x x x -> 300
- x 35 9/ -7 -/ x 12 51 - 4/ x -> 105

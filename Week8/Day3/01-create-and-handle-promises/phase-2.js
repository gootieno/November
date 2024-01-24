function stretch(timeLeft) {
  // refactor your code from phase 1
  // Your code here
  return new Promise((resolve, reject) => {
    if (timeLeft < 1000) {
      reject([
        "Error: you don't have enough time to lift weights",
        "another thing that failed",
      ]);
    } else {
      setTimeout(() => {
        timeLeft -= 1000;
        resolve(timeLeft);
        console.log("done stretching");
      }, 1000);
    }
  });
}

function runOnTreadmill(timeLeft) {
  // refactor your code from phase 1
  // Your code here
  return new Promise((resolve, reject) => {
    if (timeLeft < 500) {
      reject("Error: you don't have enough time to run on treadmill");
    } else {
      setTimeout(() => {
        timeLeft -= 500;
        resolve(timeLeft);
        console.log("done running");
      }, 500);
    }
  });
}

function liftWeights(timeLeft) {
  // refactor your code from phase 1
  // Your code here
  return new Promise((resolve, reject) => {
    if (timeLeft < 2000) {
      reject("Error: you don't have enough time to lift weights");
    } else {
      setTimeout(() => {
        timeLeft -= 2000;
        resolve(timeLeft);
        console.log("done lifting weights");
      }, 2000);
    }
  });
}

// function workout(totalTime) {
//   // refactor your code from phase 1
//   // Your code here
//   stretch(totalTime)
//     .then((timeLeftAfterStretching) => runOnTreadmill(timeLeftAfterStretching))
//     .then((timeLeftAfterRunning) => liftWeights(timeLeftAfterRunning))
//     .then((timeLeft) =>
//       console.log(`done working out with ${timeLeft / 1000} seconds left`)
//     )
//     .catch((error) => console.log(error));

// }

const workout = async (totalTime) => {
  const timeLeftAfterStretching = await stretch(totalTime);
  const timeLeftAfterRunning = await runOnTreadmill(timeLeftAfterStretching);
  const timeLeft = await liftWeights(timeLeftAfterRunning);
  console.log(`done working out with ${timeLeft / 1000} seconds left`);
};

/* ============================ TEST YOUR CODE ============================

Comment in each invocation of your workout function below and run the file
(node phase-2.js) to see if you get the expected output.
*/

// workout(500);
// should print out the following:
// Error:  you dont have enough time to stretch

// workout(1000);
// should print out the following:
// done stretching
// Error:  you dont have enough time to run on treadmill

// workout(2000);
// should print out the following:
// done stretching
// done running on treadmill
// Error:  you dont have enough time to lift weights

workout(4000);
// should print out the following:
//   done stretching
//   done running on treadmill
//   done lifting weights
//   done working out with 0.5 seconds left

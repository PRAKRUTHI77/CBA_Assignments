<!DOCTYPE html>
<html>
<body>
    <h1>Check the Console for results!</h1>
<script>
// Let's pretend the student scored 85
var score = 85;

console.log("Student Score:", score);

// Check if they passed or failed
if (score >= 50) {
  console.log("Result: PASS - Great job!");
} else {
  console.warn("Result: FAIL - Needs improvement.");
}

// Just a sanity check to see if the score is valid
if (score < 0) {
  console.error("Error: Score cannot be negative!");
}
</script>
</body>
</html>
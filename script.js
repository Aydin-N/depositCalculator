const goal = document.getElementById("goal")
const year = document.getElementById("year")
const result = document.getElementById("result")
const button = document.getElementById("calculate")
const goalMessage = document.getElementById("goalMessage")
const yearMessage = document.getElementById("yearMessage")
let goalValue = false
let yearValue = false
let g
let y
let irr = 0.08

// Goal Value Validation
goal.addEventListener("focus", function(){
  goal.value = goal.value.replace("$", "")
})
goal.addEventListener("blur", function(){
  if (parseInt(goal.value).toString() == goal.value) {
    g = parseInt(goal.value)
    goal.value = "$" + goal.value
    goalMessage.innerHTML = ""
  } else if (parseFloat(goal.value).toString() == goal.value) {
    g = parseFloat(goal.value)
    goalMessage.innerHTML = ""
  } else if (goal.value == "") {
    goalValue = false
    return goalMessage.innerHTML = "*Amount field cannot be left empty"
  } else {
    goalValue = false
    return goalMessage.innerHTML = "*Unallowed Character"
  }
  goalValue = true
})

// Year Value Validation
year.addEventListener("blur", function(){
  if (parseInt(year.value).toString() == year.value) {
    if(year.value <= 100 && year.value > 0){
      y = parseInt(year.value)
      yearMessage.innerHTML = ""
    } else { yearMessage.innerHTML = "*Year must be between 1 and 100" }
  } else if (parseFloat(year.value).toString() == year.value) {
    yearValue = false
    return yearMessage.innerHTML = "*Year must be an integer"
  } else if (goal.value == "") {
    yearValue = false
    return yearMessage.innerHTML = "*Year field cannot be left empty"
  } else {
    yearValue = false
    return yearMessage.innerHTML = "*Unallowed Character"
  }
  yearValue = true
})

// Checking Conditions
button.addEventListener("click", function(){
  if (goalValue && yearValue) { calculateDeposit() }
})

function toPower(num, pow){
  let output = num
  let round = 1
  while(round<pow){
    output *= num
    output = parseFloat(output.toFixed(5))
    round++
  }
  return output
}
//Calculating Monthly Deposits
function calculateDeposit(){
  let rate = parseFloat((irr / 12).toFixed(5))
  let numerator = g * rate
  let denominator = toPower((1 + rate), (12 * y)) - 1
  console.log(denominator)
  let deposit = numerator / denominator
  if(deposit < 1){return result.innerHTML = "< $1"}
  result.innerHTML = "$" + deposit.toFixed()
}
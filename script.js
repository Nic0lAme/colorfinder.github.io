const redSlider = document.getElementById("red_slider")
const redNumber = document.getElementById("red_number")
const greenSlider = document.getElementById("green_slider")
const greenNumber = document.getElementById("green_number")
const blueSlider = document.getElementById("blue_slider")
const blueNumber = document.getElementById("blue_number")

const rightColor = document.querySelector(".comparator__right_color div")
const yourColor = document.querySelector(".comparator__your_color div")

const scoreText = document.querySelector(".comparator__score_text")
const totalText = document.querySelector(".comparator__total_score")

const timerText = document.querySelector(".comparator__timer")

const colorPicker = document.querySelector(".color_picker")
const comparator = document.querySelector(".comparator")
const startGame = document.querySelector(".start_game")
const scoreWindow = document.querySelector(".score")

const durationText = document.querySelector("#duration")
const roundText = document.querySelector("#round")
const typeText = document.querySelector("#game_type")

const scoreTotalFinal = document.querySelector(".score__amount")
const mean = document.getElementById("score_mean")
const numberRound = document.getElementById("round_number")
const timeByRound = document.getElementById("time_by_round")

let i = 0
let r
let g
let b
let scoreTotal = 0

let maxTimer = 2
let timer = 0

let maxRound = 10;

redSlider.addEventListener('change', (event) => {
    redNumber.value = redSlider.value;
});

blueSlider.addEventListener('change', (event) => {
    blueNumber.value = blueSlider.value;
});

greenSlider.addEventListener('change', (event) => {
    greenNumber.value = greenSlider.value;
});

redNumber.addEventListener('change', (event) => {
    redSlider.value = redNumber.value;
});

greenNumber.addEventListener('change', (event) => {
    greenSlider.value = greenNumber.value;
});

blueNumber.addEventListener('change', (event) => {
    blueSlider.value = blueNumber.value;
});

typeText.addEventListener("change", (e) => {
    if(typeText.value == "Classic") {
        durationText.value = 30
        roundText.value = 10

        durationText.disabled = true;
        roundText.disabled = true;
    } else if(typeText.value == "Blitz") {
        durationText.value = 10
        roundText.value = 10

        durationText.disabled = true;
        roundText.disabled = true;
    } else if(typeText.value == "Expert") {
        durationText.value = 15
        roundText.value = 20

        durationText.disabled = true;
        roundText.disabled = true;
    } else if(typeText.value == "Short") {
        durationText.value = 20
        roundText.value = 5

        durationText.disabled = true;
        roundText.disabled = true;
    } else if(typeText.value == "Long") {
        durationText.value = 25
        roundText.value = 30

        durationText.disabled = true;
        roundText.disabled = true;
    } else {
        durationText.disabled = false;
        roundText.disabled = false;
    }
})


function BackgroundChange(_e, _r, _g, _b) {
    _e.style.background = "rgba(" + _r +"," + _g + "," + _b + ", 1)"
}

function Submit() {
    let r_choice = redNumber.value;
    let g_choice = greenNumber.value;
    let b_choice = blueNumber.value;
    
    BackgroundChange(rightColor, r, g, b)
    BackgroundChange(yourColor, r_choice, g_choice, b_choice)

    let score = Math.max(0, (500 - Math.abs(r_choice - r) - Math.abs(g_choice - g) - Math.abs(b_choice - b)))
    scoreText.innerHTML = "Score : " + score
    scoreTotal += score
    totalText.innerHTML = "Total : " + scoreTotal + " (" + i + ")"

    timer = maxTimer
    timerText.innerHTML = timer

    NewColor()
}

function NewColor() {
    i += 1
    r = Math.round(Math.random() * 255)
    g = Math.round(Math.random() * 255)
    b = Math.round(Math.random() * 255)

    if(i > maxRound) {
        StopGame()
    }

    BackgroundChange(document.querySelector("body"), r, g, b);
}

function StopGame() {
    colorPicker.classList.add("hidden")
    comparator.classList.add("hidden")
    startGame.classList.add("hidden")

    scoreTotalFinal.innerHTML = scoreTotal
    mean.innerHTML = (scoreTotal/maxRound).toFixed(1)
    numberRound.innerHTML = maxRound
    timeByRound.innerHTML = maxTimer

    scoreTotal = 0
    scoreWindow.classList.remove("hidden")
    BackgroundChange(document.querySelector("body"), Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));  
    i=0
}

function Continue() {
    scoreWindow.classList.add("hidden")
    startGame.classList.remove("hidden")
}

function StartGame() {
    
    maxTimer = durationText.value;
    maxRound = roundText.value;

    timer=maxTimer
    timerText.innerHTML = timer;

    scoreWindow.classList.add("hidden")
    startGame.classList.add("hidden")

    colorPicker.classList.remove("hidden")
    comparator.classList.remove("hidden")
    NewColor()
}

function Init() {
    typeText.value = "Classic"
    durationText.value = 30
    roundText.value = 10

    durationText.disabled = true;
    roundText.disabled = true;

    startGame.classList.remove("hidden")
    scoreWindow.classList.add("hidden")
    colorPicker.classList.add("hidden")
    comparator.classList.add("hidden")
}

setInterval(function() {
    timer -= 1
    timerText.innerHTML = timer
    if (timer <= 0 && i > 0) {
        timer=maxTimer
        Submit()
    }
}, 1000);

StopGame()
Init()
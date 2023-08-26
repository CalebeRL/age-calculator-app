const form = document.querySelector(".app-form")
const inputs = document.querySelectorAll(".input-date")
const labelInvalidDate = document.querySelector(".label-invalid-date")
const results = document.querySelectorAll(".result")

const currentDate = new Date()

const currentDay = currentDate.getDate()
const currentMonth = currentDate.getMonth() + 1
const currentYear = currentDate.getFullYear()

inputs[2].setAttribute("max", currentYear)

inputs.forEach(input => {

    input.addEventListener("input", () => {

        if (!input.nextElementSibling.nextElementSibling.classList.contains("hidden")) {
            input.nextElementSibling.nextElementSibling.classList.toggle("hidden")
            input.setAttribute("data-state", "valid")
            
        }
    })

});

form.addEventListener("submit", (e) => {
    e.preventDefault()

    validInput()
})

function validInput() {

    const inputDay = inputs[0].value
    const inputMonth = inputs[1].value
    const inputYear = inputs[2].value

    const date = new Date(Date.UTC(inputYear, inputMonth - 1, inputDay, 3, 0, 0))

    inputs.forEach(input => {

        if (input.value === "" && input.nextElementSibling.nextElementSibling.classList.contains("hidden")) {
            input.nextElementSibling.nextElementSibling.classList.toggle("hidden")
            input.setAttribute("data-state", "invalid")
        } 

    });

    if (inputDay != "" && inputDay != null) {
        if (date.getDate() != inputDay || (inputMonth > currentMonth && inputYear == currentYear)) {
            labelInvalidDate.classList.remove("hidden")

            inputs.forEach(input => {
                input.setAttribute("data-state", "invalid")

            })
        } else {
            labelInvalidDate.classList.add("hidden")

            inputs.forEach(input => {
                input.setAttribute("data-state", "valid")

            })

            handleCalculator(inputs[0].value, inputs[1].value, inputs[2].value, date)
           
        }
    }

}

function handleCalculator(inputDay, inputMonth, inputYear) {

    let resultDay = currentDay - inputDay 
    let resultMonth = currentMonth - inputMonth
    let resultYear = currentYear - inputYear

    if ((inputDay > currentDay && inputMonth > currentMonth) || (inputMonth == currentMonth && inputDay > currentDay && inputYear != currentYear)) {
        resultMonth = 12 + (currentMonth - inputMonth) - 1
        resultYear--

    } else if (inputMonth < currentMonth && inputDay < currentDay) {

        resultMonth = currentMonth - inputMonth

    } else if (inputMonth > currentMonth && (inputDay < currentDay || inputDay == currentDay)) {

        resultMonth = 12 + (currentMonth - inputMonth)
        resultYear--
    }

    if (inputDay > currentDay && currentMonth > inputMonth) {

        resultDay = 31 - (inputDay - currentDay)     
        resultMonth = currentMonth - inputMonth - 1

    } else if  (inputDay > currentDay) {
        
        resultDay = 31 - (inputDay - currentDay)     

    }

    results.forEach((result) => {
        result.firstChild.style.letterSpacing = "0.3rem"
    })

    results[0].setAttribute("data-val", resultYear)
    results[1].setAttribute("data-val", resultMonth)
    results[2].setAttribute("data-val", resultDay)

    numberCounter()
}

function numberCounter() {
    let duration = 2500

    results.forEach((result) => {
        let startValue = 0
        let endValue = parseInt(result.getAttribute("data-val"))

        duration = Math.floor( 1000 / endValue)

        let counter = setInterval(() => {
            result.firstChild.textContent = startValue
            if (startValue == endValue) {
                clearInterval(counter)
            }
            startValue++
        }, duration)

    })
}
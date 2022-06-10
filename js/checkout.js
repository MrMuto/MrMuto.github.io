const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
let currentStep = formSteps.findIndex(step => {
  return step.classList.contains("active") // Set the class to active to current step in the process. Which is defined by index no //
})

if (currentStep < 0) {
  currentStep = 0
  showCurrentStep()
}

multiStepForm.addEventListener("click", e => { // Listen for a Click on the Next and Previous //
  let incrementor
  if (e.target.matches("[data-next]")) { // Check which button is clicked and increment step //
    incrementor = 1
  } else if (e.target.matches("[data-previous]")) { // Check which button is clicked and decrement step //
    incrementor = -1
  }

  if (incrementor == null) return // Check if null, dont do anything if so //

  const inputs = [...formSteps[currentStep].querySelectorAll("input")] // Check validity of input fields //
  const allValid = inputs.every(input => input.reportValidity())
  if (allValid) {
    currentStep += incrementor
    showCurrentStep()
  }
})

formSteps.forEach(step => {
  step.addEventListener("animationend", e => {
    formSteps[currentStep].classList.remove("hide")
    e.target.classList.toggle("hide", !e.target.classList.contains("active"))
  })
})

function showCurrentStep() { // Add the active class if index is equal to the current step. Remove otherwise //
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep)
  })
}
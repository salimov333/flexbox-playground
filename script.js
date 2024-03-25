// declaration
const flexContainer = document.querySelector(".flex-container");
const flexControllerContainer = document.querySelector(".left");
const flexButtons = document.querySelectorAll(".flex");


// Events listening
document.addEventListener("DOMContentLoaded", init);
flexControllerContainer.addEventListener("click", applyFlex);

// Function to apply flex rules
function applyFlex(e) {
    const controller = e.target;
    if (!controller.matches(".btn-control")) return;

    const property = controller.dataset["flex_property"];
    if (!property) return;

    const flexValueWrapper = controller.nextElementSibling
    let propertyValue;
    if (controller.parentElement.matches(".btn-control-container")) {
        if (controller.matches("#display")) {
            propertyValue = controller.value;
            flexContainer.classList.toggle("d-flex");
            flexValueWrapper.textContent = isFlexBox(flexContainer) ? "flex" : "block";
            flexButtons.forEach(btn => {
                btn.disabled = isFlexBox(flexContainer) ? false : true;
            })
        } else if (flexValueWrapper.firstElementChild.matches("select")) {
            propertyValue = flexValueWrapper.firstElementChild.value
            flexContainer.style.setProperty(property, propertyValue);
        } else if (flexValueWrapper.firstElementChild.matches("input[type=text]")) {
            propertyValue = flexValueWrapper.firstElementChild.value
            flexContainer.style.setProperty(property, propertyValue);
        } else {
            console.log("flex value element not found");
        }
    }
    if (controller.parentElement.matches(".btn-control-child")) {
        if (flexValueWrapper.firstElementChild.matches("input[type=number], input[type=text], select")) {
            propertyValue = flexValueWrapper.firstElementChild.value;
            const childValue = controller.previousElementSibling.firstElementChild.value
            const child = document.getElementsByClassName(childValue)[0]
            child.style[property] = propertyValue;
        } else {
            console.log("flex value element not found");
        }
    }
    if (!propertyValue) {
        //Validation missing (JavaScript Validation API)
        // alert("invalid property value")
        return;
    };
}

// initial function
function init() {
    console.log("DOM fully loaded and parsed");
    flexButtons.forEach(btn => {
        btn.disabled = isFlexBox(flexContainer) ? false : true;
    })
}

// Auxiliary functions
function isFlexBox(container) {
    return container.classList.contains("d-flex")
}
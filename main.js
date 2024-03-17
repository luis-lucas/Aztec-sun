const styleSelect= document.getElementById ("style-select")
const fillingsSelect= document.getElementById ("fillings-select")
const salsasSelect= document.getElementById ("salsas-select")
const extrasInsideContainer = document.getElementById ("extras-inside")
const leaveOutContainer= document.getElementById ("leave-out")
const sidesContainer= document.getElementById ("sides")
const sideSalsasContainer= document.getElementById ("side-salsas")
const drinksContainer= document.getElementById ("drinks")
const finishedContainer= document.getElementById ("finished-transaction")
const stepTwoButton= document.getElementById ("step-two")
const allExtrasContainer= document.getElementById ("all-extras")
const guacamoleCheck= document.getElementById ("guacamole")
const jalapeñosCheck= document.getElementById ("jalapeños")
const leaveOutSelect= document.getElementById ("leave-out-select")
const burritosQuantity= document.getElementById ("burritos-quantity")
const addBurritoButton= document.getElementById ("add-burrito")

const burritosOrder= []

addBurritoButton.addEventListener("click",(e)=>{
    e.preventDefault()
    if(styleSelect.value !="0" && fillingsSelect.value !="0" && salsasSelect.value !="0"){
    let styleSelected= styleSelect.value
    let fillingsSelected= fillingsSelect.value
    let salsasSelected= salsasSelect.value
    let jalapeños=0
    let guacamole=0
    if(jalapeñosCheck.checked){
      jalapeños= 1
    }
    if(guacamoleCheck.checked) {
         guacamole= 2
    }
    let burrito= {
        style: styleSelected,
        filling: fillingsSelected,
        salsa: salsasSelected,
        extras: {jalapeños,guacamole},
        quantity: burritosQuantity.value,
    }
    burritosOrder.push(burrito)
    }
    else{
        alert("all the field are mandatory")
    }
})



stepTwoButton.addEventListener("click",(e)=>{
    e.preventDefault()
    if(styleSelect.value !="0" && fillingsSelect.value !="0" && salsasSelect.value !="0"){
        allExtrasContainer.style.display="flex"
    }
    else{
        alert("all the field are mandatory")
    }
})



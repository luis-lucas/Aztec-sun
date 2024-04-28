
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
const leaveOutCheck= document.getElementById ("leave-out-check")
const burritosQuantity= document.getElementById ("burritos-quantity")
const addBurritoButton= document.getElementById ("add-burrito")
const cheeseCheck= document.getElementById ("cheese")
const beansCheck= document.getElementById ("beans")
const souredCreamCheck= document.getElementById ("soured-cream")
const lettuceCheck= document.getElementById ("lettuce")
const basketButton= document.getElementById ("basket-button")
const tortillaChips= document.getElementById ("tortilla-chips")
const tortillaChipsSalsa= document.getElementById ("tortilla-chips-salsa")
const tortillaChipsGuacamole= document.getElementById ("tortilla-chips-guacamole")
const potGuacamole= document.getElementById("pot-guacamole")
const potSouredCream= document.getElementById("pot-soured-cream")
const salsaGreen= document.getElementById ("green")
const salsaMild= document.getElementById ("mild")
const salsaRoja= document.getElementById ("roja")
const salsaCorn= document.getElementById ("corn")
const cocaCola=document.getElementById ("coca-cola")
const dietCoke=document.getElementById ("diet-coke")
const cocaColaZero=document.getElementById ("coca-cola-zero")
const jarritoMango= document.getElementById ("jarrito-mango")
const jarritoLemonLime= document.getElementById ("jarrito-lemon-lime")
const jarritoGrapefruit= document.getElementById ("jarrito-grapefruit")
const jarritoGuava= document.getElementById ("jarrito-guava")
const drinks= document.getElementById ("drinks")
const optionSelect= document.getElementById ("option-select")
const checkoutBtn= document.getElementById("checkout-button")
const extras= []
//add price to burritos on the  choose style//
const burritosOrder= []
let totalOrder= {} 
let totalExtras;

addBurritoButton.addEventListener("click",(e)=>{
    e.preventDefault()
    if(styleSelect.value !="0" && fillingsSelect.value !="0" && salsasSelect.value !="0"){
    let styleSelected= styleSelect.value
    let fillingsSelected= fillingsSelect.value
    let fillingsOption= fillingsSelect.selectedOptions[0]
    let fillingPrice= parseInt(fillingsOption.dataset.price)
    let salsasSelected= salsasSelect.value
    let extrasInside= []
    if(jalapeñosCheck.checked){
    extrasInside.push({name:"jalapeños",price:1})
    
    }
    if(guacamoleCheck.checked) {
    extrasInside.push({name:"guacamole",price:2})
    }
    
    const totalExtrasInside= extrasInside.reduce((acc,obj)=>acc+obj.price,0)
    console.log(totalExtrasInside)

    let beans=0 
    let cheese=0
    let lettuce=0
    let souredCream=0
    if(beansCheck.checked){
        beans=1
    }
    if(cheeseCheck.checked){
        cheese=1
    }
    if(lettuceCheck.checked){
        lettuce=1
    }
    if(souredCreamCheck.checked){
        souredCream=1
    }

    let burrito= {
        style: styleSelected,
        filling: fillingsSelected,
        fillingPrice,
        salsa: salsasSelected,
        extras: extrasInside,
        extrasPrice:totalExtrasInside,
        leaveOut:{
            beans,cheese,lettuce,souredCream
        },
        quantity: parseInt(burritosQuantity.value),
        totalBurrito:(fillingPrice+totalExtrasInside)*burritosQuantity.value
    }
    burritosOrder.push(burrito)
    resetForm()
    alert ("your burro is hard at work")
    }
    
    else{
        alert("all the field are mandatory")
    }
   
})
//change all the alerts to make it look nice//


stepTwoButton.addEventListener("click",(e)=>{
    e.preventDefault()
    if(burritosOrder.length > 0 ){
        allExtrasContainer.style.display="flex"

    }
    else{
        alert("buy a burrito")
    }
})
const resetForm= ()=> {
    styleSelect.selectedIndex= 0
    fillingsSelect.selectedIndex= 0
    salsasSelect.selectedIndex= 0
    let checkBoxes= document.querySelectorAll('input[type="checkbox"]')
    for(const checkbox of checkBoxes){
        checkbox.checked= false
    }
    burritosQuantity.value= 1
} 


const extrasOnTheSide= ()=> {
let extrasChoice = document.querySelectorAll(".extras")
extrasChoice.forEach(extra=>{
    const name= extra.getAttribute("name")
    const quantity= parseInt(extra.value)
    const price= extra.getAttribute("data-price")
    if(quantity!="" && quantity >0){
    const extrasObj= {
        name, quantity, price, totalPrice:quantity*price
    }
    extras.push(extrasObj)
    }
})
totalExtras= extras.reduce((acc,obj)=>acc+obj.totalPrice,0)
extras.push({totalExtras})
console.log(extras)
return extras
} 
let totalBurritos=0;
const calcBurritosOrder= ()=>{
totalBurritos= burritosOrder.reduce((acc,obj)=>acc+obj.totalBurrito,0)
console.log(burritosOrder)
console.log(totalBurritos)
return totalBurritos
}

const createOrder= ()=> {
    const orderId= Math.floor(Math.random()*9000)+1000
    const orderDate= new Date().toLocaleString()
   let delivery=0
   let service
    if(optionSelect.value==="Delivery"){
        service= "delivery"
        delivery=2
      }
      else{service="collection"
      delivery=0}


totalOrder= {burritosOrder, 
    extras, 
    totalBurritos, 
    totalExtras, 
    total:totalBurritos + totalExtras + delivery,
    orderId, 
    orderDate, service, deliveryCharge:delivery}  
console.log (totalOrder)
}

checkoutBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    if(optionSelect.value !=0){
    extrasOnTheSide()
    calcBurritosOrder()
    createOrder()
    }
    else{alert("Choose delivery or collection")}
})

const spinBtn = document.querySelector("#spin-btn")
const wheel = document.querySelector(".wheel")
const prizeWindow = document.querySelector(".prize")
const prizeImg = document.querySelector("#prize-img")
const asideItems = document.querySelector(".aside-items")
const coin = document.querySelector("#coin")

const musicPack = {
    spin:"../sounds/spin.mp3"
}

let wallet = 0

let lastitems = []


let isSpining = false

let prizes = [
    {src:"./assets/item2.png",name:"Pink Knife",price:120},
    {src:"./assets/item1.png",name:"Secret P90",price:60},
    {src:"./assets/item3.png",name:"Secret Knife",price:136},
    {src:"./assets/item4.png",name:"Gold Knife",price:142},
    {src:"./assets/item5.png",name:"Secret AUG",price:45},
    {src:"./assets/item6.png",name:"AWP Zeus",price:90},
    {src:"./assets/item7.png",name:"Kerambit Sticker",price:160},
    {src:"./assets/item8.png",name:"AWP Cuber",price:84},
]

prizes.reverse()

function spin(){

if(isSpining){
    console.log("колесо уже крутится")
    return
}

isSpining = true

let audio = new Audio(musicPack.spin)
audio.play()

let randomAngle = Math.floor(Math.random() * 8)

wheel.style.transition = "transform 6.5s ease"
wheel.style.transform = `perspective(1000px) rotateY(${1080 + randomAngle * 45}deg)`



let timeout = setTimeout(()=>{
      isSpining = false
      wheel.style.transition = ""
      wheel.style.transform = ""
      clearTimeout(timeout)
      prizeImg.src = prizes[randomAngle].src
      wallet +=  prizes[randomAngle].price
      window.localStorage.setItem("wallet",wallet)
      coin.innerText = wallet + "$"
      prizeWindow.style.display = "flex"
      addLastItem(randomAngle)
},6500)

}

function addLastItem(randomAngle){
    asideItems.innerHTML = ""

    if(lastitems.length < 5){
        lastitems.push(prizes[randomAngle])
        

      }else{
        lastitems.shift()
        lastitems.push(prizes[randomAngle])
      }


      lastitems.forEach((item,index)=>{
        let div = document.createElement("div")
        div.classList.add("aside-item")
        let p = document.createElement("p")
        p.innerText = item.name

        let img = document.createElement("img")
        img.src = item.src
        div.appendChild(img)
        div.append(p)
        asideItems.appendChild(div)
        

      })
}

function init(){
  if(window.localStorage.length > 0){
    wallet = parseInt(window.localStorage.getItem("wallet"))
    console.log(wallet)
    coin.innerHTML = wallet + "$"
  }
}


spinBtn.addEventListener("click",spin)

prizeWindow.addEventListener("click",()=>{
    prizeWindow.style.display = "none"
})

init()//Запуск функции при загрузке страницы
let companies = [
{
name:"Recycling Jamaica Ltd",
price:50,
distance:3,
address:"Montego Bay",
phone:"876-555-1234"
},

{
name:"Eco Plastics",
price:40,
distance:5,
address:"St James",
phone:"876-555-8888"
},

{
name:"Green Island Recycling",
price:55,
distance:2,
address:"Green Island",
phone:"876-555-9999"
}
]

function startApp(){

show("upload")

}

function confirmImage(){

const file = document.getElementById("fileInput").files[0]
const preview = document.getElementById("previewImage")

if(!file && !preview.src){
document.getElementById("error").innerText="Please upload or capture an image."
return
}

if(file){
preview.src = URL.createObjectURL(file)
}

show("loading")

setTimeout(()=>{
show("results")
displayCompanies()
},2000)

}

function show(section){

document.querySelectorAll("section").forEach(s=>{
s.classList.remove("active")
})

document.getElementById(section).classList.add("active")

}

function displayCompanies(){

const container = document.getElementById("companyList")

container.innerHTML=""

companies.forEach(c=>{

container.innerHTML+=`

<div class="company">
<strong>${c.name}</strong><br>
Price: $${c.price}<br>
Address: ${c.address}<br>
Phone: ${c.phone}
</div>

`

})

}

function sortCompanies(){

let type = document.getElementById("sort").value

companies.sort((a,b)=>{

return a[type] - b[type]

})

displayCompanies()

}

let stream

function startCamera(){

const video = document.getElementById("camera")
const captureBtn = document.getElementById("captureBtn")

navigator.mediaDevices.getUserMedia({video:true})
.then(s => {

stream = s
video.srcObject = stream

video.style.display = "block"
captureBtn.style.display = "inline-block"

})
.catch(err=>{
alert("Camera access denied")
})

}

function captureImage(){

const video = document.getElementById("camera")
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

canvas.width = video.videoWidth
canvas.height = video.videoHeight

context.drawImage(video,0,0)

const imageData = canvas.toDataURL("image/png")

document.getElementById("previewImage").src = imageData

// stop camera
stream.getTracks().forEach(track=>track.stop())

video.style.display="none"

}

function showPage(page){

document.querySelectorAll("section").forEach(section=>{
section.classList.add("hidden")
})

document.getElementById(page).classList.remove("hidden")

}


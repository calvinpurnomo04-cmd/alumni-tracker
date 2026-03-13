let dataAlumni = JSON.parse(localStorage.getItem("alumniData")) || []
let chart

function simpan(){
localStorage.setItem("alumniData",JSON.stringify(dataAlumni))
}

function tambahAlumni(){

let nama=document.getElementById("nama").value
let prodi=document.getElementById("prodi").value
let tahun=document.getElementById("tahun").value
let kota=document.getElementById("kota").value

let alumni={
nama:nama,
prodi:prodi,
tahun:tahun,
kota:kota,
status:"Belum Dilacak",
sumber:"-"
}

dataAlumni.push(alumni)
simpan()
tampilkan()

}

function tampilkan(list=dataAlumni){

let tbody=document.querySelector("#tabel tbody")
tbody.innerHTML=""

list.forEach((a,index)=>{

let row=`
<tr>
<td>${a.nama}</td>
<td>${a.prodi}</td>
<td>${a.tahun}</td>
<td>${a.kota}</td>
<td>${a.status}</td>
<td>${a.sumber}</td>
<td><button class="delete" onclick="hapus(${index})">Hapus</button></td>
</tr>
`

tbody.innerHTML+=row

})

updateDashboard()

}

function hapus(index){

dataAlumni.splice(index,1)
simpan()
tampilkan()

}

function lacakAlumni(){

let sumberList=[

'<a href="https://www.linkedin.com" target="_blank">LinkedIn</a>',

'<a href="https://github.com" target="_blank">GitHub</a>',

'<a href="https://scholar.google.com" target="_blank">Google Scholar</a>',

'<a href="https://www.researchgate.net" target="_blank">ResearchGate</a>'

]

dataAlumni.forEach(a=>{

let random=Math.random()

if(random>0.6){

a.status="Ditemukan"
a.sumber=sumberList[Math.floor(Math.random()*sumberList.length)]

}
else if(random>0.3){

a.status="Perlu Verifikasi"
a.sumber="Belum pasti"

}
else{

a.status="Tidak Ditemukan"
a.sumber="-"}

})

simpan()
tampilkan()

}

function cariAlumni(){

let keyword=document.getElementById("search").value.toLowerCase()

let hasil=dataAlumni.filter(a=>a.nama.toLowerCase().includes(keyword))

tampilkan(hasil)

}

function updateDashboard(){

let total=dataAlumni.length
let ditemukan=dataAlumni.filter(a=>a.status=="Ditemukan").length
let verifikasi=dataAlumni.filter(a=>a.status=="Perlu Verifikasi").length
let tidak=dataAlumni.filter(a=>a.status=="Tidak Ditemukan").length

document.getElementById("total").innerText=total
document.getElementById("ditemukan").innerText=ditemukan
document.getElementById("verifikasi").innerText=verifikasi
document.getElementById("tidak").innerText=tidak

let ctx=document.getElementById("chart")

if(chart) chart.destroy()

chart=new Chart(ctx,{
type:"pie",
data:{
labels:["Ditemukan","Verifikasi","Tidak Ditemukan"],
datasets:[{data:[ditemukan,verifikasi,tidak]}]
}
})

}

tampilkan()

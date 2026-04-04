// LOGIN
function login(){
let u = username.value
let p = password.value

if(u==="admin" && p==="12345"){
localStorage.setItem("login",true)
window.location="dashboard.html"
}else{
error.innerText="Login gagal"
}
}

// CEK LOGIN
if(window.location.pathname.includes("dashboard.html")){
if(!localStorage.getItem("login")){
window.location="login.html"
}
}

// LOGOUT
function logout(){
localStorage.removeItem("login")
window.location="login.html"
}

// DATA
let data = JSON.parse(localStorage.getItem("dataAlumni")) || []

function simpan(){
localStorage.setItem("dataAlumni",JSON.stringify(data))
}

// TAMBAH DATA
function tambahData(){

let a={
nama:nama.value,
email:email.value,
hp:hp.value,
pekerjaan:pekerjaan.value,
posisi:posisi.value,
status:status.value,
linkedin:linkedin.value,
ig:ig.value,
fb:fb.value,
tiktok:tiktok.value
}

data.push(a)
simpan()
tampil()

}

// TAMPIL
function tampil(){

let tbody=document.querySelector("#tabel tbody")
tbody.innerHTML=""

data.forEach((a,i)=>{

let sosmed=`
<a href="${a.linkedin}" target="_blank">LinkedIn</a> |
<a href="${a.ig}" target="_blank">IG</a> |
<a href="${a.fb}" target="_blank">FB</a> |
<a href="${a.tiktok}" target="_blank">TikTok</a>
`

let row=`
<tr>
<td>${a.nama}</td>
<td>${a.email}</td>
<td>${a.hp}</td>
<td>${a.pekerjaan}</td>
<td>${a.posisi}</td>
<td>${a.status}</td>
<td>${sosmed}</td>
<td><button class="delete" onclick="hapus(${i})">Hapus</button></td>
</tr>
`

tbody.innerHTML+=row

})

updateStat()
}

// HAPUS
function hapus(i){
data.splice(i,1)
simpan()
tampil()
}

// IMPORT CSV
function importCSV(){

let file=fileInput.files[0]
if(!file)return alert("Pilih file")

let reader=new FileReader()

reader.onload=function(e){

let rows=e.target.result.split("\n")

rows.forEach(r=>{

let c=r.split(",")

if(c.length>3){

data.push({
nama:c[0],
email:c[1],
hp:c[2],
pekerjaan:c[3],
posisi:c[4],
status:c[5],
linkedin:c[6],
ig:c[7],
fb:c[8],
tiktok:c[9]
})

}

})

simpan()
tampil()

}

reader.readAsText(file)
}

// EXPORT CSV
function exportCSV(){

let csv="Nama,Email,HP,Pekerjaan,Posisi,Status,LinkedIn,IG,FB,TikTok\n"

data.forEach(a=>{
csv+=`${a.nama},${a.email},${a.hp},${a.pekerjaan},${a.posisi},${a.status},${a.linkedin},${a.ig},${a.fb},${a.tiktok}\n`
})

let blob=new Blob([csv])
let a=document.createElement("a")
a.href=URL.createObjectURL(blob)
a.download="alumni.csv"
a.click()

}

// STATISTIK
function updateStat(){

total.innerText=data.length

let kerja=data.filter(a=>a.pekerjaan!="").length

kerja.innerText=kerja

}

tampil()

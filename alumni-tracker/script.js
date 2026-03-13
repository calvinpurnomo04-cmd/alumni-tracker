let dataAlumni = []

function tambahAlumni(){

let nama = document.getElementById("nama").value
let prodi = document.getElementById("prodi").value
let tahun = document.getElementById("tahun").value
let kota = document.getElementById("kota").value

let alumni = {
nama:nama,
prodi:prodi,
tahun:tahun,
kota:kota,
status:"Belum Dilacak"
}

dataAlumni.push(alumni)

tampilkanData()

}

function tampilkanData(){

let tabel = document.getElementById("tabel")

tabel.innerHTML = `
<tr>
<th>Nama</th>
<th>Prodi</th>
<th>Tahun</th>
<th>Kota</th>
<th>Status</th>
</tr>
`

dataAlumni.forEach(a => {

let row = tabel.insertRow()

row.insertCell(0).innerHTML = a.nama
row.insertCell(1).innerHTML = a.prodi
row.insertCell(2).innerHTML = a.tahun
row.insertCell(3).innerHTML = a.kota
row.insertCell(4).innerHTML = a.status

})

}

function lacakAlumni(){

dataAlumni.forEach(a => {

let random = Math.random()

if(random > 0.6){
a.status = "Ditemukan"
}
else if(random > 0.3){
a.status = "Perlu Verifikasi"
}
else{
a.status = "Tidak Ditemukan"
}

})

tampilkanData()

}

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sUva = document.querySelector('#m-uva')
const sPais = document.querySelector('#m-pais')
const sClassifica = document.querySelector('#m-classifica')
const sSafra = document.querySelector('#m-safra')
const sTemperatura = document.querySelector('#m-temperatura')
const sPotencialdeGuarda = document.querySelector('#m-potencialdeGuarda')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sUva.value = itens[index].uva
    sPais.value = itens[index].pais
    sClassifica.value = itens[index].classifica
    sSafra.value = itens[index].safra
    sTemperatura.value = itens[index].temperatura
    sPotencialdeGuarda.value = itens[index].potencialdeGuarda
    id = index
  } else {
    sUva.value = ''
    sPais.value = ''
    sClassifica.value = ''
    sSafra.value = ''
    sTemperatura.value = ''
    sPotencialdeGuarda.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.uva}</td>
    <td>${item.pais}</td>
    <td>${item.classifica}</td>
    <td>${item.safra}</td>
    <td>${item.temperatura} °C</td>
    <td>${item.potencialdeGuarda}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sUva.value == '' || sPais.value == '' || sClassifica.value == '' || sSafra.value == '' || sTemperatura.value == '' || sPotencialdeGuarda.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].uva = sUva.value
    itens[id].pais = sPais.value
    itens[id].classifica = sClassifica.value
    itens[id].safra = sSafra.value
    itens[id].temperatura = sTemperatura.value
    itens[id].potencialdeGuarda = sPotencialdeGuarda.value
  } else {
    itens.push({'uva': sUva.value, 'pais': sPais.value, 'classifica': sClassifica.value, 'safra': sSafra.value, 'temperatura': sTemperatura.value, 'potencialdeGuarda': sPotencialdeGuarda.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
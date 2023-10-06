class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

  validarDados() {
    for(let i in this) {
      if(this[i] == undefined || this[i] == '' || this[i] == null) {
        return false
      }
    }
    return true
  }
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}

    this.despesaTipo = {
      "1" : "Alimentação",
      "2" : "Educação",
      "3" : "Lazer",
      "4" : "Saúde",
      "5" : "Transporte"
    }
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

  recuperarTodosRegistros() {
    
    let despesas = Array()

    let id = localStorage.getItem('id')

    for(let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i))

      if(despesa === null) {
        continue
      }

      despesa.id = i
      despesas.push(despesa)
    }
    return despesas
  }

  pesquisar(despesa) {
    let despesasFiltradas = Array()
    despesasFiltradas = this.recuperarTodosRegistros()

    console.log(despesasFiltradas)
    //ano
    if(despesa.ano != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
    }
    //mes
    if(despesa.mes != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
    }
    //dia
    if(despesa.dia != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
    }
    //tipo
    if(despesa.tipo != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
    }
    //descricao
    if(despesa.descricao != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
    }
    //
    if(despesa.valor != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
    }

    return despesasFiltradas

  }

  remover(id) {
    localStorage.removeItem(id)
  }
}

let bd = new Bd()

function cadastrarDespesa() {
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

  if(despesa.validarDados()) {
    bd.gravar(despesa)
    document.getElementById('modal-titulo').innerText = 'Registro inserido com sucesso'
    document.getElementById('modal-body-text').innerText = 'Despesa foi cadastrada com sucesso!'
    document.getElementById('btn-text').innerText = 'Voltar'
    document.getElementById('modal-titulo').className = 'modal-title text-success'
    document.getElementById('btn-text').className = 'btn btn-success'
    
    $('#modalRegistraDespesa').modal('show')

    let a = ['ano', 'mes', 'dia', 'tipo', 'descricao', 'valor']
    for(let i in a){
       document.getElementById(a[i]).value = ''
    }

  } else {
    document.getElementById('modal-titulo').innerText = 'Erro na inclusão do registro'
    document.getElementById('modal-body-text').innerText = 'Existem campos obrigatórios que não foram preenchidos.'
    document.getElementById('btn-text').innerText = 'Voltar e corrigir'
    document.getElementById('modal-titulo').className = 'modal-title text-danger'
    document.getElementById('btn-text').className = 'btn btn-danger'
    
    $('#modalRegistraDespesa').modal('show')
  }

}

function carregarListaDespesas(despesas = Array(), filtro = false) {
  if(despesas.length == 0 && filtro == false) {
    despesas = bd.recuperarTodosRegistros()
  }

  let listaDespesas = document.getElementById('listaDespesas')
  listaDespesas.innerHTML = ''

  despesas.forEach(function(d) {
    let linha = listaDespesas.insertRow()

    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    linha.insertCell(1).innerHTML = bd.despesaTipo[d.tipo]
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = `R$${d.valor}`

    let btn = document.createElement('button')
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fas fa-times"><i>'
    btn.id = `id_despesa_${d.id}`
    btn.onclick = function() {
      let id = this.id.replace('id_despesa_', '')

      bd.remover(id)

      window.location.reload()
    }
    linha.insertCell(4).append(btn)
  })

}

function pesquisarDespesa() {
  let ano  = document.getElementById("ano").value
	let mes = document.getElementById("mes").value
	let dia = document.getElementById("dia").value
	let tipo = document.getElementById("tipo").value
	let descricao = document.getElementById("descricao").value
	let valor = document.getElementById("valor").value

  
	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)

  //Criar tabela de pesquisa

  this.carregarListaDespesas(despesas, true)

}


function recuperarValorTotal() {
  despesa = bd.recuperarTodosRegistros()
  let valorTotal = document.getElementById('valorTotal')
  let despesaTotal = document.getElementById('despesasTotais')
  let total = 0

  despesa.forEach(function (item) {

  total += Number(item.valor)
})

  despesaTotal.innerHTML = despesa.length

  valorTotal.innerHTML = `R$${total}`

  console.log(despesa.length)
  
}

document.getElementById("myBtn").addEventListener("click", myFunction);

function myFunction() {
  alert ("Hello World!");
}
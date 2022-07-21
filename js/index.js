// CARRINHO QUE IRÁ RECEBER OS OBJETOS //
let cart = []

const cardsContent = document.querySelector('.cardsContent')

// FUNÇÃO PARA LISTAR TODOS OS PRODUTOS NA VITRINE //
function listarProdutosVitrine(array) {
  array.forEach(function (i) {
    let card = i
    let indice = i.id
    criarCardVitrine(card, indice)
  })
}

// FUNÇÃO PARA CRIAR O CARD DINÂMICO //
function criarCardVitrine(card, indice) {
  let imagem = card.img
  let nameItem = card.nameItem
  let description = card.description
  let value = card.value
  let tag = card.tag.join('')
  let id = indice

  let divPrincipal = document.createElement('div')
  divPrincipal.classList.add('animate__animated', 'animate__fadeInLeft')
  divPrincipal.style.setProperty('--animate-duration', '2s')
  let img = document.createElement('img')
  let span = document.createElement('span')
  let h3 = document.createElement('h3')
  let divh3 = document.createElement('div')
  divh3.append(h3)
  let descriptionItem = document.createElement('p')
  let price = document.createElement('p')
  let divCart = document.createElement('div')
  let cart = document.createElement('p')
  divCart.append(cart)

  divPrincipal.append(img, span, divh3, descriptionItem, price, divCart)

  img.src = `${imagem}`
  span.innerHTML = `${tag}`
  h3.innerHTML = `${nameItem}`
  descriptionItem.innerHTML = `${description}`
  price.innerHTML = `R$ ${value}0`
  cart.innerHTML = `Adicionar ao carrinho`
  cart.id = `${id}`

  divPrincipal.classList.add('card')
  divPrincipal.classList.add(tag)
  span.classList.add('department')
  h3.classList.add('title')
  divh3.classList.add('divh3')
  descriptionItem.classList.add('description')
  price.classList.add('price')
  cart.classList.add('addCart')
  divCart.classList.add('divCart')

  cardsContent.append(divPrincipal)
}

// LISTANDO OS PRODUTOS DINAMICAMENTE //
listarProdutosVitrine(data)

cardsContent.addEventListener('click', criarObjeto)

function criarObjeto(event) {
  let btnCart = event.target
  let numberProduct = btnCart.id
  for (let i = 0; i < data.length; i++) {
    let numberProductId = data[i].id
    if (numberProduct == numberProductId) {
      cart.unshift(data[i])
    }
  }
  if (btnCart.className == 'addCart') {
    listarProdutosCart(cart)
  }
  if (cart.length > 0) {
    let cartItem = document.querySelectorAll('.cartItem')[0]
    cartItem.classList.add('animate__animated', 'animate__backInLeft')
    cartItem.style.setProperty('--animate-duration', '0.6s')
  }
}

// FUNÇÃO PARA LISTAR OS PRODUTOS NO CARRINHO //
function listarProdutosCart(array) {
  itensCart.innerHTML = ''
  for (let i = 0; i < array.length; i++) {
    let carrinho = array[i]
    let indice = i
    criarCardCart(carrinho, indice)
    atualizarValor()
  }
}

const contentCart = document.querySelector('.contentCart')
const itensCart = document.querySelector('.itensCart')

// FUNÇÃO PARA CRIAR O CARD NOS CARRINHOS //

function criarCardCart(carrinho, indice) {
  let img = carrinho.img
  let name = carrinho.nameItem
  let price = carrinho.value
  let tag = carrinho.tag.join('')
  let id = indice

  let cartItem = document.createElement('div')
  let figure = document.createElement('figure')
  let imgContent = document.createElement('img')
  let infosCart = document.createElement('div')

  let nameTag = document.createElement('p')
  let priceTag = document.createElement('p')
  let removeTag = document.createElement('p')

  cartItem.append(figure, infosCart)
  figure.append(imgContent)

  infosCart.append(nameTag, priceTag, removeTag)

  cartItem.classList.add('cartItem')
  cartItem.classList.add(tag)
  figure.classList.add('imgCart')
  infosCart.classList.add('infosCart')
  priceTag.classList.add('priceTag')
  removeTag.classList.add('removeButton')
  nameTag.classList.add('nameTag')

  let numString = price.toString().replace('.', ',')
  imgContent.src = `${img}`
  nameTag.innerHTML = `${name}`
  priceTag.innerHTML = `R$ ${numString}0`
  removeTag.innerHTML = `Remover Produto`
  removeTag.id = id

  itensCart.append(cartItem)
}

// FUNÇÃO PARA REMOVER O ITEM DO CARRINHO //

itensCart.addEventListener('click', removerCart)

function removerCart(event) {
  let buttonRemove = event.target
  let index = buttonRemove.id
  let cartItem = document.querySelectorAll('.cartItem')[index]
  if (buttonRemove.className == 'removeButton') {
    cart.splice(index, 1)
    cartItem.classList.add('animate__animated', 'animate__backOutRight')
    cartItem.style.setProperty('--animate-duration', '0.6s')
  }
  setTimeout(function () {
    if (cart.length == 0) {
      totalValue.innerHTML = `
      <p class="noItens"> Sem itens no carrinho<p>`
    }
    listarProdutosCart(cart)
  }, 400)
}

// ATUALIZANDO VALOR E QUANTIDADE DE ITENS NO CARRINHO //

let totalValue = document.querySelector('.totalValue')

function atualizarValor() {
  totalValue.innerHTML = ''
  let total = document.createElement('p')
  let valueP = document.createElement('p')
  let totalP = document.createElement('p')
  let divValor = document.createElement('div')
  let divTotal = document.createElement('div')
  let cleanCart = document.createElement('p')

  totalValue.append(divValor, divTotal)
  divValor.append(total, valueP)
  divTotal.append(totalP, cleanCart)
  divValor.classList.add('divValor')
  totalP.classList.add('totalP')
  cleanCart.classList.add('cleanCart')

  let soma = 0

  for (let i = 0; i < cart.length; i++) {
    let valor = cart[i].value
    soma += valor
  }

  let totalProdutos = cart.length
  let toFixed = soma.toFixed(2)
  let numString = toFixed.toString().replace('.', ',')

  total.innerHTML = `Valor total: `
  valueP.innerHTML = `<span class = "valueP">R$ ${numString}</span>`
  cleanCart.innerHTML = `Limpar Carrinho`

  totalP.innerHTML = `Total de produtos: <span class = "valueP">${totalProdutos}</span>`

  let cartCleaner = document.querySelector('.cleanCart')
  cartCleaner.addEventListener('click', limparCarrinho)

  function limparCarrinho() {
    totalValue.innerHTML = `<p class="noItens"> Sem itens no carrinho<p>`
    for (let i = 0; i < cart.length; i++) {
      let cartItem = document.querySelectorAll('.cartItem')[i]
      cartItem.classList.add('animate__animated', 'animate__backOutRight')
      cartItem.style.setProperty('--animate-duration', '0.6s')
    }
    setTimeout(function () {
      cart = []
      listarProdutosCart(cart)
    }, 400)
  }
}

// FUNÇÕES SEPARADAS PARA LISTAR AS CATEGORIAS //
function listarCamisetas() {
  for (let i = 0; i < data.length; i++) {
    let Classe = document.querySelectorAll('.card')[i]
    if (Classe.classList.contains('Acessórios')) {
      Classe.style = `display: none`
    } else if (Classe.classList.contains('Calçados')) {
      Classe.style = `display: none`
    } else if (Classe.classList.contains('Camisetas')) {
      Classe.style = `display: block`
    }
  }
}

function listarAcessorios() {
  for (let i = 0; i < data.length; i++) {
    let Classe = document.querySelectorAll('.card')[i]
    if (Classe.classList.contains('Camisetas')) {
      Classe.style = `display: none`
    } else if (Classe.classList.contains('Calçados')) {
      Classe.style = `display: none`
    } else if (Classe.classList.contains('Acessórios')) {
      Classe.style = `display: block`
    }
  }
}

function listarCalcados() {
  for (let i = 0; i < data.length; i++) {
    let Classe = document.querySelectorAll('.card')[i]
    if (Classe.classList.contains('Acessórios')) {
      Classe.style = `display: none`
    } else if (Classe.classList.contains('Camisetas')) {
      Classe.style = `display: none`
    } else if (Classe.classList.contains('Calçados')) {
      Classe.style = `display: block`
    }
  }
}

// FUNÇÕES SEPARADAS PARA LISTAR TODOS NOVAMENTE //

function listarTodos() {
  cardsContent.innerHTML = ''
  let itens = []
  for (let i = 0; i < data.length; i++) {
    itens.push(data[i])
  }
  listarProdutosVitrine(itens)
}

// CRIANDO O BOTÃO DE PESQUISA FUNCIONAL //

let inputSearch = document.querySelector('.cartInput')
let inputButton = document.querySelector('.searchButton')

inputButton.addEventListener('click', function () {
  let userSearch = inputSearch.value
  search(userSearch)
})

let body = document.querySelector('body')

body.addEventListener(
  'keypress',
  function (event) {
    if (event.which == 13) {
      let userSearch = inputSearch.value
      search(userSearch)
    }
  },
  false
)

function search(valueSearch) {
  for (let i = 0; i < data.length; i++) {
    let Classe = document.querySelectorAll('.card')[i]
    let valueSearchLower = valueSearch.toLowerCase()
    let nameProduct = data[i].nameItem.toLowerCase()
    let tagDepartment = data[i].tag.join('').toLowerCase()
    if (
      nameProduct.includes(valueSearchLower) ||
      tagDepartment.includes(valueSearchLower)
    ) {
      Classe.style = `display: block`
    } else {
      Classe.style = `display: none`
    }
  }
  inputSearch.value = ''
}

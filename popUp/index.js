let fruits = [
    {id: 1, title: `Apple`, price: 20, img: `https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`},
    {id: 2, title: `Orange`, price: 30, img: `https://images.unsplash.com/photo-1587496639254-67cb9f1fc5a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80`},
    {id: 3, title: `Banana`, price: 40, img: `https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80`},
]

const toHTML = fruit => `
    <div class="col">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${fruit.img}" alt="${fruit.title}" />
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-id='${fruit.id}' data-btn='press'>See price</a>
                <a href="#" class="btn btn-danger" data-id='${fruit.id}' data-btn='remove'>Delate</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join(``)
    document.getElementById(`fruits`).innerHTML = html
}
render()

const priceModal = $.modal({
    title: `Price`,
    closable: true,
    content: ``,
    width: `400px`,
    footerButtons: [
        {
            text: `Close`, type: `primary`, handler() {
                priceModal.close()
            }
        }
    ]
})

document.addEventListener(`click`, e => {
    const dataType = e.target.dataset.btn
    const id = +e.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    if (dataType === `press`) {
        e.preventDefault()
        priceModal.setContent(`<p>Price of apple: <strong>${fruit.price}$</strong></p>`)
        priceModal.open()
    } else if (dataType === `remove`) {
        $.confirm({
            title: `Are you sure?`,
            content: `You are delating fruit <strong>${fruit.title}</</strong>`,
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        })
          .catch( () => {})
    }
})
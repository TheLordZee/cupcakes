let cupcakeList

class Cupcake{
    constructor({ id, flavor, size, rating, image }){
        this.id = id
        this.flavor = flavor
        this.size = size
        this.rating = rating
        this.image = image
    }

    generateHtml(){
        return `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div class="card" style="width: 18rem;">
                <img src="${this.image}" class="card-img-top" alt="...">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Flavor: ${this.flavor}</li>
                    <li class="list-group-item">Size: ${this.size}</li>
                    <li class="list-group-item">Rating: ${this.rating}</li>
                </ul>
            </div>
        </div>
        `
    }
}

class CupcakeList{
    constructor(cupcakes){
        this.cupcakes = cupcakes
    }

    static async getAllCupcakes(){
        const res = await axios.get('/api/cupcakes')
        const cupcakes = res.data.cupcakes.map(cupcake => new Cupcake(cupcake))
        console.log(cupcakes)
        return new CupcakeList(cupcakes)
    }

    async submitCupcake(cupcake_data){
        const response = await axios({
            url: '/api/cupcakes',
            method: "POST",
            data: {
                flavor: cupcake_data.flavor,
                size: cupcake_data.size,
                rating: cupcake_data.rating,
                image: cupcake_data.image
            }
        })
        
        const cupcake = new Cupcake(response.data.cupcake)
        const html = cupcake.generateHtml()
        $("#cupcake-list").append(html)
    }
}

async function getAndShowAllCupcakes(){
    cupcakeList = await CupcakeList.getAllCupcakes()
    $("#cupcake-list").empty()

    for(cupcake of cupcakeList.cupcakes){
        const html = cupcake.generateHtml()
        $("#cupcake-list").append(html)
    }
}

getAndShowAllCupcakes()

$('#submit-btn').on('click', async function(e){
    e.preventDefault()
    let pass = true
    let cupcake_data = {}
    for(let child of e.target.form){
        if (!child.value && child.type !== 'submit'){
            pass = false
            $(`#${child.labels[0].htmlFor}_div`).show()
        } else if(child.value && child.type !== 'hidden'){
            $(`#${child.labels[0].htmlFor}_div`).hide()
            cupcake_data[child.labels[0].htmlFor] = child.value
        } 
    }
    if(pass){
       await cupcakeList.submitCupcake(cupcake_data) 
    }
})


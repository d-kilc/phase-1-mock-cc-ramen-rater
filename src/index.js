// write your code here
function loadRamen() {
    fetch('http://localhost:3000/ramens')
    .then((res) => res.json())
    .then((json) => {
        // console.log(json)
        renderRamen(json)
        //renderRamen(json)
    })
}

function renderRamen(ramen) {
    //console.log(ramen)
    ramen.forEach((obj) => {
        const img = document.createElement('img')
        // console.log(obj)
        img.src = obj.image
        img.id = obj.id
        // console.log(img)
        document.querySelector('#ramen-menu').appendChild(img)

        img.addEventListener('click', (e) => {
            document.querySelector('.detail-image').src = obj.image
            document.querySelector('.name').textContent = obj.name
            document.querySelector('.restaurant').textContent = obj.restaurant
            document.querySelector('#rating-display').textContent = obj.rating
            document.querySelector('#comment-display').textContent = obj.comment
        })
    })
    
    
}

//function handleSubmit() {
    document.querySelector('form').addEventListener('submit',(e) => {
        e.preventDefault()

        const newRamen = {
            name: e.target[0].value,
            restaurant: e.target[1].value,
            image: e.target[2].value,
            rating: e.target[3].value,
            comment: e.target[4].value
        }

        const img = document.createElement('img')
        // console.log(obj)
        img.src = newRamen.image
        img.id = newRamen.id
        // console.log(img)
        document.querySelector('#ramen-menu').appendChild(img)

        img.addEventListener('click', (e) => {
            document.querySelector('.detail-image').src = newRamen.image
            document.querySelector('.name').textContent = newRamen.name
            document.querySelector('.restaurant').textContent = newRamen.restaurant
            document.querySelector('#rating-display').textContent = newRamen.rating
            document.querySelector('#comment-display').textContent = newRamen.comment
        })

        console.log(newRamen)
        // fetch('http://localhost:3000/ramens', {
        //     method: 'post',
        //     body: JSON.stringify(newRamen)
        // })
        // .then((res)=>res.json())
        // .then((json) => console.log(json))

        e.target.reset()
    })
//}

loadRamen()

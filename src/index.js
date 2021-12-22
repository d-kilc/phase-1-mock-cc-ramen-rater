// write your code here
function init() {
    fetch('http://localhost:3000/ramens')
    .then((res) => res.json())
    .then(renderRamen)
    .catch(() => alert('Something\'s wrong.'))
}

function renderRamen(ramen) {
    document.querySelector('.detail-image').src = ramen[0].image
    document.querySelector('.name').textContent = ramen[0].name
    document.querySelector('.restaurant').textContent = ramen[0].restaurant
    document.querySelector('#rating-display').textContent = ramen[0].rating
    document.querySelector('#comment-display').textContent = ramen[0].comment

    ramen.forEach((obj) => {
        const img = document.createElement('img')        
        img.src = obj.image
        img.id = obj.id

        const parentDiv = document.createElement('div')
        document.querySelector('#ramen-menu').appendChild(parentDiv)

        img.addEventListener('click', (e) => {
            document.querySelector('.detail-image').src = obj.image
            document.querySelector('.detail-image').id = obj.id
            document.querySelector('.name').textContent = obj.name
            document.querySelector('.restaurant').textContent = obj.restaurant
            document.querySelector('#rating-display').textContent = obj.rating
            document.querySelector('#comment-display').textContent = obj.comment
        })
        parentDiv.appendChild(img)

        const deleter = document.createElement('div')
        deleter.textContent = 'X'

        deleter.addEventListener('click', deleteRamen)
        parentDiv.appendChild(deleter)
    })   
}

function postNewRamen(e) {
    e.preventDefault()

    const newRamen = {
        name: e.target[0].value,
        restaurant: e.target[1].value,
        image: e.target[2].value,
        rating: e.target[3].value,
        comment: e.target[4].value
    }

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        },
        body: JSON.stringify(newRamen)
    })
    .then(() => alert('Ramen posted! Pls refresh.'))
    .catch(() => alert('Couldn\'t post.'))

    e.target.reset()
    
    // how to reset menu pics without refreshing?
    // init()
}

function editRamen(e) {    
    e.preventDefault()

    document.querySelector('#rating-display').textContent = e.target[0].value
    document.querySelector('#comment-display').textContent = e.target[1].value
    const newRating = e.target[0].value
    const newComment = e.target[1].value
    const updatedId = document.querySelector('.detail-image').id
console.log(document.querySelector('.detail-image'))
    console.log(updatedId)

    //show the update from inputs (until they refresh)
    document.querySelector('#rating-display').textContent = newRating
    document.querySelector('#comment-display').textContent = newComment

    //persist changes
    fetch(`http://localhost:3000/ramens/${updatedId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            rating: newRating,
            comment: newComment
        })
    })
    .then(() => alert('Ramen updated! Pls refresh'))
    .catch(() => alert('Couldn\'t update.'))

    e.target.reset()
}

function deleteRamen(e) {
    const ramen = e.target.previousSibling
    console.log(ramen)
    fetch(`http://localhost:3000/ramens/${ramen.id}`, {
        method: 'DELETE'
    })
    .then(() => alert('Ramen deleted! Pls refresh'))
    .catch(() => Error('Couldn\'t delete.'))
}

document.querySelector('#edit-ramen').addEventListener('submit', editRamen)
document.querySelector('#new-ramen').addEventListener('submit', postNewRamen)

init()

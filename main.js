document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const width = 10
    const height = 20
    const squares = Array.from(grid.querySelectorAll('div'))



    // get the Tetrominos and gtoup in 1 variable
    const lTetro = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetro = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetro = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetro = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetro = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]


    const allTetros = [lTetro,
        zTetro, tTetro, oTetro, iTetro
    ]

    // make a way to select tetros randomly
    const random = Math.floor(Math.random() * allTetros.length)
    const rotation = 0
    const current = allTetros[random][rotation]

    // find a way to make the tets drop down

    const currentPosition = 4
        // create a function that shapes each square
    function draw() {
        current.forEach(index => (squares[currentPosition * index].classList.add('block')))
    }


    // create a function to undraw shapes
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('block')
        })
    }

    // create a funtion to move shapes down
    function moveDown() {
        undraw()
        currentPosition = currentPosition += width
        draw()
            //freeze()
    }


    function moveRight() {
        undraw()
        const rightEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!rightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition -= 1
        }
        draw()

    }





})
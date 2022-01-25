document.addEventListener("DOMContentLoaded", () => {


    const startBtn = document.querySelector('button')
    const scoreDisplay = document.querySelector(".score-display")
    const linesDisplay = document.querySelector(".line-display")
    const grid = document.querySelector(".grid")
    const displaySquares = document.querySelectorAll('.previous-grid div')
    const width = 10
    const height = 20
    let squares = Array.from(grid.querySelectorAll('div'))
    let currentRotation = 0
    let timerId
    let score = 0
    let lines = 0
    let nextRandom = 0
    let currentIndex = 0


    function control(e) { // create a function to cotrol tetros and attch functions e=== event
        if (e.KeyCode === 39) {
            moveRight()
        } else if (e.KeyCode === 38) {
            rotate()
        } else if (e.KeyCode === 37) {
            moveLeft()
        } else if (e.KeyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keyup', control) // move the tetro down faster if wanted


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
    let random = Math.floor(Math.random() * allTetros.length)
        //const currentRotation = 0
    const current = allTetros[random][currentRotation]

    // find a way to make the tets drop down

    let currentPosition = 4
        // create a function that shapes each square
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block')
        })
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
        freeze()
    }


    function moveRight() { // write a function that prevents collisions moving right
        undraw()
        const rightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!rightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition -= 1
        }
        draw()

    }

    function moveLeft() { // create a function to move tetro left
        undraw()
        const leftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!leftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition += 1
        }
        draw()
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') || squares[currentPosition + index + width].classList.contains('block2'))) {
            current.forEach(index => squares[index + currentPosition].classList.add('block2'))
            random = nextRandom
            nextRandom = Math.floor(Math.random() * allTetros.length)
            current + allTetros[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()

        }
    }
    freeze()

    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * allTetros.length)
            displayShape()
        }
    })

    function rotate() { // create a function to rotate tetros as they drop
        undraw()
        currentRotation++
        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = allTetros[random][currentRotation]
        draw()
    }
    //draw()

    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }

    // show last tetro in display
    const displayWidth = 4
        //const displaySquares = document.querySelectorAll('.previous-grid div')
    const displayIndex = 0

    const smallTetros = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
        [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
        [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
    ]

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('block')
                //square.style.backgroundImage = 'none'
        })
        smallTetros[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block')
                //displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
        })
    }


    function addScore() {
        for (currentIndex = 0; currentIndex < 199; currentIndex += width) {
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
            if (row.every(index => squares[index].classList.contains('block2'))) {
                score += 10
                lines += 1
                scoreDisplay.innerHTML = score
                linesDisplay.innerHTML = lines
                row.forEach(index => {
                        //squares[index].style.backgroundImage = 'none'
                        squares[index].classList.remove('block2') || squares[index].classList.remove('block')

                    })
                    // splice the array remove completed row
                const squaresRemoved = squares.splice(currentIndex, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

})
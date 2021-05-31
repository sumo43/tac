import React, { Component } from 'react'
import './Game.css'

const pprint = (num) => {
    if (num == 2) return ' ';
    else if(num == 0) return 'O';
    else if(num == 1) return 'X';
}

//this is fine
const isFull = (state) => {
    let check = true
    let i;
    let j;
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            if(state[i][j] == 2) check = false
        }
    }

    return check 
}

//this is fine
const won = (state) => { 
    let i = 0;
    let ret = -1

    for(i = 0; i < 3; i++) {
        if(state[i][0] == 1 && state[i][1] == 1 && state[i][2] == 1) {
            ret = 1
        }
        else if(state[i][0] == 0 && state[i][1] == 0 && state[i][2] == 0) {
            ret = 0
        }
    }

    for(i = 0; i < 3; i++) {
        if(state[0][i] == 1 && state[1][i] == 1 && state[2][i] == 1) {
            ret = 1
        }
        else if(state[0][i] == 0 && state[1][i] == 0 && state[2][i] == 0) {
            ret = 0
        }
    }

    if(state[0][0] == 0 && state[1][1] == 0 && state[2][2] == 0) ret = 0
    else if(state[0][0] == 1 && state[1][1] == 1 && state[2][2] == 1) ret = 1


    if(state[0][2] == 0 && state[1][1] == 0 && state[2][0] == 0) ret = 0
    else if(state[0][2] == 1 && state[1][1] == 1 && state[2][0] == 1) ret = 1
    
    if(isFull(state)) {
        ret = 2
    }
    
    return ret
}

const arrayMax = (array) => {
    let max = -4000
    let maxIndex = 2
    let i

    for(i = 0; i < array.length; i++) {
        if(array[i] >= max) {
            max = array[i]
            maxIndex = i
        }
    }


    return maxIndex
}

const arrayMin = (array) => {
    let min = 40000
    let minIndex = 2
    let i

    for(i=0; i < array.length; i++) {
        if(array[i] <= min) {
            min = array[i]
            minIndex = i
        }
    }

    return minIndex
}

const arrMap = (array, func) => {
    let arr = []
    let i
    for(i=0; i < array.length; i++) {
        arr.push(func(array[i]))
    }

    return arr
}

const minvalue = (state) => {
    
    let w = won(state)
    if(w == 0) {
        console.log(state)
        return 1
    } 
    else if(w == 1) return -1
    else if(w == 2) {
        return 0
    }
    else {
        let neighbors = n(state, 1)
        let neighborMaxvalue = arrMap(neighbors, maxvalue)

        let min = arrayMin(neighborMaxvalue)
        return min
    }
    
}

//separate out minimax and algorithm functions - minimax only returns numbers per board, etc. 

const maxvalue = (state) => { 

    let w = won(state)   
    if(w == 0) return 1 
    else if(w == 1) return -1
    else if(isFull(state)) {
        return 0
    }
    else
    {
        let neighbors = n(state, 0)
        let neighborMinvalue = arrMap(neighbors, minvalue)

        let max = arrayMax(neighborMinvalue)
        return max
    }
    
}

//starting with computer
const minimax = (state, i) => {

    if (i == 0) {

        //max of min values of all of the neighbors
        let neighbors = n(state, 0)
        let maxIndex = arrayMax(arrMap(neighbors, minvalue))
        return neighbors[maxIndex]
    }

}

const n = (state, p) => {
    let nei = []
    let i 
    let j 
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            if(state[i][j] == 2) {
                let newState = JSON.parse(JSON.stringify(state))
                newState[i][j] = p
                nei.push(newState)
            }
        }
    }
    
    return nei
}

var state = [[2,2,2], [2,2,2], [2,2,2]]
class Game extends React.Component {
    constructor() {
        super()
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
        this.restartHandler = this.restartHandler.bind(this)
        this.game()
    }

    game() {
        this.render() 
    }

    restartHandler() {
        state = [[2,2,2], [2,2,2], [2,2,2]] 
        this.forceUpdate()
    }

    forceUpdateHandler() {
        this.forceUpdate()
    }

    action (one, two) {
        //human turn
        //computer turn
        state[one][two] = 1


        var optimalAction = minimax(state, 0)
        state = optimalAction

        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div class='grid-container'>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[0][0])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(0, 0)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[0][1])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(0, 1)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[0][2])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(0, 2)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[1][0])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(1, 0)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[1][1])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(1, 1)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[1][2])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(1, 2)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[2][0])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(2, 0)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[2][1])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(2, 1)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[2][2])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(2, 2)}}></button>
                    </div>
                </div>
                <div class='footer' onClick ={this.restartHandler}>
                    <button>RESTART</button>
                </div>
            </div>

        )

    }
}




export default Game

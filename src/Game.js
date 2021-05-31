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
const utility = (state) => { 
    let i = 0;
    let ret = 2

    for(i = 0; i < 3; i++) {
        if(state[i][0] == 1 && state[i][1] == 1 && state[i][2] == 1) {
            ret = 1
        }
        else if(state[i][0] == 0 && state[i][1] == 0 && state[i][2] == 0) {
            ret = -1
        }
    }

    for(i = 0; i < 3; i++) {
        if(state[0][i] == 1 && state[1][i] == 1 && state[2][i] == 1) {
            ret = 1
        }
        else if(state[0][i] == 0 && state[1][i] == 0 && state[2][i] == 0) {
            ret = -1
        }
    }

    if(state[0][0] == 0 && state[1][1] == 0 && state[2][2] == 0) ret = -1
    else if(state[0][0] == 1 && state[1][1] == 1 && state[2][2] == 1) ret = 1


    if(state[0][2] == 0 && state[1][1] == 0 && state[2][0] == 0) ret = -1
    else if(state[0][2] == 1 && state[1][1] == 1 && state[2][0] == 1) ret = 1
    
    if(isFull(state)) {
        ret = 0
    }
    
    return ret
}

const argMax = (array) => {
    let max = -4000
    let maxIndex = 0
    let i

    for(i = 0; i < array.length; i++) {
        if(array[i] >= max) {
            max = array[i]
            maxIndex = i
        }
    }


    return maxIndex
}

const argMin = (array) => {
    let min = 40000
    let minIndex = 0
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
    

    let util = utility(state)
    if(util != 2) {
        return util
    }
    let neighbors = n(state, 0)
    let neighborMaxvalue = neighbors.map(maxvalue)
    let min = Math.min(...neighborMaxvalue)
    return min
    
}

//separate out minimax and algorithm functions - minimax only returns numbers per board, etc. 

const maxvalue = (state) => { 

    let util = utility(state)
    if(util != 2)
    {
        return util
    }

    let neighbors = n(state, 1)
    let neighborMinvalue = neighbors.map(minvalue)
    let max = Math.max(...neighborMinvalue)
    return max
    
}


//starting with computer
const minimax = (state, i) => {

    if (i == 0) {
        //max of min values of all of the neighbors
        let neighbors = n(state, 0)
        let maxIndex = argMin(arrMap(neighbors, maxvalue))
        return neighbors[maxIndex]
    }
    if (i == 1) {
        //max of min values of all of the neighbors
        let neighbors = n(state, 1)
        if(neighbors.length == 0) {
            return utility(state)
        }
        let minIndex = argMax(arrMap(neighbors, minvalue))
        console.log(minvalue(neighbors[minIndex]))
        return neighbors[minIndex]
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


var initialState = [[2,2,2], [2,2,2], [2,2,2]]
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
        initialState = [[2,2,2], [2,2,2], [2,2,2]] 
        this.forceUpdate()
    }

    forceUpdateHandler() {
        this.forceUpdate()
    }

    action (one, two) {
        //human turn
        //computer turn
        initialState[one][two] = 1
        var optimalAction = minimax(initialState, 0)
        initialState = optimalAction

        if(utility(initialState) == 0) {
            console.log('Nobody won')
        }
        else if(utility(initialState) == 1) {
            console.log('X won')
        }
        else if(utility(initialState) == -1) {
            console.log('O won')
        }

        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div class='grid-container'>
                    <div class='grid-item'>
                        <p class='text'>{pprint(initialState[0][0])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(0, 0)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(initialState[0][1])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(0, 1)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(initialState[0][2])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(0, 2)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(initialState[1][0])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(1, 0)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(initialState[1][1])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(1, 1)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(initialState[1][2])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(1, 2)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(initialState[2][0])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(2, 0)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(initialState[2][1])}</p>
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(2, 1)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(initialState[2][2])}</p>
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

import React, { Component } from 'react'
import './Game.css'

const pprint = (num) => {
    if (num == 2) return 'E';
    else if(num == 0) return 'O';
    else if(num == 1) return 'X';
}

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

const won = (state) => { 
    let i;
    let sums = []
    let sum;

    for(i = 0; i < 3; i++) {
        sum = state[i][0] + state[i][1] + state[i][2]        
        sums.push(sum)
    }

    for(i = 0; i < 3; i++) {
        sum = state[0][i] + state[1][i] + state[2][i]
        sums.push(sum)
    }

    sums.push(state[0][0] + state[1][1] + state[2][2])
    sums.push(state[0][2] + state[1][1] + state[2][0])

    let ret = -1

    sums.forEach((sum) => 
    {
        if(sum == 3) {
            ret = 1
        }
        else if(sum == 0) {
            ret = 0
        }
    })
    return ret
}

const AIMin = (state) => {
    
    if(isFull(state))
    {
        let w = won(state)
        if(w == 0) return -1
        if(w == 1) return 1
        if(w == -1) {
            return 0
        }
    }

    let neighbors = n(state, 1)
    let neighborAIMax = neighbors.map(x => AIMax(x))
    let i = neighborAIMax.indexOf(Math.min(neighborAIMax))

    return neighbors[i]

}

const AIMax = (state) => {
     
    if(isFull(state))
    {
        let w = won(state)   
        if(w == 0) return 1
        if(w == 1) return -1
        if(w == -1) {
            return 0
        }
        
    }

    let neighbors = n(state, 0)
    let neighborAIMin = neighbors.map(x => AIMin(x))
    let i = neighborAIMin.indexOf(Math.max(neighborAIMin))



    return neighbors[i]
}

const n = (state, p) => {
    let nei = []
    let i = 0
    let j = 0
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
        this.game()
    }

    game() {
        this.render() 
    }

    forceUpdateHandler() {
        this.forceUpdate()
    }


    action (one, two) {
        //human turn
        state[one][two] = 1

        
        //computer turn
        let compState = AIMax(state)
        state = compState

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
                <div class='footer'>
                    <button>RESTART</button>
                </div>
            </div>

        )

    }
}




export default Game

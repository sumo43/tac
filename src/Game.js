import React, { Component } from 'react'
import './Game.css'

const pprint = (num) => {
    if (num == 2) return 'E';
    else if(num == 0) return 'O';
    else if(num == 1) return 'X';
}

const PrintState = (props) => {

    const state = props.state
    console.log(state)

    return (
        <>
        <div class='grid-item'>
        <button>CLICK ME</button>
        </div>
        <div class='grid-item'>{pprint(state[0][1])}</div>
        <div class='grid-item'>{pprint(state[0][2])}</div>
        <div class='grid-item'>{pprint(state[1][0])}</div>
        <div class='grid-item'>{pprint(state[1][1])}</div>
        <div class='grid-item'>{pprint(state[1][2])}</div>
        <div class='grid-item'>{pprint(state[2][0])}</div>
        <div class='grid-item'>{pprint(state[2][1])}</div>
        <div class='grid-item'>{pprint(state[2][2])}</div>
        </>
    );
}

const isFull = (state) => {
    let check = true
    let i;
    let j;
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            if(state[i][j] === 2) check = false
        }
    }
    return check 
}

const state = [[2,2,2], [2,2,2], [2,2,2]]
class Game extends React.Component {
    constructor() {
        super();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
        this.game();
    }

    game() {
        this.render()
    }

    forceUpdateHandler() {
        this.forceUpdate()
    }

    restartHandler() {
    }
    action (one, two) {
        console.log(one)
        console.log(two)
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
                        <button class='button' style={{fontSize:`10px`}} onClick={() => {this.action(1, 1)}}></button>
                    </div>
                    <div class='grid-item'>
                        <p class='text'>{pprint(state[2][1])}</p>
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

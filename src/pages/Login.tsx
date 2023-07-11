import React from 'react'

const wotlkAudio = require('../assets/wotlk_login_sound.mp3');


export default function Login() {


    return (
        <div>
            <audio controls autoPlay loop  id="playAudio">
                <source src={wotlkAudio} />
            </audio>
        </div>
    )
}

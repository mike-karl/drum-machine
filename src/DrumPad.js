import './App.scss';

import {useEffect, useState} from 'react'

function DrumPad(props) {
    const [isPadActive, setIsPadActive] = useState(false)

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return function cleanup() {
          document.removeEventListener('keydown', handleKeyPress);
        }
      });
      function activatePad() {
          if (props.power) {
          setIsPadActive(!isPadActive)
          setTimeout(() => setIsPadActive(isPadActive), 100);
          } 
      }
      function deactivatePad() {
        if (isPadActive) {
            setTimeout(() => setIsPadActive(!isPadActive), 200);
          }
      }
      function handleKeyPress(e) {
        if (props.power){
            if (e.keyCode === props.keyCode) {
                playSound();
                
            }
        }
      }
      function playSound() {
        if (props.power) {
        const sound = document.getElementById(props.keyTrigger)
        sound.currentTime = 0;
        sound.play();
        activatePad();
        deactivatePad();
        props.inputDisplay(props.clipId.replace(/-/g, ' '));
        }
      }
      const padStyle = isPadActive ? {
        backgroundColor: '#ff7043',
        boxShadow: 'none',
        minwidth: '7.5rem',
        minHeight: '5rem',
        display: 'grid',
        justifyItems: 'center',
        alignItems: 'center',
        borderRadius: '10%',
      } : {
        backgroundColor: '#006064',
        minwidth: '7.5rem',
        minHeight: '5rem',
        display: 'grid',
        justifyItems: 'center',
        alignItems: 'center',
        borderRadius: '10%',
        boxShadow: '5px 5px 5px #333',
      };
      
    return (
        <div className="DrumPad">
            <div 
            className="drum-pad pointerOnHover" 
            id={props.clipId} 
            style={padStyle}
            onClick={playSound} >
                <h1>{props.keyTrigger}</h1>
                <audio 
                className="clip" 
                id={props.keyTrigger} 
                src={props.clip}
                preload="auto"
                 />
            </div>
        </div>
    );
}

export default DrumPad;

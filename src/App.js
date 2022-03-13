import './App.scss';
import {useEffect, useState} from 'react';
import {FaPowerOff} from 'react-icons/fa';
import PadBank from './PadBank';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];
const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

function App(props) {
  const [inputDisplay, setInputDisplay] = useState('Power On!');
  const [isOn, setIsOn] = useState(true);
  const [bankSlider, setBankSlider] = useState(false);
  const [currentBank, setCurrentBank] = useState(bankOne)
  const [sliderVal, setSliderVal] = useState(0.3)
  useEffect(() => {
    const displayTimer = setTimeout(() => setInputDisplay(''), 1000);
    return function cleanup() {
      clearTimeout(displayTimer);
    }
  });

  function handlePowerSlider() {
    if (!isOn) {
      setIsOn(!isOn)
    setInputDisplay('Power On!')
    }else {
      setIsOn(!isOn)
      setInputDisplay('Power Off')
    }
  }
  function handleBankSlider() {
    if (isOn) {
      setBankSlider(!bankSlider)
      if (bankSlider) {
        setInputDisplay('Heater Kit')
        setCurrentBank(bankOne)
        }else {
          setInputDisplay('Smooth Piano Kit')
          setCurrentBank(bankTwo)
        }
    }
  }

  function adjustVolume(e) {
    if (isOn) {
      setSliderVal(e.target.value)
      setInputDisplay('Volume: ' + Math.round(e.target.value * 100))
    }
  }
  function displayClipName(name) {
    if (isOn) {
      setInputDisplay(name);
    }
  }

  const clips = [].slice.call(document.getElementsByClassName('clip'));
  clips.forEach(sound => {
    sound.volume = sliderVal;
  });
  let thisBank = bankSlider ? "on" : "off";
  let power = isOn ? "on" : "off";
  return (
    <div className="App" id="drum-machine">
      <div className="wrapper" id="display">
        <PadBank clipVolume={sliderVal} currentBank={currentBank} power={isOn} inputDisplay={displayClipName} />
        <div className="controller">
          <div className="power">
          <h2 className="powerText"><FaPowerOff style={isOn ? {color: '#c63f17', marginTop: '5px', marginBottom: '-3px'} : {color: 'black', marginTop: '5px', marginBottom: '-3px'}}/> Power</h2>
            <div className="btnSwitch pointerOnHover" id={power} onClick={handlePowerSlider}></div>
          </div>
          <div className="inputDisplay">
            <h3>{inputDisplay}</h3>
          </div>
          <div className="volumeSlider pointerOnHover">
            <input type="range" id="volume" name="volume" min="0" max="1" onChange={adjustVolume} step='.01' value={sliderVal}/>
          </div>
          <div className="bank">
            <h2 className="bankText">Bank</h2>
            <div className="btnSwitch pointerOnHover" id={thisBank} onClick={handleBankSlider}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import DrumPad from './DrumPad';
import'./App.scss';
function PadBank(props) {
    let padBank;
    if (props.power) {
        padBank = props.currentBank.map((drumObj, i, padBankArr) => {
            return (
                   <DrumPad 
                   key={i}
                   clip={padBankArr[i].url}
                   clipId={padBankArr[i].id}
                   keyCode={padBankArr[i].keyCode}
                   keyTrigger={padBankArr[i].keyTrigger}
                   power={props.power}
                   inputDisplay={props.inputDisplay}
                   />
            )
        });
        }else {
            padBank = props.currentBank.map((drumObj, i, padBankArr) => {
                return (
                    <DrumPad 
                    key={i}
                    clip={padBankArr[i].url}
                    clipId={padBankArr[i].id}
                    keyCode={padBankArr[i].keyCode}
                    keyTrigger={padBankArr[i].keyTrigger}
                    power={props.power}
                    inputDisplay={props.inputDisplay}
                    />
                )
            })
        }
    return (
        <div className="pad-bank">
           {padBank}
        </div>
    );
}

export default PadBank;
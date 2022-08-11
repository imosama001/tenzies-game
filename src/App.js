import { useEffect, useState } from 'react';
import './App.css';
import Dice from './components/Dice';
import { v4 as uuidv4 } from 'uuid';
import ReactConfetti from 'react-confetti';

function App() {
  
  const [dice,setDice]=useState(allNewDice());
  const [tenzies,setTenzies]=useState(false);

  useEffect(()=>{
    const allHeld=dice.every(die=>die.isHeld)
    const firstValue=dice[0].value;
    const allSameValue=dice.every(die=>die.value===firstValue);
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("you won");
    }
  },[dice])
  function generateNewDie(i){
    return{
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:uuidv4()
    }
  }

  function allNewDice(){
    const newDice=[];
    for(let i=0;i<10;i++){
      newDice[i]=generateNewDie(i)
    }
    return  newDice
  }

  function rollDice(){
    if(!tenzies){
    setDice(oldDice=>oldDice.map(die=>{
            return die.isHeld ? die : generateNewDie()
         }))
       }
       else{
        setTenzies(false);
        setDice(allNewDice())
       }
    }
  function holdDice(id){
  setDice(oldDice=>oldDice.map(die=>{
    return die.id===id ? {...die,isHeld:!die.isHeld}:
    die
  }))
  }

  const diceElements=dice.map(die=>
  <Dice 
  key={die.id} 
  value={die.value} 
  isHeld={die.isHeld} 
  holdDice={()=>holdDice(die.id)}
  />)


  return (
    <main >
      {tenzies && <ReactConfetti/>}
      <h1 className='title'>Tenzies Game</h1>
      <p className='instructions'>Roll untill all dice are the same. Click each die to freez
      it at its current value between the rolls.</p>
      <div className='dice--container'>
        {diceElements}

      </div>
      <button className='roll--dice' onClick={rollDice}>{tenzies? "Restart":"Roll"}</button>
    </main>
  );
}

export default App;

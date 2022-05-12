import { useEffect, useState } from "react";
import {FaTractor, FaDove, FaTwitter, FaSatellite, FaShip, FaAndroid, FaReact, FaRobot } from 'react-icons/fa';
import Gamescore from './Gamescore';

const Grid = ({counter, counterFalse}) => {

  var myInterval;
  const [indiz, setIndiz] = useState(0)
  var [countFalse, setCountFalse] = useState(0)
  var [countMoves, setCountMoves] = useState(0)
  var [count, setCount] = useState(0)
  const [pairname, setPairname] = useState("")
  const [pairname2, setPairname2] = useState("")
  const [memorys, setMemorys] = useState([{icon: FaAndroid, show: false}, {icon: FaTractor, show: false}, {icon: FaDove, show: false}, {icon: FaTwitter, show: false}, {icon: FaReact, show: false}, {icon: FaSatellite, show: false}, {icon: FaTractor, show:false},
                   {icon: FaShip, show: false}, {icon: FaAndroid, show: false}, {icon: FaTwitter, show: false}, {icon: FaReact, show: false}, {icon: FaRobot, show: false}, {icon: FaDove, show: false}, {icon: FaShip, show: false},
                   {icon: FaSatellite, show: false}, {icon: FaRobot, show: false}])
  useEffect(() => {
    counter(countMoves)
    counterFalse(countFalse)
  },[countMoves])

  useEffect(() => {
    shuffle(memorys)
  },[])

  function restartGame(){
    setCount(0); setCountMoves(0); setCountFalse(0); setIndiz(0)
    setPairname(""); setPairname2(""); 
    shuffle(memorys)
  }

  function shuffle(memorys){
    let currentIndex = memorys.length, randomIndex;
    let updMemory = [...memorys]
    for ( var i = 0; i < 16; i++){
      updMemory[i] = {...memorys[i], show: false}
    }
    while ( currentIndex != 0){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [updMemory[currentIndex], updMemory[randomIndex]] = [
        updMemory[randomIndex], updMemory[currentIndex]
      ]
    }
    setMemorys(updMemory)
  }

  function firstChoice(item, index){
    
    if (pairname === ""){
       setPairname(item.icon.name)
       let updMemory = [...memorys]
       updMemory[index] = {...memorys[index], show:true}
       setMemorys(updMemory)
       setIndiz(index)
       console.log(item.icon.name)
  }
}

  function searchMatch(item, index){
     
    if (pairname2 === ""){
      if (indiz != index){
        setCountMoves(++countMoves)
      }
      setPairname2(item.icon.name)
      let updMemory = [...memorys]
      updMemory[index] = {...memorys[index], show:true}
      setMemorys(updMemory)
      console.log(item.icon.name)
      if (pairname === item.icon.name && indiz != index){
        
         console.log("Match")
         setCount(++count)
         setPairname("")
         setPairname2("")
      }
      else {
         console.log("False")
         if (indiz != index){
           setCountFalse(++countFalse)
         }
         myInterval = setInterval(() => timeSetter(index), 1000)
     }
     if (count === 8){
         console.log("Win")
         alert("You won")
     }
    }
  }

  function timeSetter(index){
    let updMemory = [...memorys]
    console.log(updMemory)
    updMemory[index] = {...memorys[index], show:false}
    updMemory[indiz] = {...memorys[indiz], show:false}
    setMemorys(updMemory)
    setIndiz(0)
    clearInterval(myInterval)
    setPairname("")
    setPairname2("")
  }
    return(
        <div>
          <Gamescore counter={countMoves}
                   restart = {restartGame}
                   counterFalse={countFalse} />
          <ul className = "board" >
        
        {memorys.map((Item, index) => {
       // {console.log(Item.show)}
            return(
            
            <li id = {index} className={Item.show ? "card open" : "card"} key = {index}>
                <button onClick={() => {pairname === "" ? firstChoice(Item, index) : searchMatch(Item, index)}}>
                   {Item.show ? <Item.icon style = {{ width: 100, height: 100}}/> : ""}</button>
            </li>

            
          )})}
          </ul>
        </div>
    )
}

export default Grid;

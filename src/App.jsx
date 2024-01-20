import Components from './components'
import React from 'react'
import {nanoid} from 'nanoid'
import './App.css'
export default function App(){
  const[dice,setDice]=React.useState(generateNewDice())
  const [tanzie,setTanzie]=React.useState(false)
  const[held,setHeld]=React.useState(false)
    function generateNewDice(){
            const Newarray=[]
            for(let i=0;i<10;i++){
              Newarray.push({id:nanoid(),
              value:Math.ceil(Math.random()*6),
              isHeld:false,
              error:false,
              start:Date.now()
            })
            }
            return Newarray
    }
    React.useEffect(()=> {
      setTanzie(()=> dice.every((sin)=> sin.isHeld===true && sin.value==dice[0].value))
      setHeld(()=> dice.every((sin)=> sin.isHeld==true))
    },[dice]
     
    )
    const element=dice.map((one)=> <Components 
    key={one.id} 
    cval={one.change}
    value={one.value}
     handle={()=> handleClick(one.id)}
      held={one.isHeld}
      error={one.error}
       />)
    function RollDice(){
      tanzie? setDice(generateNewDice()) :
      setDice((old)=> old.map((dic)=> {
        return (dic.isHeld ? dic: {...dic,value:Math.ceil(Math.random()*6),error:false})
      }
          ))
    }
    function error(){
      const arr=dice.map((sin)=> sin.value)
      let rep=0,rep2=0
      let ind=0
      for (let i=0;i<arr.length;i++){
        rep=0;
        for(let j=1;j<arr.length;j++){
            if (arr[i]===arr[j]){
              rep=rep+1
            }
        }
        if(rep >rep2){
          ind=i;
          rep2=rep;
        }
       
      }
      setDice((old)=> old.map((sin)=> sin.value != arr[ind]?{...sin,error:true}:sin))
    }
    function handleClick(id){
      setDice((old)=> old.map((dices)=> {
              
        return dices.id===id?{...dices,isHeld:!dices.isHeld}:dices
      }))
      
    }
  return (
    <div className="outer-box">
        <div className="big-box">
            <div className="outer-container " >
                  <div className="title"> 
                        <h1 className="title-h">Tanzi Game</h1>
                        <p className="title-p"> all ten of your dice to show the same number</p>
                        <h3 className="title-h3">{tanzie?  "Time" + (Date.now()-dice[0].start)/1000 +" "+ "seconds":""}  </h3>
                  </div>
                  <div className="container"> 
                      {element}

                  </div>
                <button className="dice-roll" onClick={RollDice}>{tanzie? "NEW GAME":"Roll"}</button>

            </div>
         {held&&!tanzie&& <div>
                              <button onClick={error}  className="help">HELP</button>
                              <p className="help-p">undo -red one- after click</p>
                          </div>}


        </div>
        
    </div>
  )
}
import { useReducer, useState } from 'react'
import './styles.css'
import { DigitButton } from './DigitButton'
import { OperationButton } from './OperationButton'


export const ACTIONS = { 
  ADD_DIGIT : 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR : 'clear',
  DELETE_DIGIT : 'delete-digit',
  EVALUATE : 'evaluate',

};

function reducer(state,{type,payload}) {

  switch(type) {
    case ACTIONS.ADD_DIGIT :

    if (payload.digit === "0" && state.currentOperand === "0") {
     
      return state
    
    }
   
    if (payload.digit === "." && state.currentOperand.includes(".")) {
     
      return state
    
    }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

      case ACTIONS.CLEAR :

      return {}

     
      case ACTIONS.CHOOSE_OPERATION :
       
        
        if(state.currentOperand == null && state.prevOperand == null){
          return state
        }

        if(state.currentOperand == null)
        {
          return{
          ...state,
          operation:payload.operation
          }
        }

        if(state.prevOperand == null) {
          return{
            ...state,
            operation : payload.operation,
            prevOperand : state.currentOperand,
            currentOperand : null,
        }


        }
        
        return {
          ...state,
          prevOperand: evaluate(state),
          operation:payload.operation,
          currentOperand:null
        }
      
      case ACTIONS.EVALUATE :
        if (
          state.operation == null ||
          state.currentOperand == null ||
          state.prevOperand == null
        ) {
          return state
        }

        return {
          ...state,
          prevOperand:null,
          operation:null,
          currentOperand:evaluate(state),
        }

      case ACTIONS.DELETE_DIGIT:
        if(state.currentOperand == null) return state
        
        if(state.currentOperand.length === 1){
          return{
            ...state,
            currentOperand : null
          }
        }

       return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
       } 
  }
    
    function evaluate({currentOperand,prevOperand,operation})
     {
      const prev=parseFloat(prevOperand)
      const current =parseFloat(currentOperand)
      if(isNaN(prev) || isNaN(current)) return ""

      let computation = ""

      switch(operation) {
        case "+" :
          computation = prev + current
          break

        case "-" :
          computation = prev - current
          break
        case "/" :
            computation = prev /current
            break  
        case "*" :
            computation = prev * current
            break
        
      }

      return computation.toString()
     } 

}

const INTEGER_FORMATTER =new Int1.NumberFormat("en-us",{
  maximumFractionDigits:0,
})

function App() {

 const [{currentOperand,prevOperand,operation},dispatch] = useReducer(
  reducer,
  {}
  )

 
  return (
    <div className='Cal-Grid'>
      <div className='output'>
      <div className='prev-operand'>{prevOperand} {operation}</div>
      <div className='current-operand'>{currentOperand}</div> 
      </div>  
      <button className='span-two' onClick={()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}/>
    <DigitButton digit="1" dispatch={dispatch}/>
     <DigitButton digit="2" dispatch={dispatch}/>
     <DigitButton digit="3" dispatch={dispatch}/> 
     <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className='span-two' onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button> 

    </div>

  
        
  )
}

export default App

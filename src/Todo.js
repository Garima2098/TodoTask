import React, { useEffect, useState } from 'react'
import "./style.css"

//getting the local storage data
const getLocalStorageData=()=>{
    const lists=localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);

    }
    else{
       return [] ;
    }
}
function Todo() {
    const[ inputData, setInputData]=useState("");
    const[items,setItems]=useState(getLocalStorageData());
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleButton,setToggleButton]=useState(false);
    //Add the items function
    const addItem=()=>{
        if(!inputData){
            alert("Add the items")
        }else if(inputData && toggleButton){
                setItems(
                    items.map((curElem)=>{
                        if(curElem.id === isEditItem){
                        return{...curElem,name:inputData};
                    }
                   return curElem;
                 } )
                )
                setInputData("");
                setIsEditItem(null);
                setToggleButton(false);
        }
        else{
            
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputData,
            }
            setItems([...items,myNewInputData])
            setInputData("");
        }
    }

    //Deleting the items

    const deletedItem=(index)=>{
        const updatedItem=items.filter((curElem)=>{
            return !(curElem.id === index);
        })
        setItems(updatedItem)
    }

    //Removing all the items
    const Removeall=()=>{
        setItems([])
    }

    //Edit the items
    const editItem=(index)=>{
        const item_todo_edited=items.find((curElem)=>{
            return curElem.id ===index
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    //Storing the local storage on the console.
    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items))
    },[items])

  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                
                <figcaption>Add Your List Here✌️ </figcaption>
            </figure>
            <div className='addItems'>
                <input type="text" placeholder='✍️Add Items' className='form-control' 
                    value={inputData}
                    onChange={(event)=>setInputData(event.target.value)}
                />
                
                {toggleButton?(<i className=" fa fa-solid fa-pen-to-square" onClick={addItem}></i>):
                (<i className=" fa fa-sharp fa-solid fa-plus" onClick={addItem}></i>)}
                <div>
                    <div className='showItems'>
                    {items.map((curElem,id)=>{
                        return(
                            <div className='eachItem'>
                            <h3>{curElem.name}</h3>
                            <div className='todo-btn'>
                            <i className="fa-solid fa-pen-to-square" onClick={()=>editItem(curElem.id)}></i>
                            <i className='fa-sharp fa-solid fa-trash' onClick={()=>deletedItem(curElem.id)}></i>
                            </div>
                        </div>
                        )
                    })}
                        
                    </div>
                </div>
            </div>
            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove all" onClick={Removeall}><span>CHECK LIST</span></button>
                
            </div>
        </div>
    </div>
    </>
  )
}

export default Todo

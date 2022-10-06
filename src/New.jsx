import React, {useState} from 'react'
import logo from './to_do_logo-300x300-removebg-preview.png';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const New = () => {
    const [taskData, setTask]=useState('');
    const [tasks, showTasks]=useState([]);
    const [togglePlus,setTogglePlus]=useState(true);
    const [edittedTask,setEdittedTask]=useState(null);
    const addTasks=()=>{
        if(!taskData){
            alert('Put Task First!')
        }
        else if(taskData && !togglePlus){
            showTasks(
                tasks.map((elem)=>{
                    if(elem.id === edittedTask){
                        return {...elem , name:taskData}
                    }
                    return elem;
                })
            )
            setTogglePlus(true);
            setTask('');
            setEdittedTask(null);
        }
        else{
            const allInputTask={id: new Date().getTime().toString(), name:taskData}
        showTasks([...tasks, allInputTask]);
        setTask('');
        }
    }
    const deleteTasks=()=>{
        showTasks([]);
        setTask('');
    }
    const deleteEach=(index)=>{
        const updatedList=tasks.filter((elem)=>{
            return index != elem.id
        });
        showTasks(updatedList);
    }
    const editEach=(index)=>{
        let newEditTask=tasks.find((elem)=>{
            return elem.id === index;
        })
        setTogglePlus(false);
        setTask(newEditTask.name);
        setEdittedTask(index);
    }
  return (
    <>
        
        <div className='mainDiv'>
            <div className='childDiv'>
                <figure>
                    <img src={logo} alt='logo'/>
                    <figcaption>Add All of Your Tasks Here📝</figcaption>
                </figure>
                <div className='addItems'>
                    <input type='text' placeholder='✍️ What to do?' value={taskData} onChange={(e)=> setTask(e.target.value)}></input>
                    {
                        togglePlus? <AddIcon className="addIcon" title='Add Items' onClick={addTasks}/>:<EditIcon className='editItem' onClick={addTasks}/>
                    }
                </div>
                <div className='showTasks'>
                    {
                        tasks.map((elem,index)=>{
                            return (
                                <div className='eachTask' key={elem.id}>
                                    <p>{elem.name}</p>
                                    <EditIcon className='editItems' onClick={()=>editEach(elem.id)}/>
                                    <DeleteIcon className="delItem"  onClick={()=>deleteEach(elem.id)}/>
                                </div>
                                )
                        })
                    }
                </div>
                <div className='removeBut'>
                    <button onClick={deleteTasks}><span>Remove All</span></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default New;
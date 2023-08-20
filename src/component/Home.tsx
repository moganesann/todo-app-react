import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import { ITodo, PageEnum } from "./Todo.type";
import TodoList from "./TodoList";
import "../styles/Home.style.css";
import {  Button, makeStyles } from '@material-ui/core';


const Home = () => {
  //todoList is an array of ITodo objects that starts an empty array
  const [todoList, setTodoList] = useState([] as ITodo[]);
  //shown page will keep track of the which pages shd be shown to user
  const [shownPage, setShownPage] = useState(PageEnum.list);
  //will be used to store the data of the task that the user wants to edit.
  const [dataToEdit, setDataToEdit] = useState({} as ITodo);
  //history is an array that will be used to keep track of the history of changes to the todoList.
  const [history, setHistory] = useState<ITodo[][]>([]);
  const classes = useStyles();

  //read the TaskList key from localStorage and set the todoList state to the value stored in localStorage.
  useEffect(() => {
    localStorage.clear();
    const listInString = window.localStorage.getItem("TaskList");
    if (listInString) {
      const list = JSON.parse(listInString) as ITodo[];
      _setTodoList(list);
      setHistory([list, ...history]);
    }
  }, []);

  //change the shownPage state back to PageEnum.list,the task list page
  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  //change the shownPage state to PageEnum.add, the add task page.
  const onAddTaskClickHandle = () => {
    setShownPage(PageEnum.add);
  };

  //used to set the dataToEdit state and change the shownPage state to PageEnum.edit, to the edit task page.
  const editTaskData = (data: ITodo) => {
    setShownPage(PageEnum.edit);
    setDataToEdit(data);
  };

  //add a new task to the todoList.
  const addTask = (data: ITodo) => {
    _setTodoList([...todoList, data]);
  };
  
  //delete a task from the todoList
  const deleteTask = (data: ITodo)=> {
    // finds the index of the task to delete
    // creates a new array that excludes the task at that index
    const indexToDelete = todoList.indexOf(data);
    const tempList = [...todoList];
    tempList.splice(indexToDelete, 1);// at indexToDelete position, remove the item
    _setTodoList(tempList);
     alert("Task '" + data.task + "' successfully deleted");
  };
  
  //update a task in the todoList, find the task using its id property
  const updateData = (data: ITodo) => {
    const filteredData = todoList.filter((x) => x.id === data.id)[0];
    const indexOfRecord = todoList.indexOf(filteredData);
    const tempData = [...todoList];
    tempData[indexOfRecord] = data;
    _setTodoList(tempData);
  };
  
  //used to to marks a task as complete
  const completeData = (data: ITodo) => {
    const filteredData = todoList.filter((x) => x.id === data.id)[0];
    const indexOfRecord = todoList.indexOf(filteredData);
    const tempData = [...todoList];
    tempData[indexOfRecord] = data;
    _setTodoList(tempData);
  };

  //update the todoList state, store the new todoList in localStorage, and update the history state
  const _setTodoList = (list: ITodo[]) => {
    setTodoList(list);
    window.localStorage.setItem("TaskList", JSON.stringify(list));
    setHistory([list, ...history]);
  };

  //undo the most recent change to the todoList
  const undo = () => {
    if (history.length > 1) {
      // Remove the latest state from the history
      const newHistory = [...history];
      newHistory.shift();
      setHistory(newHistory);

      // Set the todoList state to the previous state in the history
      const prevTodoList = newHistory[0];
      setTodoList(prevTodoList);
      window.localStorage.setItem("TaskList", JSON.stringify(prevTodoList));
    }
    else {
      alert('Nothing to UNDO!');  
    }
  };

  
  return (
    <>
      <article className="article-header">
        <header>
          <h1>Todo App Using React</h1>
        </header>
      </article>

      <section className="section-content">
        {shownPage === PageEnum.list && (
          <>
            <div className={classes.buttons}>
            <Button variant="contained"
              color="primary"
              value="Add New Task"
              onClick={onAddTaskClickHandle}
            >Add New Task</Button> 
            <Button variant="contained"
              color="secondary"
              onClick={undo}
            >UNDO</Button>
            </div>
            <TodoList 
              list={todoList}
              onDeleteClickHnd={deleteTask}
              onEdit={editTaskData}
              onCompleteClickHnd={completeData}
            />
          </>
        )}

        {shownPage === PageEnum.add && (
          <AddTask
            onBackBtnClickHnd={showListPage}
            onSubmitClickHnd={addTask}
          />
        )}

        {shownPage === PageEnum.edit && (
          <EditTask
            data={dataToEdit}
            onBackBtnClickHnd={showListPage}
            onUpdateClickHnd={updateData}
          />
        )}
      </section>
    </>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  buttons:{
      '& > *': {
      margin: theme.spacing(1),
    },
  },
  }));
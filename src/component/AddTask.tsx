import { useState } from "react";
import { ITodo } from "./Todo.type";
import "../styles/TodoForm.style.css";
import { Button, makeStyles } from '@material-ui/core';

type Props = {
  onBackBtnClickHnd: () => void;
  onSubmitClickHnd: (data: ITodo) => void;
};

const AddTask = (props: Props) => {
  //set the task as empty string
  const [task, setTask] = useState("");
  const classes = useStyles();

  const { onBackBtnClickHnd, onSubmitClickHnd } = props;

  //update the task state variable whenever the user types something in the input field
  const onTaskChangeHandle = (e: any) => {
    setTask(e.target.value);
  };

  //triggers when user clicks submit button
  const onSubmitBtnClickHnd = (e: any) => {
    e.preventDefault();
    if 
    (task.trim().length === 0)
     {
      alert('Please insert your task!');  
     } 
     else 
     {
      const data: ITodo = {
        id: new Date().toJSON().toString(),
        task: task,
        isComplete: false,
      };
      onSubmitClickHnd(data);
      onBackBtnClickHnd();
     }
  };

  return (
    <div className="form-container">
      <div>
        <h3>Add New Task</h3>
      </div>
      <form onSubmit={onSubmitBtnClickHnd}>
        <div>
          <input
            type="text"
            value={task}
            placeholder="Enter New Task"
            onChange={onTaskChangeHandle}
          />
        </div>
        <div className={classes.buttons}>
          <Button variant="contained"
                    color="primary"
                    onClick={onBackBtnClickHnd}>
                    BACK
          </Button> 
          <Button variant="contained"
                    color="primary"
                    onClick={onSubmitBtnClickHnd}>
                    ADD TASK
          </Button>     
        </div>
      </form>
    </div>
  );
};

export default AddTask;


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: "50px"
  },
  buttons:{
      '& > *': {
      margin: theme.spacing(1),
    },
  },
   
}));

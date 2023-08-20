import { useState } from "react";
import { ITodo } from "./Todo.type";
import "../styles/TodoForm.style.css";
import { Button, makeStyles } from '@material-ui/core';

type Props = {
  data: ITodo;
  onBackBtnClickHnd: () => void;
  onUpdateClickHnd: (data: ITodo) => void;
};

const EditTask= (props: Props) => {
  const { data, onBackBtnClickHnd, onUpdateClickHnd } = props;
  const classes = useStyles();

  //set the task as the value of current task being edited
  const [task, setTask] = useState(data.task);

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
     else if (task === data.task)
     {
      alert('Please insert new task!');
     } 
     else 
     {
    const updatedData: ITodo = {
      id: data.id,
      task: task,
      isComplete: false,
    };
    onUpdateClickHnd(updatedData);
    onBackBtnClickHnd();
  }
  };

  return (
    <div className="form-container">
      <div>
        <h3>Edit Task</h3>
      </div>
      <form onSubmit={onSubmitBtnClickHnd}>
        <div>
          <input
            type="text"
            value={task}
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
                    UPDATE TASK
          </Button>     
        </div>
      </form>
    </div>
  );
};

export default EditTask;

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

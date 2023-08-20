import { ITodo } from "./Todo.type";
import "../styles/TodoList.style.css";
import {  makeStyles, Button } from '@material-ui/core';

type Props = {
  list: ITodo[]; //list of tasks to be displayed 
  onDeleteClickHnd: (data: ITodo) => void;
  onEdit: (data: ITodo) => void;
  onCompleteClickHnd: (data: ITodo) => void;
};

const TodoList = (props: Props) => {
  const { list, onDeleteClickHnd, onEdit, onCompleteClickHnd } = props;
  const classes = useStyles();

  //change complete function to false if currently in true, true if currently in false
  const handleOnChange = (data: any) => {
    if (data.isComplete === true){
    const updatedData: ITodo = {
      id: data.id,
      task: data.task,
      isComplete: false,
    };
    onCompleteClickHnd(updatedData);
    }
    else{
    const updatedData: ITodo = {
      id: data.id,
      task: data.task,
      isComplete: true,
    };
    onCompleteClickHnd(updatedData);
    alert('Task successfully completed');
  }
  };

  return (
    <div>
      <article>
        <h2 className="list-header">To-Do App</h2>
      </article>
      <table className="center">
        <tr>
          <th>TASK NAME</th>
          <th>ACTION</th>
          <th>COMPLETE</th>
        </tr>
        {list.map((todo) => {
          return (
            <tr key={todo.id}>
              <td style={{ textDecoration: todo.isComplete? 'line-through' : 'none'}}>
                {`${todo.task}`}
                </td>
              <td>
                <div className={classes.buttons}>
                  <Button variant="contained"
                    color="primary"
                    onClick={() => onEdit(todo)}
                    disabled={todo.isComplete}
                    >
                    EDIT
                  </Button>
                  <Button variant="contained"
                    color="primary"
                    onClick={() => onDeleteClickHnd(todo)}>
                    DELETE
                  </Button>             
                  <Button variant="contained"
                    color="primary"
                    onClick={() => handleOnChange(todo)}
                    disabled={todo.isComplete}
                    >
                    COMPLETE
                  </Button>
                </div>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={() => handleOnChange(todo)}
                  //disabled={todo.isComplete}
                  />
                </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TodoList;

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

import React from 'react';
import classes from './NewTodoForm.module.css';

const NewTodoForm = (props) => {
    let style = props.complete ? classes.NewTodoFormCompleted : classes.NewTodoFormData;
    let text = props.complete ? 'Completed' : 'In-Progress';
    return (
        <tr className={classes.NewTodoForm}>
            <td className={style}>{props.title}</td>
            <td className={style}>{props.descr}</td>
            <td className={classes.NewTodoFormData}><button className={classes.NewTodoFormButtonCom} onClick={props.completedTodo}>{text}</button></td>
            <td className={classes.NewTodoFormData}><button className={classes.NewTodoFormButtonDel} onClick={props.deleteTodo}>Delete</button></td>
            <td className={classes.NewTodoFormData}><button className={classes.NewTodoFormButtonDel} onClick={props.editTodo}>Edit</button></td>
        </tr>
    )
}

export default NewTodoForm;
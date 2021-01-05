import React, { Component } from 'react';
import NewTodoForm from '../../Components/NewTodoForm/NewTodoForm';
import EditTodoForm from '../../Components/EditTodoForm/EditTodoForm';
import classes from './NewTodoFormList.module.css';

export default class NewTodoFormList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { sn: 1, title: "iMock", description: "Work on the iMock solution.", completed: false }
            ],
            sn: "",
            title: "",
            description: "",
            isEditing: false,
            editTodo: { sn: "", title: "", description: ""}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleDelete(idx) {
        const { todos } = this.state;
        const myTodos = todos
            .slice(0, idx)
            .concat(todos.slice(idx + 1));

        this.setState({ todos: myTodos });
    }

    handleCompleted(idx) {
        const { todos } = this.state;
        const myTodos = todos;
        const selectedTodo = myTodos.filter(myTodo => myTodo.sn === idx);
        let checker = selectedTodo[0].completed;
        selectedTodo[0].completed = checker ? false : true;

        this.setState({ todos: myTodos });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleToggle(){
        let edit = this.state.isEditing ? false : true;

        this.setState({isEditing: edit});
    }

    handleSubmit(e) {
        e.preventDefault();
        const myTodos = [...this.state.todos];
        myTodos.push({ sn: this.state.sn, title: this.state.title, description: this.state.description, completed: false });

        this.setState({ todos: myTodos });
        this.setState({ sn: "" });
        this.setState({ title: "" });
        this.setState({ description: "" });
    }

    handleEdit (sn, title, desc) {
        this.setState({isEditing: true});

        const newEditedTodo = {...this.state.editTodo};
        newEditedTodo.sn = sn;
        newEditedTodo.title = title;
        newEditedTodo.description = desc;

        this.setState({editTodo: newEditedTodo});
    }

    extractor (newState) {
        if (newState) {
            const updatedStates = [...this.state.todos];
            const editedTodo = updatedStates.filter(updatedState => updatedState.sn === newState.snEdit);
            editedTodo[0].sn = newState.snEdit;
            editedTodo[0].title = newState.titleEdit;
            editedTodo[0].description = newState.descriptionEdit;

            this.setState({todos: updatedStates});
        }
    }

    render() {
        let form;
        let editButton;

        if (this.state.isEditing) {

            form = <EditTodoForm 
                        sn={this.state.editTodo.sn} 
                        title={this.state.editTodo.title} 
                        description={this.state.editTodo.description}
                        extractor={this.state.extractor}
                        click={(newState)=>this.extractor(newState)} />;

            editButton = <button onClick={this.handleToggle}>Toggle Form</button>;
        } else {
            form = (
                <form onSubmit={this.handleSubmit}>
                    <h3>Create a Todo</h3>
                    <div>
                        <label>
                            Serial No
                            <input
                                placeholder="Serial"
                                name="sn"
                                onChange={this.handleChange}
                                value={this.state.sn}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Title
                            <input
                                placeholder="Todo Title"
                                name="title"
                                onChange={this.handleChange}
                                value={this.state.title}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description
                            <input
                                placeholder="Todo Description"
                                name="description"
                                onChange={this.handleChange}
                                value={this.state.description}
                            />
                        </label>
                    </div>

                    <input type="submit" value="Submit Todo" />
                </form>
            )
        }






        let myTodos = this.state.todos.map((todo, index) => (
            <NewTodoForm
                key={todo.sn}
                title={todo.title}
                descr={todo.description}
                complete={todo.completed}
                deleteTodo={this.handleDelete.bind(this, index)}
                completedTodo={this.handleCompleted.bind(this, todo.sn)}
                editTodo={this.handleEdit.bind(this, todo.sn, todo.title, todo.description)}
            />
        ));
        return (
            <div>
                <h2>Part 2</h2>
                <h3>New Todo Form Task</h3>
                <div>
                    {form}
                </div>
                {editButton}
                <div>
                    <table className={classes.NewTodoFormList}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Complete</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myTodos}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
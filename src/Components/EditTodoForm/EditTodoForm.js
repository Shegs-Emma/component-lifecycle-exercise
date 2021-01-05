import React, { Component } from 'react';


class EditTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: {
                snEdit: this.props.sn, titleEdit: "", descriptionEdit: ""
            },
            titleEdit: this.props.title,
            descriptionEdit: this.props.description,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const editedState = {...this.state.todo};
        editedState.titleEdit = this.state.titleEdit;
        editedState.descriptionEdit = this.state.descriptionEdit;

        this.setState((prevState, props) => {
            return {todo: prevState.todo = editedState}
        }, () => {
            this.handleClick();
        });

        this.setState({ titleEdit: "" });
        this.setState({ descriptionEdit: "" });
    }

    handleClick () {
        this.props.click(this.state.todo);
    }


    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <h3>Edit Todo</h3>
                    <div>
                        <label>
                            Title
                            <input
                                placeholder="Todo Title"
                                name="titleEdit"
                                onChange={this.handleChange}
                                value={this.state.titleEdit}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description
                            <input
                                placeholder="Todo Description"
                                name="descriptionEdit"
                                onChange={this.handleChange}
                                value={this.state.descriptionEdit}
                            />
                        </label>
                    </div>

                    <button type="submit" onClick={this.handleClick}>Update Todo</button>
                </form>
            </React.Fragment>
        )
    }
}

export default EditTodoForm;
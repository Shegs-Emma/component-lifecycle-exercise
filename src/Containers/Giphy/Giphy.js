import React, { Component } from 'react';
import axios from 'axios';
import classes from './Giphy.module.css';

export default class Giphy extends Component {
    constructor (props) {
        super (props);
        this.state = {
            gifs: [],
            searchItem: "",
            gifname: "",
            gifOfTheDayUrl: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
    }

    componentDidMount(){
        axios.get('http://api.giphy.com/v1/gifs/random?api_key=D1JE3Z7lbCNeZCLECZsAZZ0aw591CcwH', {
                headers: {
                    Accept: "application/json"
                }
        }).then(response => {
            // Pick one random gif from response
            let gifOfDay = response.data.data.images.original.url;

            this.setState({gifOfTheDayUrl: gifOfDay})
            
        }).catch(error => {
            console.log(error);
        })
    }

    handleChange (e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit (e) {
        e.preventDefault();
        this.setState((prevState, props) => {
            return {searchItem: prevState.searchItem = this.state.gifname}
        }, () => {
            axios.get(`http://api.giphy.com/v1/gifs/search?q=${this.state.searchItem}&api_key=D1JE3Z7lbCNeZCLECZsAZZ0aw591CcwH`, {
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                // Generate a random number
                let randomGif = Math.floor(Math.random() * response.data.data.length);
                // Pick one random gif from response
                let selectedGif = response.data.data[randomGif];
                // Create a gif
                const newGif = [...this.state.gifs];
                newGif.push({
                    id: selectedGif.id,
                    url: selectedGif.images.original.url
                })
                this.setState({gifs: newGif});
            }).catch(error => {
                console.log(error);
            })
        })
    }

    removeHandler () {
        this.setState({ gifs: []});
    }

    render () {
        let data = "Nothing yet";
        
        if(this.state.gifs.length > 0){
            data = this.state.gifs.map(gif => (
                <div key={gif.id}>
                    <img src={gif.url} alt="gif" width="100px" height="100px" />
                </div>
            ))
        }
        return (
            <React.Fragment>
                <div>
                    <h1>Giphy Party</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Enter a Search Term" name="gifname" onChange={this.handleChange} />
                        <input type="submit" value="Search Giphy!" />
                        
                    </form>
                    <button onClick={this.removeHandler}>Remove Gifs</button>
                </div>
                <div>
                    <h4>Gif of the Day</h4>
                    <img src={this.state.gifOfTheDayUrl} alt="gifOfDay" height="200px" width="200px" />
                </div>
                <div className={classes.Display}>
                    {data}
                </div>
            </React.Fragment>
        )
    }
}
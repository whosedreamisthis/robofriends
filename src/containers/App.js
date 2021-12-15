import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css'
import Scroll from '../components/Scroll.js'
import ErrorBoundary from '../components/ErrorBoundary'
   // <SearchBox />

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.json();
        })
        .then(users => {
                this.setState({robots:users})
        });
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value.toLowerCase()})


        //console.log(filteredRobots);

    }
    render () {
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robots=>{
            return robots.name.toLowerCase().includes(searchfield)
        })
        return !robots.length ?
            <h1>Loading...</h1> :
        
        (<div className ='tc'>
                    <h1 className='f1' >RoboFriends</h1>
                    <SearchBox searchfield={searchfield} searchchange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>);
        
    }
}

export default App;
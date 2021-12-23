import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css'
import Scroll from '../components/Scroll.js'
import ErrorBoundary from '../components/ErrorBoundary'
   // <SearchBox />

function App () {
    const [robots,setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');


  
    useEffect(()=> {
      fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.json();
        })
        .then(users => {
              setRobots(users)
        });
    }, [])
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);


        //console.log(filteredRobots);

    }
        const filteredRobots = robots.filter(robots=>{
            return robots.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        console.log(robots, searchfield);
        return !robots.length ?
            <h1>Loading...</h1> :
        
        (<div className ='tc'>
                    <h1 className='f1' >RoboFriends</h1>
                    <SearchBox searchfield={searchfield} searchchange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>);
        
}


export default App;
import React, { Component } from 'react';//Calling component from React to access render
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component { //Extend component here
  constructor() { //Call constructor so you can use this
    super();
    this.state = { //Similar to state in flutter, set varaibles,then setState
      monsters: [],//Here we delcare our monster states
      searchField: ''
    };
  }

  componentDidMount() { //Essentially useEffect or initState
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  //Using arrow functions helps to bind automatically to the contextv
  handleChange = (e) => {
   this.setState({ searchField: e.target.value }, () => console.log(this.state));
  }

  render() { //render method from Component
    const { monsters, searchField } = this.state;
    const fileteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase()))

    return (//Return JSX
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
        placeholder={'Search monsters'} 
        handleChange={this.handleChange}/>
        <CardList monsters={fileteredMonsters} />
      </div>
    );
  }
}

export default App;

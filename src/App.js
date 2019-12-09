import React, { Component } from "react";
import "./App.css";
import Radium from 'radium';
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { id: "1", name: "Jonathan", age: 40 },
      { id: "2", name: "Musila", age: 24 },
      { id: "3", name: "Schola", age: 20 }
    ],
    showPersons: false
  };

  handleSwitchName = (e, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = e.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  };

  handleDeletePerson = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersons = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };
  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.handleDeletePerson(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={e => this.handleSwitchName(e, person.id)}
              />
            );
          })}
        </div>
      );

      style.backgroundColor = "red";
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push("red");
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold");
    }

    return (
      <div className="App">
        <h1>Hi I am React App</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <button style={style} onClick={this.togglePersons}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default Radium(App);

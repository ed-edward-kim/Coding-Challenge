import './App.css';
import React, {Component} from 'react';
// import ReactDOM from 'react-dom'
// import logo from './logo.svg';

//package.json has proxy to port 5000 on local host. Proxy API req from clientside to API on server-side(Express server port 5000)

class Textbox extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchQuery: "", //creating state called searchQuery. Need for Event Handling for the input
      returl: ""
    }
  }

  handleInputChanged(event){ //Event handling for checking if input has changed
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleButtonClicked() { //Event handling for button clicked
    var searchQuery = this.state.searchQuery;
    
    // var apiURL = "http://localhost:5000/image_arr/" + searchQuery;

    var apiURL = "http://localhost:5000/image_arr/";
    
    var array_urls = JSON.stringify(searchQuery.split(','))
    // var formdata = JSON.stringify(chars)

    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: array_urls
      // body: JSON.stringify({title: 'test'}) //JSON.stringify(data). JSON.stringify(data) can be used to serialize a data structure into a JSON string. 
    };

    fetch(apiURL, reqOptions)
      .then(async response => {  //function will return a promise in response
        const data = await response.json(); //receives json from post... maybe have to change out of json?
        if(!response.ok){ //checking for error response
          const error = (data && data.message) || response.status; //get error msg from body or default to response status
          return Promise.reject(error);
        } 
        
        console.log("data val", data.express) //gets express: from server

      })
      .catch(error =>{
        console.error("ERROR!", error);
      });
  }

  render() {
    return (
      <div>
        <input
            type="text"
            value={this.state.searchQuery} //setting value of input to searchQuery state. Every time the value in state is updated, it will make this the value of the input
            onChange={this.handleInputChanged.bind(this)} //bind(this) for passing 'this' and keeping its value as instance of component within handleInputChanged func. Also allows us to call setState which updates state value of searchQuery to event.target.value (textbox)
        />

        <button onClick={this.handleButtonClicked.bind(this)}>
          Submit
        </button>

        <p>
          {this.state.returl}
        </p>
      </div>




    );
  }
  
}

export default Textbox;

// ReactDOM.render(<Textbox />, document.getElementById('root'));
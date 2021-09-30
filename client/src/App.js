import './App.css';
import React, {Component} from 'react';

//package.json has proxy to port 5000 on local host. Proxy API req from clientside to API on server-side(Express server port 5000)

class Textbox extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchQuery: "", //creating state called searchQuery. Need for Event Handling for the input
      nameQuery: "", //handles name of file
      returl: ""
    }
  }

  handleInputChanged(event){ //Event handling for checking if input has changed
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleInputChangedFilename(event){ //Added another event handling for dealing with the other textbox for filename.
    this.setState({
      nameQuery: event.target.value
    });
      
  }

  handleButtonClicked() { //Event handling for button clicked
    var filename = ""
    var searchQuery = this.state.searchQuery;
    var nameQuery = this.state.nameQuery;
    if(nameQuery === ""){ //if optional name not given, we will default to Output.zip
      filename = "Output"
    } else {
      filename = nameQuery.toString(); //toString in case a non-string datatype is given for a title.
    }
    var apiURL = "http://localhost:5000/image_arr/";

    var array_urls = searchQuery.split(',');
    console.log(array_urls);

    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({arr: array_urls, name: filename})
    };

    fetch(apiURL, reqOptions)
      .then(async response => {  //function will return a promise in response
        const data = await response.json(); //receives json from post. Will hold our response from imagearr endpoint
        if(!response.ok){ //checking for error response
          const error = (data && data.message) || response.status; //get error msg from body or default to response status
          return Promise.reject(error);
        } else{
          this.setState({ //if we get no errors, we can continue to set the returl state to the resulting link.
            returl: data.link_to_zip
          });
        }
      })
      .catch(error =>{
        console.error("ERROR!", error);
      });
  }

  render() {
    return (
      <div align="center">
        <div>
          <h1>URLs with a comma in between each url (no spaces): </h1>
          <h6>For example, you can copy and paste this into the field for 2 pictures of cats: https://i.imgur.com/zt7smR4_d.webp,https://i.imgur.com/AD3MbBi_d.webp</h6>
          <textarea
              type="text"
              value={this.state.searchQuery} //setting value of input to searchQuery state. Every time the value in state is updated, it will make this the value of the input
              onChange={this.handleInputChanged.bind(this)} //bind(this) for passing 'this' and keeping its value as instance of component within handleInputChanged func. Also allows us to call setState which updates state value of searchQuery to event.target.value (textbox)
          />
        </div>

        <div>
          <h1>Filename (optional): </h1>
          <textarea
              type = "text"
              value={this.state.nameQuery}
              onChange={this.handleInputChangedFilename.bind(this)}
          />
        </div>

        {/* <div>
          <h3>Filename (optional): </h3>
          <input
              type = "text"
              value={this.state.nameQuery}
              onChange={this.handleInputChangedFilename.bind(this)}
          />
        </div> */}
        <br></br>
        <button onClick={this.handleButtonClicked.bind(this)}>
          Submit
        </button>



        {/* <p>
          {this.state.returl}
        </p> */}

        {/* Link to zip download */}
        <div>
          <a href={this.state.returl}> 
          {this.state.returl}
          </a>
        </div>

      </div>




    );
  }
  
}

export default Textbox;

// ReactDOM.render(<Textbox />, document.getElementById('root'));
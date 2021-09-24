import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom'

// import ImageGallery from 'react-image-gallery';

//package.json has proxy to port 5000 on local host. Proxy API req from clientside to API on server-side(Express server port 5000)
// class App extends Component {
//   state = {
//       data: null
//     };
  
//     componentDidMount() {
//       this.callBackendAPI()
//         .then(res => this.setState({ data: res.express }))
//         .catch(err => console.log(err));
//     }
//       // fetching the GET route from the Express server which matches the GET route from server.js
//     callBackendAPI = async () => {
//       const response = await fetch('/express_backend');
//       const body = await response.json();
  
//       if (response.status !== 200) {
//         throw Error(body.message) 
//       }
//       return body;
//     };
  
//     render() {
//       return (
//         <div className="App">
//           <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//             <h1 className="App-title">Welcome to React!</h1>
//           </header>
//           <p className="App-intro">{this.state.data}</p>
//         </div>
//       );
//     }
//   }
  
  // export default App;


// const images = [
//   {
//     original: 'https://picsum.photos/id/1018/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1018/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1015/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1015/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1019/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1019/250/150/',
//   },
// ];

// class MyGallery extends Component {
//   render () {
//     return <ImageGallery items={images} />;
//   }
// }

// export default MyGallery;


class Textbox extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchQuery: "" //creating state called searchQuery. Need for Event Handling for the input
    }
  }

  handleInputChanged(event){ //Event handling for checking if input has changed
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleButtonClicked() { //Event handling for button clicked
    var searchQuery = this.state.searchQuery;

    var apiURL = "http://localhost:5000/image_arr/" + searchQuery;

    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'test'})
    };

    fetch(apiURL, reqOptions)
      .then(async response => {
        const data = await response.json();

        if(!response.ok){ //checking for error response
          const error = (data && data.message) || response.status; //get error msg from body or default to response status
          return Promise.reject(error);
        }
      })
      .catch(error =>{
        console.error("ERROR!", error);
      });

    // fetch(apiURL, reqOptions).then(response => response.json()).then(data => this.setState({ postId: data.id }));

    // window.location.href = "http://localhost:5000/image_arr/" + searchQuery;
  }

  render() {
    return (
      <div>
        <input
            type="text"
            value={this.state.searchQuery} //setting value of input to searchQuery state. Every time the value in state is updated, it will make this the value of the input
            onChange={this.handleInputChanged.bind(this)} //bind(this) for passing 'this' and keeping its value as instance of component within handleInputChanged func. Also allows us to call setState which updates state value of searchQuery to event.target.value
          />

        <button onClick={this.handleButtonClicked.bind(this)}>
          Submit
        </button>
      </div>  
    );
  }
  
}

export default Textbox;

// ReactDOM.render(<Textbox />, document.getElementById('root'));
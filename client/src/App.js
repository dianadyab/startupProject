import React, { Component } from 'react';
import './App.css';
var request = require('request');
var js2xmlparser = require("js2xmlparser");//to convert from json to xml


class App extends Component {
  state = {

    response: '',//response the get request come from the /api/hello route
    drug:'',
    disease:'',
    type:'',
    responseToPost: '',// response to submit
  };

  /*callApi method to interact with  GET Express API route
  we call this method in componentDidMount and finally set the state to the API response
  */
 componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  /*calls our POST Express API route then saves the response to
   state and displays a message to the user: I received your POST request.
   This is what you sent me: [message from input].*/


  callApi = async () => {
    const response = await fetch('/api/');

    const body = await response.json();


    if (response.status !== 200) throw Error(body.message);

    return body;

  };

 handleSubmit =async  e =>{

     e.preventDefault();
     const request = {
     drug: this.state.drug,
     disease: this.state.disease,
     type: this.state.type
     };

     const xmlRequest = js2xmlparser.parse("request", request);

     const response = await fetch('/api/submit', {
       method: 'POST',

       headers: {
         'Content-Type': 'text/xml',
         'Accept-Type': 'text/xml',
         'Accept':'text/xml'

       },

       body:xmlRequest

     });
     //get the response
     const body = await response.text();

     this.setState({ responseToPost: body });


   }

  render() {
    return (
      <div className="App">
      <pre>{this.state.response}</pre>


        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <div class="input">
              <label>drug code: </label>
              <input
                type="text"
                value={this.state.drug}
                onChange={e => this.setState({ drug: e.target.value })}
              />
          </div>

          <div class="input">
              <label>disease code:</label>
              <input
                type="text"
                value={this.state.disease}
                onChange={e => this.setState({ disease: e.target.value })}
              />
          </div>

          <div class="input">
            <label>type:</label>

            <select value={this.state.type} onChange={e => this.setState({ type: e.target.value })}>
               <option >select value</option>
               <option value="1">1</option>
               <option value="2">2</option>

           </select>


          </div>

          <div class="input">
            <button type="submit">Submit</button>

          </div>
        </form>
        <pre>{this.state.responseToPost}</pre>

      </div>
    );
  }
}

export default App;

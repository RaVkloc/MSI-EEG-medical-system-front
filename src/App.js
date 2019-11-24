import React from 'react';
import logo from './assets/img/brainlogo.png';
import Loader from 'react-loader-spinner'
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class App extends React.Component {
  state = {
    step: 0,
    uploadProgress: 0
  }

  //step 0 wyświetlony drop picker do pliku
  //step 1 loader uploadu
  //step 2 loader przetwarzania pliku na serwerze
  //step 3 wyświetlenie wyników

  startFileUpload = () => {
    this.setState({step: 1, uploadProgress: 0})
  }

  startFileAnalysis = () => {
    this.setState({step: 2})
  }

  render = () => {
    return (
      <div className="App">
        <div className="bg-image"></div>
        
        {this.state.step <= 2 &&
          <div className="bg-content">
            <img className='logo' src={logo}/>
            <h2>EEG Medical System</h2>
            <div className="drop-content">   
              {this.state.step === 0 &&
                <>
                  <h1>Drop here</h1>
                  <p>Your EEG file</p>
                </>
              }
              {this.state.step === 1 &&
                <>
                  <Loader type="Rings" color="white" height={80} width={80}/>    
                  <h3>File upload {this.state.uploadProgress}%</h3>
                </>
              }
              {this.state.step === 2 &&
                <>
                  <Loader type="Circles" color="white" height={60} width={60}/>    
                  <h3>File processing in progress...</h3>
                </>
              }
            </div>
          </div>
        }

        {this.state.step > 2 &&
          <div className="bg-content-2">
            <img className='logo' src={logo}/>
            <h2>EEG Medical System</h2>
          </div>
        }
      </div>
    );
  }
}


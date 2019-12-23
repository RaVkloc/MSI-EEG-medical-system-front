import React from 'react';
import logo from './assets/img/brainlogo.png';
import Loader from 'react-loader-spinner'
import './App.css';
import './GlobalStyle.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import FilePicker from './FilePicker';
import Result from './Result';
import Login from './Login';
import Registration from './Registration'

export default class App extends React.Component {
  state = {
    step: 4,
    uploadProgress: 0
  }

  //step 0 wyświetlony drop picker do pliku
  //step 1 loader uploadu
  //step 2 loader przetwarzania pliku na serwerze
  //step 3 wyświetlenie wyników
  //step 4 login
  //step 5 rejestracja

  filerUploadPicker = () => {
    this.setState({step: 0})
  }

  startFileUpload = () => {
    this.setState({step: 1, uploadProgress: 0})
  }

  uploadProgress = (progress) => {
    let uploadProgress = Math.round(progress)
    this.setState({uploadProgress:uploadProgress})
  }

  startFileAnalysis = () => {
    this.setState({step: 2})
  }

  results = () => {
    this.setState({step: 3})
  }

  login = () => {
    this.setState({step: 0});
  }

  register = () => {
    this.setState({step: 5})
  }

  logout = () => {
    localStorage.setItem('token', "");
    localStorage.setItem('refresh', "");
    this.setState({step: 4})
  }

  render = () => {
    return (
      <div className="App">
        <div className="bg-image"></div>
        {this.state.step !== 4 && this.state.step !== 5 &&
          <div className={'userPanel'}>
            <div onClick={this.results} className={'logout-button'}>
              <p className={'logout-text'}>Results</p>
            </div>
            <div onClick={this.filerUploadPicker} className={'logout-button'}>
              <p className={'logout-text'}>Add</p>
            </div>
            <div onClick={this.logout} className={'logout-button left-margin'}>
              <p className={'logout-text'}>Log out</p>
            </div>
          </div>
        }
        {this.state.step <= 2 &&
          <div className="bg-content">
            <img className='logo' src={logo}/>
            
            <div className="drop-content">
              {this.state.step === 0 &&
                <>
                  <FilePicker
                    onFileUploadStart={this.startFileUpload}
                    onUploadProgress={this.uploadProgress}
                    onUploadEnd={this.startFileAnalysis} />
                </>
              }
              {this.state.step === 1 &&
                <div className="default-padding">
                  <Loader type="Rings" color="white" height={80} width={80}/>
                  <h3>File upload {this.state.uploadProgress}%</h3>
                </div>
              }
              {this.state.step === 2 &&
                <div className="default-padding">
                  <Loader type="Circles" color="white" height={60} width={60}/>
                  <h3>File processing in progress...</h3>
                </div>
              }
            </div>
          </div>
        }

        {this.state.step === 3 &&
          <Result />
        }

        {this.state.step === 4 &&
          <Login onPressRegistration={this.register} onPress={this.login} />
        }

        {this.state.step === 5 &&
          <Registration onPress={this.logout} />
        }
      </div>
    );
  }
}


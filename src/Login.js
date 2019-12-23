import React from 'react';
import logo from './assets/img/brainlogo.png';
import './Login.css';
import './GlobalStyle.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class Login extends React.Component {
  state = {
    login: "",
    password: "",
    error: false
  }

  componentDidMount = () => {
    if(localStorage.getItem("token"))
      this.props.onPress()
  }

  login = (event) => {
    event.preventDefault();
    let data = {
      username: this.state.login,
      password: this.state.password
    }
    fetch("http://127.0.0.1:8020/api/token/", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res)
    .then(async res => {
      let response = await res.json();
      console.log(res.status);
      if(res.status !== 401 && res.status !== 400) {
        localStorage.setItem("refresh", response.refresh);
        localStorage.setItem("token", response.access);
        this.setState({login: "", password: "", error: false});
        this.props.onPress()
      }
      else {
        this.setState({password: "", error: true});
      }
    })
  }

  changeLogin = (login) => {
    this.setState({login: login.target.value});
    console.log("login", login.target.value);
  }

  changePassword = (password) => {
    this.setState({password: password.target.value});
    console.log("pass", password.target.value);
  }

  register = () => {
    this.props.onPressRegistration()
  }

  render = () => {
    return(
      <div className="bg-content">
        <img className='logo' src={logo}/>
        <h2>EEG Medical System</h2>
        <form onSubmit={this.login} className={'login_form'}>
          <label className={'login_label'}>
            {this.state.error && <p className="error-label">Invalid cridentials!</p>}
            <div className={'input-container'}>
              <p>Login:</p><input className={'input' + (this.state.error ? ' invalid' : '')} type="text" value={this.state.login} onChange={this.changeLogin} />
            </div>
            <div className={'input-container'}>
              <p>Password:</p><input className={'input' + (this.state.error ? ' invalid' : '')} type="password" value={this.state.password} onChange={this.changePassword} />
            </div>
          </label>
          <div onClick={this.login} className={'login-button'}>
            <p className="disable-select">ZALOGUJ</p>
          </div>
          {/* <input type="submit" value="Wyślij" /> */}
        </form>
        <p className={'register '}>Nie masz jeszcze konta? <a className={'register-active'} onClick={this.register}> Zarejestruj się!</a></p>
      </div>
    )
  }
}


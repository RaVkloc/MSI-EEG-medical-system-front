import React from 'react';
import logo from './assets/img/brainlogo.png';
import './Login.css';
import './GlobalStyle.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class Login extends React.Component {
  state = {
    login: "",
    password: ""
  }

  register = (event) => {
    event.preventDefault();
    let data = {
      username: this.state.login,
      password: this.state.password
    }
    fetch("http://127.0.0.1:8020/api/users/", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.status !== 400) {
        this.props.onPress();
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


  render = () => {
    return(
      <div className="bg-content">
        <img className='logo' src={logo}/>
        <form onSubmit={this.login} className={'login_form'}>
          <label className={'login_label'}>
            <div className={'input-container'}>
              <p>login:</p><input className={'input'} type="text" value={this.state.login} onChange={this.changeLogin} />
            </div>
            <div className={'input-container'}>
              <p>hasło:</p><input className={'input'} type="password" value={this.state.password} onChange={this.changePassword} />
            </div>
          </label>
          <div onClick={this.register} className={'login-button'}>
            <p>ZAREJESTRUJ</p>
          </div>
          {/* <input type="submit" value="Wyślij" /> */}
        </form>
      </div>
    )
  }
}


import React from 'react';
import logo from './assets/img/brainlogo.png';
import './Login.css';
import './GlobalStyle.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class Login extends React.Component {
  state = {
    login: "",
    password: "",
    confirmPassword: "",
    error: "",
    errorPasswords: false,
    errorLogin: false,
    empty: false
  }

  register = (event) => {
    event.preventDefault();
    let data = {
      username: this.state.login,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }

    if(data.username === "" || data.password === "" || data.confirmPassword === "") {
      this.setState({empty: true});
      return;
    }

    if(data.password !== data.confirmPassword) {
      this.setState({errorPasswords: true, error: 'Passwords are not the same!'})
    }
    else {
      this.setState({error: null})
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
        else {
          this.setState({errorLogin: true, error: 'Login is occupied!'})
        }
      })
    }
  
  }

  changeLogin = (login) => {
    this.setState({login: login.target.value});
    console.log("login", login.target.value);
  }

  changePassword = (password) => {
    this.setState({password: password.target.value});
    console.log("pass", password.target.value);
  }

  changeConfirmPassword = (password) => {
    this.setState({confirmPassword: password.target.value});
    console.log("pass", password.target.value);
  }


  render = () => {
    return(
      <div className="bg-content">
        <img className='logo' src={logo}/>
        <h2>Registration</h2>
        <form onSubmit={this.login} className={'login_form'}>
          {this.state.error && <p className="error-label">{this.state.error}</p>}
          <label className={'login_label'}>
            <div className={'input-container-2'}>
              <p>Login:</p><input className={'input' + ((this.state.empty && this.state.login === '') || this.state.errorLogin ? ' invalid' : '')} type="text" value={this.state.login} onChange={this.changeLogin} />
            </div>
            <div className={'input-container-2'}>
              <p>Password:</p><input className={'input' + ((this.state.empty && this.state.password === '') || this.state.errorPasswords ? ' invalid' : '')} type="password" value={this.state.password} onChange={this.changePassword} />
            </div>

            <div className={'input-container-2'}>
              <p>Confirm password:</p><input className={'input' + ((this.state.empty && this.state.confirmPassword === '') || this.state.errorPasswords ? ' invalid' : '')} type="password" value={this.state.confirmPassword} onChange={this.changeConfirmPassword} />
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


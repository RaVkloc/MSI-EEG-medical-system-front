import React from 'react';
import logo from './assets/img/brainlogo.png';
import './Result.css';
import './GlobalStyle.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import BaseURL from './utils/url'
import Loader from 'react-loader-spinner'
export default class Result extends React.Component {

  constructor(props){
    super(props)
    this.timeout = null;
  }

  state = {
    step: 'loading', //loading - ładowanie, empty - brak wyników, progressing - trwa przetwarzanie, result - pokazuje wyniki
    data: [],
  }

  componentDidMount = () => {
    this.loadingResultShow();
    // console.log(localStorage.getItem("token"))
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
    this.timeout = null
  }

  loadingResultShow = () => {
    this.timeout = setTimeout(() => {
      this.apiConnection();
    }, 1000);
  }

  apiConnection = () => {
    let url = BaseURL + 'results/'
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(async res => {
      // console.log(res)
      let step = 'loading';
      let data = await res.json();
      if(res.status === 401) { //refresh
        this.refreshToken();
      } else if(res.status === 404) {
        step = 'empty';
      } else if(res.status === 202) {
        step = 'progressing';
        this.loadingResultShow();
      } else if(res.status === 201) {
        step = 'result'
      }
      if(res.status !== 401) {
        await this.setState({data});
        setTimeout(() => this.setState({step}));
      }
    })
    .catch(res => console.log("err:", res))
  }

  refreshToken = () => {
    let data = {
      refresh: localStorage.getItem("refresh")
    };
    let url = BaseURL + 'refresh/'
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      console.log("REFRESHING")
      localStorage.setItem("token", res.access);
    })
    .then(() => {
      this.apiConnection();
    })
    .catch(res => console.log("err:", res.respones))
  }

  renderLeftPart = (description, image) => {
    console.log(image)
    return(
      <div className="container-with-left-image">
        <img className="image-container" src={image} />
        <div className="descriptio-left-container"><p>{description}</p></div>
      </div>
    )
  }

  renderRightPart = (description, image) => {
    return(
      <div className="container-with-right-image ">
        <div className="descriptio-right-container"><p>{description}</p></div>
        <img className="image-container" src={image} />
      </div>
    )
  }

  renderResult = () => (
    <div className="bg-content-2">
      <h1 className={'result-title'}>Analized data</h1>
      <div>
        {this.state.data.map((element, index) => {
          if(index % 2 === 0)
            return(this.renderLeftPart(element.description, element.image))
          else
            return(this.renderLeftPart(element.description, element.image))
        })}
      </div>
    </div>
  )

  renderLoading = () => (
    <div className="bg-content">
      <img className='logo' src={logo}/>
      <p className="processingText">Loading...</p>
      <Loader type="ThreeDots" color="white" height={60} width={60}/>
    </div>
  )

  renderEmpty = () => (
    <div className="bg-content">
      <img className='logo' src={logo}/>
      <p className="processingText">No data</p>
    </div>
  )

  renderProgressing = () => (
    <div className="bg-content">
      <img className='logo' src={logo}/>
      <p className="processingText">Processing data...</p>
      <Loader type="ThreeDots" color="white" height={60} width={60}/>
    </div>
  )

  toRender = {
    'loading': this.renderLoading,
    'result': this.renderResult,
    'empty': this.renderEmpty,
    'progressing': this.renderProgressing,
  }

  render = () => {
    return(
      this.toRender[this.state.step]()
    )
  }
}


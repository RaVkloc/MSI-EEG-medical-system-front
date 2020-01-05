import React from 'react';
import logo from './assets/img/brainlogo.png';
import './Result.css';
import './GlobalStyle.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class Result extends React.Component {

  constructor(props){
    super(props)
    this.timeout = null;
  }

  state = {
    step: 'loading', //loading - ładowanie, empty - brak wyników, progressing - trwa przetwarzanie, result - pokazuje wyniki
    data: [
      {
        image: "https://atlaseeg.pl/images/large/prawidlowe_EEG_rytm_alfa.jpg",
        description: "dfsa afadfs  adfs as fas d afdghadsfgaasd dsad asdasdas sadasdas dasdas dasdas dsf  adsg gsad gdsa gsdaagsdgasdg sad "
      },
      {
        image: "https://www.sciencenewsforstudents.org/sites/default/files/2016/09/main/articles/860-eeg-header-35s_SWK_REM.png",
        description: "dfsa afadfs  adfs as fas d afdghadsfgadsf  adsg gsad gdsa gsdaagsdgasdg sad "
      },
      {
        image: "https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/field_blog_entry_images/2017-05/eeg_750.jpg?itok=iZuY01W6",
        description: "dfsa afadfs  adfs as fas d afdghadsfgadsf  adsg gsad gdsa gsdaagsdgasdg sad "
      },
      {
        image: "https://1bxqip36sc4m3f4wbi2m3axr-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/brain-mapping.jpg",
        description: "dfsa afadfs  adfs as fas d afdghadsfgadsf  adsg gsad gdsa gsdaagsdgasdg sad "
      },
    ],
  }

  componentDidMount = () => {
    this.loadingResultShow();
    console.log(localStorage.getItem("token"))
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
    fetch('http://127.0.0.1:8020/api/results/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(async res => {
      console.log(res)
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

    fetch('http://127.0.0.1:8020/api/refresh/', {
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
      {this.state.data.map((element, index) => {
        if(index % 2 === 0)
          return(this.renderLeftPart(element.description, element.image))
        else
          return(this.renderRightPart(element.description, element.image))
      })}
    </div>
  )

  renderLoading = () => (
    <div className="bg-content">
      <img className='logo' src={logo}/>
      <p>Ładowanie...</p>
    </div>
  )

  renderEmpty = () => (
    <div className="bg-content">
      <img className='logo' src={logo}/>
      <p>Brak prowadzonych badań</p>
    </div>
  )

  renderProgressing = () => (
    <div className="bg-content">
      <img className='logo' src={logo}/>
      <p>Trwa przetwarzanie danych...</p>
    </div>
  )

  toRender = {
    'loading': this.renderLoading(),
    'result': this.renderResult(),
    'empty': this.renderEmpty(),
    'progressing': this.renderProgressing(),
  }

  render = () => {
    return(
      this.toRender[this.state.step]
    )
  }
}


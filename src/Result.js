import React from 'react';
import logo from './assets/img/brainlogo.png';
import './Result.css';
import './GlobalStyle.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class Result extends React.Component {
  state = {
    loadingResultShow: true,
    data: [
      {
        path: "https://atlaseeg.pl/images/large/prawidlowe_EEG_rytm_alfa.jpg",
        description: "dfsa afadfs  adfs as fas d afdghadsfgaasd dsad asdasdas sadasdas dasdas dasdas dsf  adsg gsad gdsa gsdaagsdgasdg sad "
      },
      {
        path: "https://www.sciencenewsforstudents.org/sites/default/files/2016/09/main/articles/860-eeg-header-35s_SWK_REM.png",
        description: "dfsa afadfs  adfs as fas d afdghadsfgadsf  adsg gsad gdsa gsdaagsdgasdg sad "
      },
      {
        path: "https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/field_blog_entry_images/2017-05/eeg_750.jpg?itok=iZuY01W6",
        description: "dfsa afadfs  adfs as fas d afdghadsfgadsf  adsg gsad gdsa gsdaagsdgasdg sad "
      },
      {
        path: "https://1bxqip36sc4m3f4wbi2m3axr-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/brain-mapping.jpg",
        description: "dfsa afadfs  adfs as fas d afdghadsfgadsf  adsg gsad gdsa gsdaagsdgasdg sad "
      },
    ],
  }

  componentDidMount = () => {
    this.loadingResultShow();
  }

  loadingResultShow = () => {
    setTimeout(() => {
      this.setState({loadingResultShow: false});
    }, 1000);
  }

  renderLeftPart = (description, path) => {
    console.log(path)
    return(
      <div className="container-with-left-image">
        <img className="image-container" src={path} />
        <div className="descriptio-left-container"><p>{description}</p></div>
      </div>
    )
  }

  renderRightPart = (description, path) => {
    return(
      <div className="container-with-right-image ">
        <div className="descriptio-right-container"><p>{description}</p></div>
        <img className="image-container" src={path} />
      </div>
    )
  }

  render = () => {
    return(
      this.state.loadingResultShow ?
      <div className="bg-content">
        <img className='logo' src={logo}/>
      </div>
      :
      <div className="bg-content-2">
        {this.state.data.map((element, index) => {
          if(index % 2 === 0)
            return(this.renderLeftPart(element.description, element.path))
          else
            return(this.renderRightPart(element.description, element.path))
        })}
      </div>
    )
  }
}


import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './FilePicker.css'
// import './GlobalStyle.css'
import Request from 'superagent';
import BaseURL from './utils/url';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function FilePicker(props) {

  const onDrop = useCallback(files => {
    props.onFileUploadStart()
    let csrftoken = getCookie('csrftoken');
    let url = BaseURL + 'upload/'
    Request
      .post(url)
      .set('X-CSRFToken', csrftoken)
      .set('Authorization', 'Bearer ' + localStorage.getItem("token"))
      .field("file", files[0])
      .on('progress',progress => {
        /**
         * @param progress.percent displays the status of the file sent in percentage
        */
        props.onUploadProgress(progress.percent)
        console.log('Progress', progress.percent);
        // if(progress.percent === 100)
        //   props.onUploadEnd() //only for tests
      })
      .then(response => {
        console.log("response",response)
        props.onUploadEnd()
      })
      .catch(err => {console.warn(err.response)})
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div  {...getRootProps()}  className="default-padding">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p>
        :
          <>
            <h1>Drop here</h1>
            <p>Your EEG file</p>
          </>
      }
    </div>
  )
}

export default FilePicker
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
// import './FilePicker.css'
import './GlobalStyle.css'
import Request from 'superagent';

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
    // let formDataa = new FormData();
    // formDataa.append('file', files[0])
    Request
      .post('http://127.0.0.1:8000/api/upload/')
      // .set('Content-Type', 'multipart/form-data')
      .set('X-CSRFToken', csrftoken)
      .set('Authorization', 'Bearer ' + localStorage.getItem("token"))
      // .send(formDataa)
      .field("file", files[0])
      .on('progress',progress => {
        /**
         * @param progress.percent displays the status of the file sent in percentage
        */
      //  console.log(progress)
        props.onUploadProgress(progress.percent)
        console.log('Progress', progress.percent);
      })
      .then(response => console.log("response",response))
      .catch(err => console.warn(err.response))
      // .end((res, err) => {
      //   // console.log(res)
      //     console.log("ełoł",err);
      //     console.log("rispons",res);
      // })
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
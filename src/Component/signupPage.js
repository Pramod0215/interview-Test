 // eslint-disable-next-lineimport React, { Component } from 'react';
import { Link} from "react-router-dom";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import moment from "moment";
import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const Photo = () => {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setTimeout(()=>{
      console.log(newFileList)
    },3000)
    
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="http://159.65.237.4:8080/admin/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

// class Photo extends Component {
//     state = {
//       src: null,
//       crop: {
//         unit: '%',
//         width: 30,
//         aspect: 16 / 9,
//       },
//     };
  
//     onSelectFile = e => {
//       if (e.target.files && e.target.files.length > 0) {
//         const reader = new FileReader();
//         reader.addEventListener('load', () =>
//           this.setState({ src: reader.result })
//         );
//         reader.readAsDataURL(e.target.files[0]);
//       }
//     };
  
//     // If you setState the crop in here you should return false.
//     onImageLoaded = image => {
//       this.imageRef = image;
//     };
  
//     onCropComplete = crop => {
//       this.makeClientCrop(crop);
//     };
  
//     onCropChange = (crop, percentCrop) => {
//       // You could also use percentCrop:
//       // this.setState({ crop: percentCrop });
//       this.setState({ crop });
//     };
  
//     async makeClientCrop(crop) {
//       if (this.imageRef && crop.width && crop.height) {
//         const croppedImageUrl = await this.getCroppedImg(
//           this.imageRef,
//           crop,
//           'newFile.jpeg'
//         );
//         this.setState({ croppedImageUrl });
//       }
//     }
  
//     getCroppedImg(image, crop, fileName) {
//       const canvas = document.createElement('canvas');
//       const scaleX = image.naturalWidth / image.width;
//       const scaleY = image.naturalHeight / image.height;
//       canvas.width = crop.width;
//       canvas.height = crop.height;
//       const ctx = canvas.getContext('2d');
  
//       ctx.drawImage(
//         image,
//         crop.x * scaleX,
//         crop.y * scaleY,
//         crop.width * scaleX,
//         crop.height * scaleY,
//         0,
//         0,
//         crop.width,
//         crop.height
//       );
  
//       return new Promise((resolve, reject) => {
//         canvas.toBlob(blob => {
//           if (!blob) {
//             //reject(new Error('Canvas is empty'));
//             console.error('Canvas is empty');
//             return;
//           }
//           blob.name = fileName;
//           window.URL.revokeObjectURL(this.fileUrl);
//           this.fileUrl = window.URL.createObjectURL(blob);
//           resolve(this.fileUrl);
//         }, 'image/jpeg');
//       });
//     }
  
//     render() {
//       const { crop, croppedImageUrl, src } = this.state;
  
//       return (
//         <div className="App">
//           <div>
//             <input type="file" accept="image/*" onChange={this.onSelectFile} />
//           </div>
//           {src && (
//             <ReactCrop
//               src={src}
//               crop={crop}
//               ruleOfThirds
//               onImageLoaded={this.onImageLoaded}
//               onComplete={this.onCropComplete}
//               onChange={this.onCropChange}
//             />
//           )}
//           {croppedImageUrl && (
//             <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
//           )}
//         </div>
//       );
//     }
//   }

 


class SignUp extends React.Component {
    constructor(props) {   
        super(props);
        this.state = {
            image: 'your-image-url or as base64',
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 4 / 3,
            date: new Date(),
            dob:''
        }
    }
  
  
    handleClick = () => {
        var CLIENT_ID=process.env.REACT_APP_CALENDER_ID
        var API_KEY=process.env.REACT_APP_CALENDER_API_KEY
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPES = "https://www.googleapis.com/auth/calendar.events";
        var gapi = window.gapi
      gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('bam!'))
  
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          
          var event = {
            'summary': 'Awesome Event!',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'Really great refreshments',
            'start': {
              'dateTime': '2020-06-28T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'dateTime': '2020-06-28T17:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              {'email': 'lpage@example.com'},
              {'email': 'sbrin@example.com'}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }
  
          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })
  
          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })
          
  
          /*
              Uncomment the following block to get events
          */
          /*
          // get events
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            console.log('EVENTS: ', events)
          })
          */
      
  
        })
      })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(e.target.password.value===e.target.confirmpassword.value){
            this.setState({
                dob:e.target.dob.value
            },()=>this.handleClick())
            const data = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                dob: e.target.dob.value,
                img: localStorage.getItem('croppedImageUrl'),
                password: e.target.password.value
            }
            console.log(data)
            localStorage.setItem('data', JSON.stringify(data))

        }
        else{
            alert('Password is not matched!')
        }
    }
    // componentDidMount(){
    //     this.getEvents();
    // }
    // getEvents(){
    //     let that = this;
    //     function start() {
    //       window.gapi.client.init({
    //         'apiKey': process.env.REACT_APP_CALENDER_API_KEY
    //       }).then(function() {
    //         return gapi.client.request({
    //           'path': `https://www.googleapis.com/calendar/v3/calendars/${ process.env.REACT_APP_CALENDAR_ID}/events`,
    //         })
    //       }).then( (response) => {
    //         let events = response.result.items
    //         that.setState({
    //           events
    //         }, ()=>{
    //           console.log(that.state.events);
    //         })
    //       }, function(reason) {
    //         console.log(reason);
    //       });
    //     }
    //     gapi.load('client', start)
    //   }
    render() {
        return (
            <React.Fragment>
               <div className ='nav'>
                   <Link to='/homepage'>Home</Link>
                   <Link to='/profile'>Profile</Link>
                   <Link to='/'>Sign Up</Link>
               </div> 
                <div className='card'>
                    <h3 className='padding-top-20'>Register</h3>
                    <div className='card-body'>
                        <form className='col col-md-6' onSubmit={this.onSubmit}>

                            <label className='label'>Name</label>
                            <input type='text' name='name' placeholder='Enter your name' title='Enter your name' required/>
                            <label className='label'>Email</label>
                            <input type='email' name='email' placeholder='Enter your email' title='Enter your email' required/>
                            <label className='label'>Phone</label>
                            <input type='number'min={10} maxLength={10} placeholder='Enter your phone number' name='phone' title='Enter your phone' required/>
                            <label className='label'>Date of birth</label>
                            <input type='date' name='dob'  max={moment(
                                new Date(),
                                "MM-DD-YYYY",
                                true
                              ).format("YYYY-MM-DD")}
                              title='Enter your Date of birth'
                              required
                               />
                            <label className='label'>Password</label>
                            <input type='password' name='password' min={6} title='Minimum length is 6 character'
                            placeholder='Enter  password' 
                            required/>
                            <label className='label'>Confirm Password</label>
                            <input className='input' type='password' name='confirmpassword' min={6} 
                            placeholder='Enter confirmed password'
                            title='Minimum length is 6 character' required/>
                            <input type='submit' value='Submit' className='submit-btn' />
                        </form>
                        <div className='img-container'>
                          <Photo/>

                        </div>
                    </div>
                </div>

            </React.Fragment>

        )
    }
}
export default SignUp;
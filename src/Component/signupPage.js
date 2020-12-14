// eslint-disable-next-lineimport
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import moment from "moment";
import { Form, Select, Input, Button, message } from 'antd'

const { Option } = Select;
class Photo extends Component {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 30,
      aspect: 16 / 9,
    },
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="App">
        <div>
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
        )}
      </div>
    );
  }
}




class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'your-image-url or as base64',
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 4 / 3,
      date: new Date(),
      name: '',
      dob: ''
    }
  }


  handleClick = () => {
    // var CLIENT_ID=process.env.REACT_APP_CALENDER_ID
    // var API_KEY=process.env.REACT_APP_CALENDER_API_KEY
    var CLIENT_ID = '536004552188-vcbt6gr3o64ohf11kg84v99hojiit35q.apps.googleusercontent.com'
    var API_KEY = 'AIzaSyBb2S1HYl1o5I9KoECEwRhPXHcl9a0rKlk'
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
            'Name': this.state.name,
            'Gender': this.state.gender,
            'Birthday': this.state.dob,

            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              { 'email': this.state.email }
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 }
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

          window.location.href = '/profile'
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


  handleFormSubmit = (data) => {
    if (data.password === data.confirmpassword) {
      localStorage.setItem('data', JSON.stringify(data))
      this.setState({
        dob: data.dob,
        name: data.name,
        email: data.email,
      }, () => this.handleClick())


      message.info('This is a successfull register');
    }
    else {
      message.danger('Something error')
    }
    console.log(data)
  }


  render() {
    return (
      <React.Fragment>
        <div className='nav'>
          <Link to='/homepage'>Home</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='/'>Sign Up</Link>
        </div>
        <div className='card'>
          <h3 className='padding-top-20'>Register</h3>
          <div className='card-body'>
            <Form layout="vertical" initialValues={{
              remember: true,
            }}
              onFinish={this.handleFormSubmit}>
              <Form.Item label='Name' name='name' rules={[{ required: true, mesage: 'Enter your name' }]}>
                <Input type='text' />
              </Form.Item>
              <Form.Item label='Email' name='email' rules={[{ required: true, mesage: 'Enter your email' }]}>
                <Input type='email' />
              </Form.Item>
              <Form.Item label='Phone' name='phone' rules={[{ required: true, mesage: 'Enter your phone' }]}>
                <Input type='number' />
              </Form.Item>
              <Form.Item name="gender" label="Gender" rules={[{ required: true, mesage: 'Enter your gender' }]}>
                <Select
                  placeholder="Select a option and change input text above"
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Date of Birth' name='dob' rules={[{ required: true, mesage: 'Enter yourdate of birth' }]}>
                <Input type='date' max={moment(
                  new Date(),
                  "MM-DD-YYYY",
                  true
                ).format("YYYY-MM-DD")} />
              </Form.Item>
              <Form.Item label='Password' name='password' rules={[{ required: true, mesage: 'Enter your password' }]}>
                <Input type='password' />
              </Form.Item>
              <Form.Item label='Confirm Password' name='confirmpassword' rules={[{ required: true, mesage: 'Enter your confirm password' }]}>
                <Input type='password' />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
            <div className='img-container'>
              <Photo />

            </div>
          </div>
        </div>

      </React.Fragment>

    )
  }
}
export default SignUp;
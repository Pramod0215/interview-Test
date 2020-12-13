 // eslint-disable-next-line
import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
class ViewProfile extends Component {
    constructor(props) {
        super(props);
        var data = localStorage.getItem('data')
        this.state = {
            data: JSON.parse(data)

        }
    }

    render() {
        console.log(this.state.data)
        return (
            <React.Fragment>
               <div className ='nav'>
                   <Link to='/homepage'>Home</Link>
                   <Link to='/profile'>Profile</Link>
                   <Link to='/'>Sign Up</Link>
               </div>

                <div className='card'>
                    <h3 className='padding-top-20'>View Profile</h3>
                    <div className='card-body'>
                        <div>
                            <div className='row label'>
                                <div className=' padding-right-10'>Name :</div>
                                <div> {this.state.data.name}</div>
                            </div>
                            <div className='row label'>
                                <div className=' padding-right-10'>Email: </div>
                                <div> {this.state.data.email}</div>
                            </div>
                            <div className='row label'>
                                <div className=' padding-right-10'>Phone: </div>
                                <div> {this.state.data.phone}</div>
                            </div>
                            <div className='row label'>

                                <div className=' padding-right-10'>Date of birth: </div>
                                <div> {this.state.data.dob}</div>
                            </div>
                        </div>
                        <div className='img-container'>
                            {this.state.data.img === undefined || ' ' ? null : <div> {this.state.data.img}</div>}

                        </div>
                    </div>
                </div>

            </React.Fragment>

        )
    }
}
export default ViewProfile;
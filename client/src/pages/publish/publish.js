import React, { Component } from "react";
import {Image} from 'cloudinary-react';
// Or for more advanced usage:
// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

class Publish extends Component{
  
    render(){
        return (
            <div className="main">
                <h1>Publish</h1>

                <Image cloudName="cali-cool" publicId="fsreqp3pxpjxku5trmxb" width="200" height="200" crop="thumb"/>
                <br/>
                thumbnail cropped at 200x200
                
            </div>

        );
    }

}

export default Publish;
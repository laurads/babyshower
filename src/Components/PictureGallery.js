import React, { Component } from 'react';
import Slider from 'react-slick';
import  './SliderStyle.css';

export default class PictureGallery extends Component {


    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            //fade: true,
            autoplaySpeed: 2000
        };
        return (
            <div className="Gallery-body">
                <Slider  ref={slider => (this.slider = slider)} arrows={false} {...settings}>
                    <div className="Gallery-picture">
                        <img src={ require('../Images/gallery/img1.jpg') } height="200px" alt="" />
                    </div>
                    <div className="Gallery-picture">
                        <img src={ require('../Images/gallery/img2.jpg') } height="200px" alt="" />
                    </div>
                    <div className="Gallery-picture">
                        <img src={ require('../Images/gallery/img3.jpg') } height="200px" alt="" />
                    </div>
                    <div className="Gallery-picture">
                        <img src={ require('../Images/gallery/img4.jpg') } height="200px" alt="" />
                    </div>
                    <div className="Gallery-picture">
                        <img src={ require('../Images/gallery/img5.jpg') } height="200px" alt="" />
                    </div>
                    <div className="Gallery-picture">
                        <img src={ require('../Images/gallery/img6.jpg') } height="200px" alt="" />
                    </div>
                    <div className="Gallery-picture">
                        <img src={ require('../Images/gallery/img7.jpg') } height="200px" alt="" />
                    </div>
                    <div className="Gallery-picture"> 
                        <img src={ require('../Images/gallery/img8.jpg') } height="200px" alt="" />
                    </div>
                </Slider>
            </div>
        );
    }
}
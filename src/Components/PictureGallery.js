import React, { Component } from 'react';
import Slider from 'react-slick';
import  './SliderStyle.css';

const IMG_PREFIX = "img";

export default class PictureGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    createGalleryPictures () {
        
        let picturesId = []
        for(let i=1;i<=22;i++){
            picturesId.push(i);
        }
        return picturesId.map(this.createGalleryPicture);
    }

    createGalleryPicture = item => {
        return (
            <div key="item" className="Gallery-picture">
                <img src={ require('../Images/gallery/'+IMG_PREFIX+item+'.jpg') } height="200px" alt="" />
            </div>
        )
    }

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
                    {this.createGalleryPictures()}
                </Slider>
            </div>
        );
    }
}
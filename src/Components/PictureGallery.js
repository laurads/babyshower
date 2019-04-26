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
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
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
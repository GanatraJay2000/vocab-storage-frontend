import React, { Component } from "react";
import Slider from "react-slick";
import "./a.css";


export default class SimpleSlider extends Component {
  render() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 350,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    };
    return (            
        <Slider {...settings}>            
            {this.props.children}
        </Slider>      
    );
  }
}
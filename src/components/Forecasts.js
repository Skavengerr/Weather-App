import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import {Card, Typography} from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const styles ={
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Forecasts extends Component {
  

  render() {
    const forecasts = this.props.forecasts;
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 3, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    };
    return (
      <React.Fragment>
                      <div className="py-16 w-full">
                    <div className="w-full relative product-carousel px-8 m-auto">
                        <Carousel
                            ssr={false}
                            swipeable={true}
                            draggable={true}
                            responsive={responsive}
                            infinite={false}
                            itemClass="py-4"
                            arrows={false}
                            keyBoardControl={false}
                            ref={(el) => (this.Carousel = el)}
                        >
                            {forecasts.map((forecast, i) => {
                            return (
                              <Card className="mx-8 mb-16">
                                <div className="relative bg-blue-300 h-40">
                                    <Typography variant="h4" className="m-auto ml-0 whitespace-no-wrap p-4">
                                        {forecast.high}<span>&#8451;</span>
                                    </Typography>

                                    <Typography variant="body1" className="text-13 text-left p-4">
                                        {forecast.text}
                                    </Typography>
                                </div>
                                <div className="p-4 text-2xl text-center">{forecast.day}</div>
                              </Card>
                            );
                          })}
                        </Carousel>

                        <button className="btn-left left-0" onClick={() => this.Carousel.previous()}/>
                        <button className="btn-right right-0" onClick={() => this.Carousel.next()}/>
                    </div>
                </div>
      </React.Fragment>
    );
  }
}

Forecasts.propTypes = {
  forecasts: PropTypes.array.isRequired
};

export default withStyles(styles)(Forecasts);

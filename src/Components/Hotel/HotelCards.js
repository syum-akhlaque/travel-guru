import React from 'react';
import StarIcon from '@material-ui/icons/Star';

const HotelCards = (props) => {
    const {image, title, feature, details, rating, price} = props.hotelData;
    return (
        <>
            <div className = 'hotel-img-section mt-3'><img src={image} alt=""/></div>
            <div className = 'hotel-info mt-3'>
                <h4>{title}</h4>
                <p>{feature}</p>
                <p className='mt-2'>{details}</p>
                <h5><StarIcon fontSize="small" style={{ color: '#F9A51A' }} />{rating}&nbsp; &nbsp;{price}/ <span className='text-muted'>night $167 total</span></h5>
            </div>
        </>
    );
};

export default HotelCards;
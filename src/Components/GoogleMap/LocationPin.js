import React from 'react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import './LocationPin.css'

const LocationPin = (props) => {
    const address = props.address;
    return (
        <div className = "pin">
            <Icon icon={locationIcon} className= "pin-icon" />
            <h6 className = 'pin-text'>{address}</h6>
        </div>
    );
};

export default LocationPin;
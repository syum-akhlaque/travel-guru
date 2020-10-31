import GoogleMapReact from 'google-map-react';
import React, { useContext } from 'react';
import { resortContext } from '../../App';
import LocationPin from './LocationPin';

const GoogleMap = () => {
    const [currentResort] = useContext(resortContext);
    const {address,lat,lng} = currentResort; //get lat and lang info by context api
    const zoomLevel = 12;

    return (       
        <div style={{ height: '110vh', width: '100%'}} className = "mt-5" > 
            <GoogleMapReact
                bootstrapURLKeys = {{ key: 'AIzaSyCMtpEbBf-wJJqP3StICS9We5AZP4v4-R0' }} 
                defaultCenter={{
                    lat : lat,
                    lng : lng
                }}
                defaultZoom = {zoomLevel}
            >
                <LocationPin
                    address = {address}
                />
            </GoogleMapReact>       
        </div>
    );
};

export default GoogleMap;
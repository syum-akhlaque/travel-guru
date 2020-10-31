import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Hotel.css';
import allHotelData from '../../FakeData/hotelData';
import { resortContext } from '../../App';
import { useLocation } from 'react-router-dom';
import GoogleMap from '../GoogleMap/GoogleMap';
import HotelCards from './HotelCards';

const Hotel = () => {
   
    const [currentResort] = useContext(resortContext);
    const hotelData = allHotelData.filter(fd => fd.resortId === currentResort.id);
    const location = useLocation();
    let {startDate, endDate} = location.state || {};
    startDate = startDate.toString().slice(4,10);
    endDate = endDate.toString().slice(8,10);
    
    return (
        <div > <hr/>
             <Container >
                <Row>
                    <Col sm={7} >
                        <small>252 stays {startDate }-{endDate} 3 guests</small>
                        <h1 className= 'mb-4 '> Stay In {hotelData[0].resortId} </h1>
                        {
                            hotelData.map(hotelData =>
                            <div>
                                <HotelCards key = {hotelData.id} hotelData = {hotelData} ></HotelCards>
                            </div> )
                        }
                    </Col>

                    <Col sm={5} className= 'mt-5'>   
                       {/* show google map hare*/}
                       <GoogleMap ></GoogleMap> 
                    </Col>
                </Row>
             </Container>
        </div>
    );
};

export default Hotel;

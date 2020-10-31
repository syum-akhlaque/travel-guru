import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Booking.css';
import { Container, Row, Col } from 'react-bootstrap';
import { resortContext } from '../../App';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import calender from '../../Images/Icon/calender_icon.png'

const Booking = (props) => {

    const [currentdResort] = useContext(resortContext);
    const { register, handleSubmit, errors } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());  
    const history = useHistory();
    const onSubmit = data => {
        history.push({ 
            pathname: '/hotel',
            state: { 
                startDate : startDate,
                endDate : endDate,
            }
        });
    }

    return (
        <div className="booking-container" > 
            <Container >
                <Row>
                    <Col sm={5}>
                        <h1> {currentdResort.location} </h1>
                        <p> {currentdResort.details} </p>
                    </Col>
                    <Col sm={7} className= ''>
                        <form className='booking-form' onSubmit={handleSubmit(onSubmit)}>

                            <label>Origin</label>
                            {errors.origin && <span className='error'>This field is required</span>}
                            <input name="origin" defaultValue="Dhaka" ref={register({ required: true })} />
                            
                            <label>Destination</label>
                            <input name="destination" value={currentdResort.location} />

                            <div className="d-flex">
                                    <div >
                                        <label>From</label><br /> 
                                        <label onClick={e => e.preventDefault()} className="d-flex wrap">   {/* onClick={e => e.preventDefault(), that close calender after select a date}*/}
                                            <img src={calender} className ='mt-2' height="18" alt=""/> &nbsp;&nbsp;
                                            <DatePicker className="w-75" closeOnScroll={true} selected={startDate}  onChange={date => setStartDate(date)}/>
                                        </label>
                                    </div>
                                    <div>
                                        <label>To</label><br />
                                        <label onClick={e => e.preventDefault()} className="d-flex wrap">
                                            <img src={calender} className ='mt-2' height="18" alt=""/> &nbsp;&nbsp;
                                            <DatePicker className="w-75" closeOnScroll={true} closable selected={endDate} onChange={date => setEndDate(date)}/>
                                        </label>
                                    </div>
                                </div>               
                            <input type="submit" value="Start Booking" />
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Booking;

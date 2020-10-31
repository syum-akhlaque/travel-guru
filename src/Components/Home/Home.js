import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import resort from '../../FakeData/resortData'
import { Container, Row, Col } from 'react-bootstrap';
import { resortContext } from '../../App';

const Home = () => {

    const [currentResort, setCurrentResort] = useContext(resortContext);
    const handleCurrentResort = (id)=>{
        const setNewResort = resort.find( resort => resort.id === id);
        setCurrentResort(setNewResort)  
    }
    const history = useHistory();
    const handleBooking = ()=>{
    history.push('/booking')
    }
    
    return (
        <div>
            <div className="home-container">
             <Container >
                <Row>
                    <Col sm={5}>
                        <h1> {currentResort.location} </h1>
                        <p> {currentResort.description} </p>
                        <button className = 'btn btn-warning' id={currentResort.id} onClick={handleBooking} >Booking</button>
                    </Col>
            
                    <Col sm={7} className= 'resort'>        
                        {
                        resort.map(resort =>
                            <div key={resort.id} 
                                style={{ backgroundImage: `linear-gradient( 0.12deg, #000000 0.1%, rgba(0, 0, 0, 0) 69.96% ), url(${resort.imgUrl})` }}
                                className='resort-card align-bottom'
                                onMouseOver={()=> handleCurrentResort(resort.id)}
                                onClick={handleBooking}
                                > {resort.location}
                            </div>)
                        }
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
};

export default Home;
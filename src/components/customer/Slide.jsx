import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsCurrencyRupee } from "react-icons/bs";


export default function Slide() {
  return (
    <>
      <div className=" px-2 mt-4 border border-dark w-100 ">
        <Carousel>
          <Carousel.Item>
            <div className='d-flex justify-content-evenly'>
              <div>
                <img className="d-block" style={{ height: "300px", width:"600px" }} src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Isha/Xiaomi/prebook/D212431502_IN_WLD_Xiaomi15_New_Launch_Tall_hero_3000x1200._CB547895039_.jpg" alt="First slide" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-end text-center p-3" style={{ height: "200px" }}>
                <h3 className="text-black">First slide label</h3>
                <p className="text-black">Some description text</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className='d-flex justify-content-evenly'>
              <div>
                <img className="d-block w-100" style={{ height: "300px" }} src="https://shopsy-tcj.netlify.app/assets/sale-cnpHUeHf.png" alt="First slide" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-end text-center p-3" style={{ height: "200px" }}>
                <h3 className="text-black">second slide label</h3>
                <p className="text-black">Some description text</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='w-100 d-flex justify-content-center p-3'>
        <h2>TOP SELLING PRODUCTS</h2>
      </div>
      <div className="m-3 border border-dark d-flex flex-row p-3">
        <Card className='me-4' style={{ width: '300px', height: '450px' }}>
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/300x120"
            style={{ height: "220px", objectFit: "cover" }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Card Title</Card.Title>
            <Card.Text className="flex-grow-1">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <p>Price :<span className='text-success fw-bold'><BsCurrencyRupee className='mb-1 fw-bold' />540</span></p>
            <Button variant="warning">Add to Cart</Button>
          </Card.Body>
        </Card>

        <Card className='me-4' style={{ width: '300px', height: '450px' }}>
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/300x120"
            style={{ height: "220px", objectFit: "cover" }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Card Title</Card.Title>
            <Card.Text className="flex-grow-1">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <p>Price :<span className='text-success fw-bold'><BsCurrencyRupee className='mb-1 fw-bold' />540</span></p>
            <Button variant="warning">Add to Cart</Button>
          </Card.Body>
        </Card>

        {/* third */}

        <Card className='me-4' style={{ width: '300px', height: '450px' }}>
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/300x120"
            style={{ height: "220px", objectFit: "cover" }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Card Title</Card.Title>
            <Card.Text className="flex-grow-1">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <p>Price :<span className='text-success fw-bold'><BsCurrencyRupee className='mb-1 fw-bold' />540</span></p>
            <Button variant="warning">Add to Cart</Button>
          </Card.Body>
        </Card>

        <Card className='me-4' style={{ width: '300px', height: '450px' }}>
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/300x120"
            style={{ height: "220px", objectFit: "cover" }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Card Title</Card.Title>
            <Card.Text className="flex-grow-1">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <p>Price :<span className='text-success fw-bold'><BsCurrencyRupee className='mb-1 fw-bold' />540</span></p>
            <Button variant="warning">Add to Cart</Button>
          </Card.Body>
        </Card>

      </div>
    </>
  );
}

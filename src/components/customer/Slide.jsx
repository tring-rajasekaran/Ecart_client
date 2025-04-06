import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsCurrencyRupee } from "react-icons/bs";
import { RANDOM_PRODUCT } from '../../graphql/query/productQuery';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import useAddToCart from '../common/useAddtoCart';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



export default function Slide() {

  const { addToCartHandler } = useAddToCart();

  const [products, setProducts] = useState([]);
  const { data, loading, error } = useQuery(RANDOM_PRODUCT);

  console.log(data, "responce");
  useEffect(() => {
    if (data && data.getRandomProducts) {
      setProducts(data.getRandomProducts);
    }
  }, [data]);

  // console.log(error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;
  // console.log(products[1].product_id, "id ");


  const calculateOfferPrice = (price, offer) => {
    if (!offer || offer < 1 || offer > 50) return price;
    return Math.round(price - (price * offer) / 100);
  };

  return (
    <>
      <div className=" px-2 mt-4 w-100 ">
        <Carousel>
          <Carousel.Item>
            <div className='d-flex justify-content-evenly'>
              <div>
                <img className="d-block" style={{ height: "300px", width: "600px" }} src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Isha/Xiaomi/prebook/D212431502_IN_WLD_Xiaomi15_New_Launch_Tall_hero_3000x1200._CB547895039_.jpg" alt="First slide" />
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
        <h2>PRODUCTS YOU MAY LIKE</h2>
      </div>
      <div className="m-2 d-flex flex-wrap gap-3 justify-content-center p-3">
        {products.map(product => (
          <Card key={product.id} className=' col-md-6 col-lg-3 mb-4 d-flex flex-column' style={{ width: '290px', height: '450px' }}>

            <div className="d-flex flex-column flex-grow-1">
              {product.offer && (
                <div className='d-flex flex-row justify-content-end align-items-center gap-1' style={{ marginBottom: "-10px" }}>
                  <h6 className="mb-0 text-success fw-bold">{product.offer}</h6>
                  <DotLottieReact
                    src="https://lottie.host/e52be1ea-23aa-48b6-96c8-5f2e5bf2e048/jok5rqbRw0.lottie"
                    loop
                    autoplay
                    style={{
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </div>
              )}

              {/* Product Image */}
              <Card.Img
                variant="top"
                src={product.image || "https://via.placeholder.com/300x220"}
                style={{
                  height: "190px",
                  objectFit: "contain",
                  padding: "10px",
                  ...(!product.offer && { marginTop: "10px" })
                }}
              />

              <Card.Body className="d-flex flex-column ">
                <Card.Title>{product.product_name}</Card.Title>

                <Card.Text className="flex-grow-1 text-muted" style={{
                  maxHeight: "60px",
                  overflowY: "auto",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal"
                }}>
                  {product.description}
                </Card.Text>

                {/* Price with offer calculation */}
                <p>
                  Price:
                  {product.offer ? (
                    <>
                      <span className='text-muted text-decoration-line-through ms-2'>
                        ₹{product.price}
                      </span>
                      <span className='text-success fw-bold ms-2'>
                        ₹{calculateOfferPrice(product.price, product.offer)}
                      </span>
                    </>
                  ) : (
                    <span className='text-success fw-bold ms-2'>
                      ₹{product.price}
                    </span>
                  )}
                </p>
              </Card.Body>
            </div>
            <div className="p-2 ">
              <Button
                variant="warning"
                className="w-100"
                onClick={() => addToCartHandler(product?.product_id)}
              >
                Add to Cart
              </Button>
            </div>
          </Card>



        ))}
      </div>
    </>
  );
}


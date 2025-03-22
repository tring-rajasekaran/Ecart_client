import React, { Fragment } from 'react'
import CommonLogin from '../common/CommonLogin';
import CommonRegister from '../common/CommonRegister';

export default function MerchantRegister() {
    const handleRegister = (data) => {
        console.log("Register Data:", data);
    };

    return (
        <Fragment>
            <div className="border border-dark w-100 min-vh-100  d-flex flex-row align-items-center justify-content-center" style={{backgroundImage:"linear-gradient(to bottom right,black,grey,white)"}}>
                <div className='w-50 align-items-center d-flex justify-content-center px-5'>
                    <h1 className="fw-bold display-4 text-uppercase text-warning">
                        From a home<br />grow to a well<br />known brand
                    </h1>
                </div>
                <div className='p-4' style={{ width: "450px" }}>
                    <CommonRegister title="Register" onSubmit={handleRegister} />
                </div>
            </div>
        </Fragment>
    )
}

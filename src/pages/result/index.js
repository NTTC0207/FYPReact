import { Button, Result } from 'antd';
import React from 'react';
import {Link} from 'react-router-dom'

const PaymentSuccess = () => (
  <Result
    status="success"
    title="Successfully Purchased Service!"
    subTitle="Our Freelancer will reach you soon, do not approve the job before he/she completed thier job!"
    extra={[
        <Link to='/'>
      <Button type="primary" key="console">
         Home Page 
      </Button>
      </Link>,
    <Link to="servicelist"> <Button key="buy">Buy Again</Button> </Link> ,
    ]}
  />
);

export default PaymentSuccess;
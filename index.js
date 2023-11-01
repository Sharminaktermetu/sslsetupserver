const express = require('express')
const app = express();
const cors =require ('cors');

const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'sslin6540f8f222862'
const store_passwd = 'sslin6540f8f222862@ssl'
const is_live = false //true for live, false for sandbox
app.use(cors());
app.use(express.json())

const port = 3030
app.get('/', async (req, res) => {

    /** 
    * Root url response 
    */
  
    return res.status(200).json({
      message: "Welcome to sslcommerz app",
      
    })
  })

app.post('/ssl-request', (req, res) => {
  
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: `https://setup-2dac0.web.app/ssl-payment-success`,
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        const GatewayPageURL = apiResponse.GatewayPageURL
        if (GatewayPageURL) {
            return res.send({url:GatewayPageURL});
          }
          else {
            return res.status(400).json({
              message: "Session was not successful"
            });
        }
        
    });


})

  app.post("/ssl-payment-success", async (req, res) => {

    return res.redirect('https://setup-2dac0.web.app/ssl-payment-success')
  })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
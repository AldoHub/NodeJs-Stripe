const express = require("express");
const router = express.Router();
//require stripe
const stripe = require("stripe")("sk_test_KEY");

router.post("/charge", (req, res, next) => {
    
  //get the payment amount
  const paymentAmount = req.body.amount;
  
  //check for the given email, if it has a customer_ID
  const customerEmail = req.body.stripeEmail;
  const stripeToken = req.body.stripeToken;
  console.log(req.body);

  //check the list of customers and to see if the customer email already exists
  //someone@someone.com
  stripe.customers.list({"email" : customerEmail}, (err, customer)=>{
   if(customer.data.length > 0){
     console.log(customer.data);
    //customer exists, just charge
    //using the customer ID
    stripe.charges.create({
      amount: paymentAmount,
      description : "product description",
      currency : "usd",
      customer: customer.data[0].id
    }).then(details => {
      console.log("Customer already exists, just charge, dont create a new one");
      //redirect
      console.log(details);
      res.redirect('/thankyou');
      //res.send(details);
    }).catch(err => res.send(err));

   }else{
     //customer does not exists
     //create a customer
      stripe.customers.create({
        email: customerEmail,
        source: stripeToken,
        description: "Test customer"
    })
      .then(customer => {
        //Create the charge for the customer
        stripe.charges.create({
          amount: paymentAmount,
          description : "product description",
          currency : "usd",
          customer: customer.id
        }).then(details => {
          res.redirect('/thankyou');
        }).catch(err => res.send(err));
      }).catch(err => res.send(err));


      }
  })
 
 

  });


module.exports = router;
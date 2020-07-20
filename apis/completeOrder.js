const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Orders = require('../models/Orders')
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");


router.post('/api/post/complete-order', async(req, res) => {

    let orderItem = await Orders.findOne({_id: req.body.orderID})
    let customer = await User.findOne({username: orderItem.customerUsername})

    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
        region: 'us-east-1'
    });

    const ses = new AWS.SES();
        const customerParams = {
        Destination: {
            ToAddresses: ["lookforcooks@gmail.com"] // change for prod: `${customer.email}`
        },
        ConfigurationSetName: 'LFCconfig',
        Message: {
            Body: {
                Html: {
                    // HTML Format of the email
                    Charset: "UTF-8",
                    Data:
                    `<html>
                    <head>
                        <style>
                            *{
                                color: black;
                            }
                            .username{
                                color: white;
                                background-color: #333;
                                box-shadow: 0px 0px 4px #333;
                                text-transform: uppercase;
                                text-align: center;
                            }
                            .email-container{
                                width: 100%;
                                max-width: 600px;
                                height: 600px;
                                box-shadow: 0px 0px 4px #333;
                                color: black;
                                font-size: 18px;
                                text-align: center;
                            }
                            .order{
                                border: #333 1px sold;
                            }
                            .num{
                                color: rgb(97, 169, 202);
                            }

                            .initial{
                                font-size: 24px;
                                font-weight: bold;
                            }
                            .disclaimer{
                                font-size: 12px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <h2 class="username">${orderItem.menuItemTitle} has been Delivered ✔</h2>
                            <div class = "information">
                                <div class = "initial">Your cook has confirmed that the delivery has been completed.</div>
                            </div>
                            <div class="order">
                                <div><b>Order ID:</b> ${orderItem._id}</div>
                                <div><b>Deliver to:</b> ${orderItem.address}</div>
                                <h3>Thank you for using Look for Cooks!</h3>
                                <div class="disclaimer">If you have not received your food, you have one hour to dispute the delivery on our website. If we do not hear back by then, we will automatically mark the delivery as delivered and there will be no refunds.</div>
                            </div>
                        </div>
                    </body>
                </html>`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: `${orderItem.menuItemTitle} has been Delviered ✔`
            }
        },
        Source: "lookforcooks@gmail.com"
        };

        const sendCustomerEmail = ses.sendEmail(customerParams).promise();

        try{
            const customerEmaildata = await sendCustomerEmail
            console.log("email submitted to customer and SES", customerEmaildata);
        }catch(error){ console.log(error) }

    /* let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'lookforcooks@gmail.com', // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        }
      });

      console.log('EMAIL: ', req.body.user)
      let info = await transporter.sendMail({
        from: '"Look for Cooks" <lookforcooks@gmail.com>', // sender address
        to: `${customer.email}`, // list of receivers
        subject: `${orderItem.menuItemTitle} has been Delviered ✔`, // Subject line
        html: ` <html>
                    <head>
                        <style>
                            *{
                                color: black;
                            }
                            .username{
                                color: white;
                                background-color: #333;
                                box-shadow: 0px 0px 4px #333;
                                text-transform: uppercase;
                                text-align: center;
                            }
                            .email-container{
                                width: 100%;
                                max-width: 600px;
                                height: 600px;
                                box-shadow: 0px 0px 4px #333;
                                color: black;
                                font-size: 18px;
                                text-align: center;
                            }
                            .order{
                                border: #333 1px sold;
                            }
                            .num{
                                color: rgb(97, 169, 202);
                            }

                            .initial{
                                font-size: 24px;
                                font-weight: bold;
                            }
                            .disclaimer{
                                font-size: 12px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <h2 class="username">${orderItem.menuItemTitle} has been Delivered ✔</h2>
                            <div class = "information">
                                <div class = "initial">Your cook has confirmed that the delivery has been completed.</div>
                            </div>
                            <div class="order">
                                <div><b>Order ID:</b> ${orderItem._id}</div>
                                <div><b>Deliver to:</b> ${orderItem.address}</div>
                                <h3>Thank you for using Look for Cooks!</h3>
                                <div class="disclaimer">If you have not received your food, you have one hour to dispute the delivery on our website. If we do not hear back by then, we will automatically mark the delivery as delivered and there will be no refunds.</div>
                            </div>
                        </div>
                    </body>
                </html>
                `, // html body
      });
 */
      let updateOrder = await Orders.updateOne({_id: req.body.orderID},{
        $set: {
            completed: true,
            deliveredDate: Date.now()
        }

    })

    res.json(updateOrder, orderItem, customer)
})

module.exports = router;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require('stripe')('sk_test_51NlJelLlg6AUYyoiX1D5fbP4eZTcd2ur8t42rnQgN7VS3hIksXtOZIqOGzivTe9CUy5NbwkblSOdddlD9JuHbKgY00mGINIBla');

app.post('/checkout', async(req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: req.body.items.map((item) => ({
                quantity: item.quantity,
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    },
                    unit_amount: item.price * 100,
                }
            })),
            success_url: 'http://localhost:4242/success.html',
            cancel_url: 'http://localhost:4242/cancel.html'
        })
        console.log(req.body.items);
        res.status(200).json(session);
    } catch (err) {
        next(err);
    }
});

app.listen(4242, () => console.log('app is running in port 4242'));
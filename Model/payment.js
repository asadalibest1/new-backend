import stripe from "stripe"
import users from "../schema/Users";

var StripePay = stripe(process.env.STRIPE_PRIVATE_KEY)

export const Payment = async (req, res) => {
  const { name, email, priceId } = req.body
  try {
    const findcustomer = await StripePay.customers.list({ email: email });
if (findcustomer.data.length > 0) {
  const customer = findcustomer.data[0]; 
  const session = await StripePay.checkout.sessions.create({
    customer: customer?.id, // ID of an existing customer
    payment_method_types: ['card'],
    subscription_data: {
      items: [
        {
          plan: priceId, // ID of the subscription plan
        },
      ],
    },
    mode: 'subscription',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });
  res.json({ subscription: session })

} else {
    const customer = await StripePay.customers.create({
      name: name,
      email: email,
    })
    const session = await StripePay.checkout.sessions.create({
      customer: customer?.id, // ID of an existing customer
      payment_method_types: ['card'],
      subscription_data: {
        items: [
          {
            plan: priceId, // ID of the subscription plan
          },
        ],
      },
      mode: 'subscription',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    res.json({ subscription: session })
  }

  
  }
  catch (e) {
    res.status(500).json({ error: e.message })
  }
}
export const Paymentsuccess = async (req, res, buf) => {
  let event = req.body;
  // const webhookSecret = "whsec_7d2e8c1a2e63aee844aa37fe4ad0036d8b9cc95a5e828d885b9021a28e18fbcc";
  // const signature = req.headers["stripe-signature"];
  // req.rawBody = buf;
  // try {
  //   event = StripePay.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
  // } catch (err) {
  //   console.log(`⚠️ Webhook signature verification failed.`, err.message);
  //   return res.sendStatus(400);
  // }

  // Handle the event type
  if (event.type === 'checkout.session.completed') {
    console.log("Success");
    const session = event.data.object;
    const subscription = await StripePay.subscriptions.retrieve(session.subscription, {
      expand: ['items.data.price.product'],
    });
    // Get the product name associated with the subscription
    const productName = subscription.items.data[0].price.product.name;
    // console.log(subscription,"2")
    // const lineItems = session.display_items;
    // console.log(productName,session.subscription,subscription.items.data[0].product,subscription.items.data[0]);  
    try {
      const email = session?.customer_details?.email;
      const updatedUser = await users.findOne({ email })
      updatedUser.subscription = true;
      updatedUser.Plan = productName,
      updatedUser.NFC_Count = subscription.items.data[0].price.product.metadata.NFC,
      updatedUser.subscriptionId = subscription?.id,
      await updatedUser.save()
      console.log("Updated", updatedUser)
    } catch (err) {
      console.log("Error updating user", err);
      return res.sendStatus(500);
    }
  }

  res.sendStatus(200);
}

export const subscription_Active = async (req) => {
  // const subscriptionId = 'sub_1MyY4WAoKnnSPgdX6aunvshq';
 
}

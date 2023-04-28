import stripe from "stripe"
import users from "../schema/Users";


var StripePay = stripe(process.env.STRIPE_PRIVATE_KEY)
export const VerifySubscription =async (req,res,next) =>{
        const user = await users.findById(req.query.userId);
        try {
            if(user.NFC_Count == 0){
              return res.json(({ message: "Subscription is Empty"}))
            }
            else{
                const subscription = await StripePay.subscriptions.retrieve(user?.subscriptionId)
                // Check if the subscription is active
                if (subscription.status === 'active') {
                  next()
                } else {
                    user.subscription = false;
                    user.Plan = "",
                    user.NFC_Count = "",
                    user.subscriptionId = "",
                    await user.save()
                  return res.json(({ message: "Subscription is Not active"}))
                }                   
            }
        } catch (error) {
            return res.status(403).json(({ message: "Subscription is Not active"}))
        }
 
}
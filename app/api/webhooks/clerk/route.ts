import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import User from '@/lib/database/models/userModal'
import connectToDatabase from '@/lib/database/connectionDatabase'

export async function POST(req: Request) {
  connectToDatabase()
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent

  // Verify the payload with the headers
  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = event.type;

  if (eventType === 'user.created') {
        const {id,email_addresses,last_name,first_name,image_url,username,} = event.data; 
        const user : CreateUser = {
            clerkId:id,
            email:email_addresses[0].email_address!,
            firstName:first_name!,
            lastName:last_name!,
            photo:image_url,
            username:username!,
        }

        const newUser = new User(user)
        newUser.save()
  }

  if(eventType === 'user.updated'){
    const {id,email_addresses,last_name,first_name,image_url,username,} = event.data;

    await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          username: username,
          firstName: first_name,
          lastName: last_name,
          email: email_addresses[0].email_address,
          photo: image_url
        }
      },
      { new: true }
    );
    
  }

  if(eventType === "user.deleted"){
    await User.findOneAndDelete(
      { clerkId: event.data.id }
    );
  }

  return new Response('', { status: 200 })
}
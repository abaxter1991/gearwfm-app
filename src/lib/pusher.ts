import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

const pusherAppId = process.env.PUSHER_APP_ID!
const pusherAppKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY!
const pusherAppSecret = process.env.PUSHER_APP_SECRET!

export const pusherServer = new PusherServer({
    appId: pusherAppId,
    key: pusherAppKey,
    secret: pusherAppSecret,
    cluster: 'us3',
    useTLS: true,
})

export const pusherClient = new PusherClient(pusherAppKey, {
    cluster: 'us3',
    // TODO: Implement authentication for security.
    // authEndpoint: '/api/pusher-auth',
    // authTransport: 'ajax',
    // auth: {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // },
})

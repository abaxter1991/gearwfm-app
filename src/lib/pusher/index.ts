import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
    appId: '1856321',
    key: '241e52b95ca8162b8310',
    secret: '25e234cd3371b40b0e3d',
    cluster: 'us3',
    useTLS: true,
})

export const pusherClient = new PusherClient(
    '241e52b95ca8162b8310',
    {
        cluster: 'us3',
        // authEndpoint: '/api/pusher-auth',
        // authTransport: 'ajax',
        // auth: {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // },
    }
)

import { auth } from '@clerk/nextjs/server'
import { createUploadthing } from 'uploadthing/next'
import type { FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const authenticateUser = () => {
    const user = auth()

    // if (!user.userId) {
    //     throw new UploadThingError('Unauthorized')
    // }

    return user
}

export const ourFileRouter = {
    mockups: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(authenticateUser)
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log('Upload complete for userId:', metadata.userId)
            console.log('file url', file.url)

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId }
        }),
    devMockups: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(authenticateUser)
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log('Upload complete for userId:', metadata.userId)
            console.log('file url', file.url)

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId }
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

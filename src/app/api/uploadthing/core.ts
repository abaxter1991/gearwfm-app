import { auth } from '@clerk/nextjs/server'
import { createUploadthing } from 'uploadthing/next'
import type { FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const authenticateUser = () => {
    // NOTE: Returning the instantiated auth object does not actually verify an authenticated user.
    // TODO: Implement a way to let only certain URL paths upload images when not authenticated.
    //       All other paths that try to upload images need to require authentication.
    const user = auth()
    return user
}

export const ourFileRouter = {
    mockups: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(authenticateUser)
        .onUploadComplete(async ({ metadata, file: _file }) => {
            return { uploadedBy: metadata.userId }
        }),
    devMockups: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(authenticateUser)
        .onUploadComplete(async ({ metadata, file: _file }) => {
            return { uploadedBy: metadata.userId }
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

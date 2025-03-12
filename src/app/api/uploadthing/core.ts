import { auth } from '@clerk/nextjs/server'
import { createUploadthing } from 'uploadthing/next'
import type { FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const getUserId = async () => {
    const { userId } = await auth()
    return userId ? userId : 'Anonymous'
}

const authenticateUserMiddleware = async () => {
    const userId = await getUserId()
    return { userId }
}

export const ourFileRouter = {
    mockups: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(authenticateUserMiddleware)
        .onUploadComplete(async ({ metadata, file: _file }) => {
            return { uploadedBy: metadata.userId }
        }),
    devMockups: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(authenticateUserMiddleware)
        .onUploadComplete(async ({ metadata, file: _file }) => {
            return { uploadedBy: metadata.userId }
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

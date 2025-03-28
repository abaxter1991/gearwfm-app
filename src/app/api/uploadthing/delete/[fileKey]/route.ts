import { UTApi } from 'uploadthing/server'

type Params = {
    fileKey: string
}

export async function DELETE(request: Request, context: { params: Promise<Params> }) {
    const fileKey = (await context.params).fileKey
    const utApi = new UTApi()

    await utApi.deleteFiles(fileKey)

    return Response.json({ fileKey })
}

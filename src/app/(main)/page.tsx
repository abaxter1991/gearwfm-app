'use client'

import { UploadButton, UploadDropzone, Uploader } from '@/lib/uploadthing'
import { FileUpload } from '@/components/common/file-upload'

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <FileUpload
                endpoint="mockups"
                onChange={(url) => console.log({ url })}
            />
        </main>
    )
}

// import Image from 'next/image'
//
// export default function HomePage() {
//   return (
//       <div className="flex h-full items-center justify-center p-24">
//         Home Page
//       </div>
//   )
// }

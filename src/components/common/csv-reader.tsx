import { useState } from 'react'

import { formatFileSize, lightenDarkenColor, useCSVReader } from 'react-papaparse'
import { cn } from '~/lib/utils'

const DEFAULT_REMOVE_HOVER_COLOR = '#A01919'
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(DEFAULT_REMOVE_HOVER_COLOR, 40)

type Props = {
    onCsvLoaded?: (csvData: any) => void
}

export function CsvReader({ onCsvLoaded }: Props) {
    const { CSVReader } = useCSVReader()

    const [removeHoverColor, setRemoveHoverColor] = useState(DEFAULT_REMOVE_HOVER_COLOR)

    return (
        <CSVReader
            onUploadAccepted={(results: any) => {
                if (onCsvLoaded) {
                    onCsvLoaded(results.data)
                }
            }}
            onDragOver={(event: DragEvent) => {
                event.preventDefault()
            }}
            onDragLeave={(event: DragEvent) => {
                event.preventDefault()
            }}
        >
            {({ getRootProps, getRemoveFileProps, acceptedFile, ProgressBar, Remove }: any) => (
                <>
                    <div
                        {...getRootProps()}
                        className={cn('flex flex-col items-center gap-6', 'rounded-lg border border-dashed p-6 outline-0', 'transition duration-250 ease-in-out')}
                    >
                        {acceptedFile ? (
                            <>
                                <div className="relative z-10 flex size-28 flex-col justify-center">
                                    <div className="flex flex-col items-center px-2.5">
                                        <p className="flex justify-center">{formatFileSize(acceptedFile.size)}</p>
                                        <p>{acceptedFile.name}</p>
                                    </div>
                                    <div className="absolute bottom-3.5 w-full px-2.5">
                                        <ProgressBar />
                                    </div>
                                    <div
                                        {...getRemoveFileProps()}
                                        className="absolute right-1.5 top-1.5 size-10"
                                        onMouseOver={(event: Event) => {
                                            event.preventDefault()
                                            setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT)
                                        }}
                                        onMouseOut={(event: Event) => {
                                            event.preventDefault()
                                            setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR)
                                        }}
                                    >
                                        <Remove color={removeHoverColor} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            'Drop CSV file here or click to upload'
                        )}
                    </div>
                </>
            )}
        </CSVReader>
    )
}

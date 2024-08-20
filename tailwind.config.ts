import { nextui } from '@nextui-org/react'
import { withUt } from 'uploadthing/tw'
import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,md,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,md,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
    },
    plugins: [
        nextui(),
    ],
}

export default withUt(config)

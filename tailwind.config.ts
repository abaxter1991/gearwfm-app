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
        // container: {
        //     center: true,
        //     padding: '2rem',
        //     screens: {
        //         '2xl': '1400px',
        //     },
        // },
        extend: {
            animation: {
                'spin-3s': 'spin 3s linear infinite',
                'spin-5s': 'spin 5s linear infinite',
            },
            boxShadow: {
                'outer-md': '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
                'inner-md': 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.5)',
                'outer-lg': '0 2px 6px 0 rgba(0, 0, 0, 0.5)',
                'inner-lg': 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.5)',
            },
            colors: {
                'brand-primary': '#3F9FD8',
                'gear-gray': {
                    darkest: '#1E1E20',
                    darker: '#323338',
                    dark: '#5F6C77',
                    DEFAULT: '#9AADBD',
                    light: '#BFCBD6',
                    lighter: '#D8DFE5',
                    lightest: '#F5F6F8',
                },
            },
        },
    },
    variants: {
        extend: {
            animation: ['hover', 'focus'],
            backgroundColor: ['active', 'checked'],
            borderColor: ['checked'],
            transitionProperty: ['hover', 'focus', 'translate'],
        },
    },
    plugins: [
        nextui(),
    ],
}

export default withUt(config)

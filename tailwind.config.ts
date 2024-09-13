import { nextui } from '@nextui-org/react'
import { withUt } from 'uploadthing/tw'
import type { Config } from 'tailwindcss'
import { semanticColors } from '@nextui-org/react'

const config: Config = {
    darkMode: 'class',
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,md,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,md,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
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
            // The sm, md, lg, xl, and 2xl breakpoints below are currently set to the default values.
            // This is done intentionally so that we can remember to change these values to more efficient
            // ones in the future when we are ready to make the site more responsive than it currently is.
            screens: {
                mobile: '576px',
                sm: '640px',
                md: '768px',
                tablet: '960px',
                lg: '1024px',
                xl: '1280px',
                desktop: '1440px',
                '2xl': '1536px',
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
        // TODO: Verify with client if he would like to use the default danger/red colors from NextUI or change it back to TailwindCSS red colors.
        // nextui({
        //     themes: {
        //         light: {
        //             extend: 'light',
        //             colors: {
        //                 danger: {
        //                     DEFAULT: '#ef4444',
        //                     50: '#7f1d1d',
        //                     100: '#991b1b',
        //                     200: '#b91c1c',
        //                     300: '#dc2626',
        //                     400: '#ef4444',
        //                     500: '#f87171',
        //                     600: '#fca5a5',
        //                     700: '#fecaca',
        //                     800: '#fee2e2',
        //                     900: '#fef2f2',
        //                 },
        //             },
        //         },
        //         dark: {
        //             extend: 'dark',
        //             colors: {
        //                 danger: {
        //                     DEFAULT: '#ef4444',
        //                     50: '#fef2f2',
        //                     100: '#fee2e2',
        //                     200: '#fecaca',
        //                     300: '#fca5a5',
        //                     400: '#f87171',
        //                     500: '#ef4444',
        //                     600: '#dc2626',
        //                     700: '#b91c1c',
        //                     800: '#991b1b',
        //                     900: '#7f1d1d',
        //                 },
        //             },
        //         },
        //     },
        // }),
    ],
}

export default withUt(config)

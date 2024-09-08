import { Button as NextUIButton, extendVariants } from '@nextui-org/react'

export const Button = extendVariants(NextUIButton, {
    variants: {
        color: {
            brand: 'text-[#000] bg-brand-primary',
        },
        isDisabled: {
            true: 'bg-brand-primary/50 text-[#000] opacity-50 cursor-not-allowed',
        },
        // size: {
        //     xs: 'px-2 min-w-12 h-6 text-tiny gap-1 rounded-small',
        //     md: 'px-4 min-w-20 h-10 text-small gap-2 rounded-small',
        //     xl: 'px-8 min-w-28 h-14 text-large gap-4 rounded-medium',
        // },
    },
    defaultVariants: {
        // <- modify/add default variants
        color: 'brand',
        // size: 'xl',
    },
    compoundVariants: [
        // <- modify/add compound variants
        {
            isDisabled: true,
            color: 'brand',
            class: 'bg-[#84cc16]/80 opacity-100',
        },
    ],
})

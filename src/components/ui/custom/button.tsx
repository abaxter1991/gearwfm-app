import { Button as HeroUIButton, extendVariants } from '@heroui/react'

export const Button = extendVariants(HeroUIButton, {
    variants: {
        color: {
            brand: 'text-[#000] bg-brand-primary',
        },
        isDisabled: {
            true: 'bg-brand-primary/50 text-[#000] opacity-50 cursor-not-allowed',
        },
    },
    defaultVariants: {
        color: 'brand',
    },
    compoundVariants: [
        {
            isDisabled: true,
            color: 'brand',
            class: 'bg-[#84cc16]/80 opacity-100',
        },
    ],
})

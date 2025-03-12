import { Chip, Spinner, tv, useCheckbox, VisuallyHidden } from '@heroui/react'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import type { CheckboxProps } from '@heroui/react'

const checkbox = tv({
    slots: {
        base: 'border-default hover:bg-default-200',
        content: 'text-default-500 uppercase',
    },
    variants: {
        isSelected: {
            true: {
                base: 'border-success bg-success hover:bg-success-500 hover:border-success-500',
                content: 'text-success-foreground pl-1',
            },
        },
        isFocusVisible: {
            true: {
                base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
            },
        },
    },
})

type Props = CheckboxProps & {
    onUpdate: () => Promise<void>
    className?: string
}

export function CustomCheckbox({ onUpdate, className = '', ...props }: Props) {
    const { children, isSelected, isFocusVisible, getBaseProps, getInputProps } = useCheckbox({ ...props })

    const [isLoading, setIsLoading] = useState(false)

    const styles = checkbox({ isSelected, isFocusVisible })

    return (
        <label {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: cn(styles.base(), className),
                    content: styles.content(),
                }}
                color="primary"
                variant="faded"
                size="sm"
                radius="sm"
                onClick={async () => {
                    if (isLoading) {
                        return
                    }

                    setIsLoading(true)
                    await onUpdate()
                    setIsLoading(false)
                }}
            >
                <div className="group relative">
                    {children ? children : isSelected ? 'Enabled' : 'Disabled'}
                    <div className={cn('absolute inset-0 size-full items-center justify-center backdrop-blur-[1px]', isLoading ? 'flex' : 'hidden')}>
                        {isLoading && <Spinner classNames={{wrapper: 'h-4 w-4'}}/>}
                    </div>
                </div>
            </Chip>
        </label>
    )
}

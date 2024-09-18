import { Input } from '@nextui-org/react'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { cn } from '~/lib/utils'
import type { InputProps } from '@nextui-org/react'
import type { WheelEvent } from 'react'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<InputProps, 'form' | 'type'> & {
    form: UseFormReturn<any, undefined>
    preventValueChangeOnScroll?: boolean
}

export default function NumberInputField(fieldProps: Props) {
    const { form, preventValueChangeOnScroll = false, className, classNames, ...props } = fieldProps
    const name = props.name || ''

    // TODO: Create the read only styles
    const readOnlyClassNames = {
        ...classNames,
        inputWrapper: [],
    }

    const handleOnWheel = (event: WheelEvent<HTMLInputElement>) => {
        // If props.onWheel exists, then it will run, ignoring preventValueChangeOnScroll.
        if (props.onWheel) {
            props.onWheel(event)
            return
        }

        if (preventValueChangeOnScroll) {
            event.currentTarget.blur()
            event.preventDefault()
            event.stopPropagation()
        }
    }

    return (
        <div className={cn(className)}>
            <FormField
                control={form.control}
                name={name}
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                {...field}
                                {...form.register(name, { valueAsNumber: true })}
                                {...props}
                                type="number"
                                classNames={props.isReadOnly ? readOnlyClassNames : classNames}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                                onWheel={handleOnWheel}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

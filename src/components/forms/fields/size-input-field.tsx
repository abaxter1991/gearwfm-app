import { Input } from '@nextui-org/react'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { cn } from '~/lib/utils'
import type { InputProps } from '@nextui-org/react'
import type { ReactNode, WheelEvent } from 'react'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<InputProps, 'form' | 'type'> & {
    form: UseFormReturn<any, undefined>
    preventValueChangeOnScroll?: boolean
    checkboxContent: ReactNode
}

export default function SizeInputField(fieldProps: Props) {
    const { form, preventValueChangeOnScroll = false, checkboxContent, className, classNames, label, ...props } = fieldProps
    const name = props.name || ''

    const customClassNames = {
        ...classNames,
        label: cn(classNames?.label, 'w-full'),
    }

    // TODO: Create the read only styles
    const readOnlyClassNames = {
        ...classNames,
        inputWrapper: [],
    }

    const labelContent = (
        <div className="flex w-full justify-between">
            {label}
            {checkboxContent}
        </div>
    )

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
                render={({field, fieldState}) => (
                    <FormItem>
                        <FormControl>
                            <>
                                <Input
                                    {...field}
                                    {...form.register(name, {valueAsNumber: true})}
                                    {...props}
                                    type="number"
                                    label={labelContent}
                                    classNames={props.isReadOnly ? readOnlyClassNames : customClassNames}
                                    isInvalid={fieldState.invalid}
                                    errorMessage={fieldState.error?.message}
                                    onWheel={handleOnWheel}
                                />
                            </>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    )
}

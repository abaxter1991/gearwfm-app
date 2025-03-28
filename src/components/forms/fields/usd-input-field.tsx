import { Input } from '@heroui/react'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { cn } from '~/lib/utils'
import type { InputProps } from '@heroui/react'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<InputProps, 'form' | 'type'> & {
    form: UseFormReturn<any, undefined>
}

export default function UsdInputField(fieldProps: Props) {
    const { form, className, classNames, ...props } = fieldProps
    const name = props.name || ''

    // TODO: Create the read only styles
    const readOnlyClassNames = {
        ...classNames,
        inputWrapper: [],
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
                                value={isNaN(field.value) || field.value === 0 ? '' : parseFloat(field.value.toString()).toFixed(2)}
                                onValueChange={(value) =>
                                    field.onChange(() => {
                                        const output = parseFloat(value).toFixed(2)
                                        return isNaN(Number(output)) ? 0.0 : output
                                    })
                                }
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                                classNames={props.isReadOnly ? readOnlyClassNames : classNames}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <p className="text-small">$</p>
                                    </div>
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

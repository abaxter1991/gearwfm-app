import { Input } from '@nextui-org/react'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import type { InputProps } from '@nextui-org/react'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<InputProps, 'form' | 'type'> & {
    form: UseFormReturn<any, undefined>
}

export default function UsdInputField(fieldProps: Props) {
    const { form, className, classNames, ...props } = fieldProps
    const name = props.name || ''

    let readOnlyClassNames = {
        ...classNames,
        inputWrapper: [
            // 'border-0 shadow-none',
        ],
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
                                // value={props.value ? parseFloat(props.value).toFixed(2) : props.value}
                                value={isNaN(field.value) || field.value === 0 ? '' : parseFloat(field.value.toString()).toFixed(2)}
                                onValueChange={(value) => field.onChange(() => {
                                    const output = parseFloat(value).toFixed(2)
                                    return isNaN(Number(output)) ? 0.00 : output
                                })}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                                classNames={props.isReadOnly ? readOnlyClassNames : classNames}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <p className="text-small">
                                            $
                                        </p>
                                    </div>
                                }
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    )
}

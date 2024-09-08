import { DatePicker } from '@nextui-org/react'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { cn } from '~/lib/utils'
import type { DatePickerProps } from '@nextui-org/react'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<DatePickerProps, 'form' | 'value' | 'onChange'> & {
    form: UseFormReturn<any, undefined>
}

export default function DatePickerField(fieldProps: Props) {
    const { form, className, ...props } = fieldProps
    const name = props.name || ''

    return (
        <div className={cn(className)}>
            <FormField
                control={form.control}
                name={name}
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormControl>
                            <DatePicker
                                {...field}
                                {...form.register(name)}
                                {...props}
                                value={field.value}
                                onChange={field.onChange}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

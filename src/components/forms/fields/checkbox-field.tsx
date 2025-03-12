import { Checkbox } from '@heroui/react'
import { type ReactNode } from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { cn } from '~/lib/utils'
import type { CheckboxProps } from '@heroui/react'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<CheckboxProps, 'form'> & {
    form: UseFormReturn<any, undefined>
    children?: ReactNode
}

export default function CheckboxField(fieldProps: Props) {
    const { form, className, children, ...props } = fieldProps
    const name = props.name || ''

    return (
        <div className={cn(className)}>
            <FormField
                control={form.control}
                name={name}
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormControl>
                            <Checkbox
                                {...field}
                                {...form.register(name)}
                                {...props}
                                isSelected={field.value}
                                onValueChange={field.onChange}
                                isInvalid={fieldState.invalid}
                            >
                                {children}
                            </Checkbox>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

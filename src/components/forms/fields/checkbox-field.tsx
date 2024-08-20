import { ReactNode } from 'react'
import { Checkbox } from '@nextui-org/react'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import type { CheckboxProps } from '@nextui-org/react'
import type { UseFormReturn } from 'react-hook-form'

type CheckboxFieldProps = Omit<CheckboxProps, 'form'> & {
    form: UseFormReturn<any, undefined>
    children?: ReactNode
}

export default function CheckboxField(fieldProps: CheckboxFieldProps) {
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
                                errorMessage={fieldState.error?.message}
                            >
                                {children}
                            </Checkbox>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    )
}

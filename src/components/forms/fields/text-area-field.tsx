import { Textarea } from '@nextui-org/react'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import type { TextAreaProps } from '@nextui-org/react'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<TextAreaProps, 'form'> & {
    form: UseFormReturn<any, undefined>
}

export default function TextAreaField(fieldProps: Props) {
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
                            <Textarea
                                {...field}
                                {...form.register(name)}
                                {...props}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    )
}

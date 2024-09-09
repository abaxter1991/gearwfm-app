import { Input } from '@nextui-org/react'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { cn } from '~/lib/utils'
import type { InputProps } from '@nextui-org/react'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<InputProps, 'form'> & {
    form: UseFormReturn<any, undefined>
}

export default function InputField(fieldProps: Props) {
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
                                {...form.register(name, { valueAsNumber: props.type === 'number' })}
                                {...props}
                                classNames={props.isReadOnly ? readOnlyClassNames : classNames}
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

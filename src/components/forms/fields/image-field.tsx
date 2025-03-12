import { Button, Input } from '@heroui/react'
import { HiPhoto } from 'react-icons/hi2'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { cn } from '~/lib/utils'
import type { InputProps } from '@heroui/react'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<InputProps, 'form' | 'type'> & {
    form: UseFormReturn<any, undefined>
}

export default function ImageField(fieldProps: Props) {
    const { form, className, classNames, ...props } = fieldProps
    const name = props.name || ''

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
                                {...form.register(name)}
                                {...props}
                                type="file"
                                classNames={classNames}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                                startContent={
                                    <Button
                                        isIconOnly
                                        color="primary"
                                        size="sm"
                                    >
                                        <HiPhoto className="size-6" />
                                    </Button>
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

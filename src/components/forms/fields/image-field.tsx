import { Button, Input } from '@nextui-org/react'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import type { InputProps } from '@nextui-org/react'
import type { UseFormReturn } from 'react-hook-form'
import { HiPhoto } from 'react-icons/hi2'

type ImageFieldProps = Omit<InputProps, 'form' | 'type'> & {
    form: UseFormReturn<any, undefined>
}

export default function ImageField(fieldProps: ImageFieldProps) {
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
                                {...form.register(name)}
                                {...props}
                                type="file"
                                classNames={props.isReadOnly ? readOnlyClassNames : classNames}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                                // onChange={() => console.log(field.value)}
                                startContent={
                                    <Button
                                        isIconOnly
                                        color="primary"
                                        size="sm"
                                    >
                                        <HiPhoto className="h-6 w-6" />
                                    </Button>
                                }
                            />
                            {/*<img src={field.value} />*/}
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    )
}

// import { Button } from '@nextui-org/react'
// import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
// import { cn } from '@/lib/utils'
// import type { UseFormReturn } from 'react-hook-form'
// import { HiPhoto } from 'react-icons/hi2'
// import type { InputHTMLAttributes } from 'react'
//
// type ImageFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, | 'type'> & {
//     form: UseFormReturn<any, undefined>
// }
//
// export default function ImageField(fieldProps: ImageFieldProps) {
//     const { form, className, ...props } = fieldProps
//     const name = props.name || ''
//
//     return (
//         <div className={cn(className)}>
//             <FormField
//                 control={form.control}
//                 name={name}
//                 render={({ field, fieldState }) => (
//                     <FormItem>
//                         <FormControl>
//                             <input
//                                 {...field}
//                                 {...form.register(name)}
//                                 {...props}
//                                 type="file"
//                                 onChange={() => console.log(field.value)}
//                             />
//                             <Button
//                                 isIconOnly
//                                 color="primary"
//                                 size="sm"
//                                 onClick={open}
//                             >
//                                 <HiPhoto className="h-6 w-6" />
//                             </Button>
//                         </FormControl>
//                         <FormMessage/>
//                     </FormItem>
//                 )}
//             />
//         </div>
//     )
// }

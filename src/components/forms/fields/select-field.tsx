// import { Select, SelectItem } from '@nextui-org/react'
// import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
// import { cn } from '@/lib/utils'
// import type { SelectProps } from '@nextui-org/react'
// import type { UseFormReturn } from 'react-hook-form'
//
// type SelectFieldProps = Omit<SelectProps, 'form'> & {
//     form: UseFormReturn<any, undefined>
// }
//
// export default function SelectField(fieldProps: SelectFieldProps) {
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
//                             <Select
//                                 {...field}
//                                 {...form.register(name)}
//                                 {...props}
//                                 isInvalid={fieldState.invalid}
//                                 errorMessage={fieldState.error?.message}
//                             >
//                                 {(item) => (
//                                     <SelectItem key={item.value} textValue={item.value}>
//                                         <div className="flex items-center gap-2">
//                                             {item.value}
//                                         </div>
//                                     </SelectItem>
//                                 )}
//                             </Select>
//                         </FormControl>
//                         <FormMessage/>
//                     </FormItem>
//                 )}
//             />
//         </div>
//     )
// }

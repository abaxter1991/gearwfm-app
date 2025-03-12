import { Button } from '@heroui/react'

type Props = {
    submitButtonLabel: string
    showCancelButton: boolean
    isDisabled: boolean
    onCancel: () => void
    onSave: () => void
}

export function ActionButtons({ submitButtonLabel, showCancelButton, isDisabled, onCancel, onSave }: Props) {
    return (
        <div className="flex w-full justify-end gap-4">
            {showCancelButton && (
                <Button
                    type="button"
                    size="sm"
                    color="danger"
                    variant="bordered"
                    onPress={onCancel}
                >
                    Cancel
                </Button>
            )}
            <Button
                size="sm"
                variant="solid"
                isDisabled={isDisabled}
                onPress={onSave}
                className="w-full bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
            >
                {submitButtonLabel}
            </Button>
        </div>)
}

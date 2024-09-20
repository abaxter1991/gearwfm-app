import { Button } from '@nextui-org/react'

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
                    variant="bordered"
                    color="danger"
                    size="sm"
                    className="text-danger"
                    onPress={onCancel}
                >
                    Cancel
                </Button>
            )}
            <Button
                isDisabled={isDisabled}
                variant="solid"
                size="sm"
                className="w-full bg-brand-primary text-black"
                onPress={onSave}
            >
                {submitButtonLabel}
            </Button>
        </div>)
}

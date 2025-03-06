declare global {
    interface Window {
        google: any // Declare google as any to avoid type errors.  Consider a more specific type if possible.
        initMap: () => void
    }
}

export {}


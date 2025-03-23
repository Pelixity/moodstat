import { create } from 'zustand';

interface ErrorState {
    toastError: string | undefined;
}

const useErrorStore = create<ErrorState>()(() => ({
    toastError: undefined,
}));

export default useErrorStore;

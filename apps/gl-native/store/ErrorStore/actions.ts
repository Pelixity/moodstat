import useErrorStore from './index';

export function setToastError(message: string) {
    useErrorStore.setState({ toastError: message });
}

export function clearToastError() {
    useErrorStore.setState({ toastError: undefined });
}

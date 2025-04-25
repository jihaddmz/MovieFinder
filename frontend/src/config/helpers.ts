export function isMobile(): boolean {
    return innerWidth < 768;
}

export const checkForApiError = async (response: Response) => {
    if (!response.ok) {
        throw Error((await response.json()).message);
    }
}
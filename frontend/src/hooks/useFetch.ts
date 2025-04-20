import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchFunction();
            setData(result);
            setLoading(false);
            setError(null);
        } catch (e) {
            const error = e instanceof Error ? e : Error("An error occurred.");
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (autoFetch)
            fetchData();
    }, [])


    return {data, loading, error, refetch: fetchData};
}

export default useFetch;
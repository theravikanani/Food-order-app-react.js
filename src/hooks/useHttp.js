import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
    const response = await fetch(url, config);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong, failed to send request.');
    }
    return resData;
}


const useHttp = (url, config) => {
    const [data, setData] = useState(); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

     const sendRequest = useCallback(async () => {
        setIsLoading(true);
        try {
            const resData = sendHttpRequest(url, config);
            setData(resData);
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (config && config.method === 'GET'){
            sendRequest();
        }
        
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest
    };

}

export default useHttp;
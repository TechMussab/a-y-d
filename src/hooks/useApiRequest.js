import {useEffect, useState} from "react";
import CallApi from "../HelperClasses/CallApi";
import auth from "../HelperClasses/Auth";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};

function useApiRequest(apiUrl, requestType = 'get', payLoad = {}, deps = []) {
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {

        async function callApi() {
            try {
                let resp = new CallApi();
                let res = requestType === 'get' ? await resp.getData({apiUrl: apiUrl}) : await resp.postData({
                    apiUrl: apiUrl, data:
                        {
                            token: auth.token,
                            ...payLoad
                        }
                });
                // console.log('in tc: ')
                // console.log(res)
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(res);
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
            await delay(5000)
        }
        if (apiUrl.length > 0) {

             callApi();
        }
        else {
            setRequestStatus(REQUEST_STATUS.SUCCESS);
            setData(auth.userData);
        }
    }, deps);
    return {
        data,
        requestStatus,
        error,
    };
}

export default useApiRequest;

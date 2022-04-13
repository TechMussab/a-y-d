import { useEffect, useState } from "react";
import CallApi from "../HelperClasses/CallApi";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};

function useApiRequest(apiUrl) {
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        async function callApi() {
            try {
                let resp=new CallApi();
                let res=await resp.getData({apiUrl:apiUrl})
                // console.log('in tc: ')
                // console.log(res)
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(res);
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }
        callApi();
    }, []);
    // console.log('in hook')
    // console.log('ts: '+ts)
    // console.log(requestStatus)
    // console.log('hook err '+error)
    // console.log('hook rs '+requestStatus)
    // console.log('in hook')
    // console.log('done hook')
    return {
        data,
        requestStatus,
        error,
    };
}

export default useApiRequest;

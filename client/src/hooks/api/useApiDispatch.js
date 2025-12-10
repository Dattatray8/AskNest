// src/hooks/api/useApiDispatch.js
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setLoading } from "../../redux/questionSlice";

export default function useApiDispatch() {
    const dispatch = useDispatch();

    const run = async (promiseFunc, onSuccess) => {
        try {
            dispatch(setLoading(true));
            const res = await promiseFunc();
            if (onSuccess) onSuccess(res.data);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { run };
}

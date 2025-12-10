// src/hooks/profile/useProfileTabData.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api/useApi";
import useApiDispatch from "../api/useApiDispatch";
import { profileTabConfig } from "../../config/profileTabConfig";

export default function useProfileTabData(tabKey, userId) {
  const dispatch = useDispatch();
  const { run } = useApiDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const config = profileTabConfig[tabKey];
    if (!config) return; // No config → no fetch

    setLoading(true);

    run(
      () => api.get(config.endpoint(userId)),
      (data) => {
        config.reducer(dispatch, data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, [tabKey, userId]);
  return { loading };
}

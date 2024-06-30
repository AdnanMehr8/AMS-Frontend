import { useEffect } from "react";
import { refreshAccessToken } from "../api/internal";

const useTokenRefresh = () => {
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await refreshAccessToken();
            } catch (error) {
                console.error("Token refresh failed: ", error);
            }
        }, 25 * 60 * 1000); // Refresh every 25 minutes

        return () => clearInterval(interval);
    }, []);
};

export default useTokenRefresh;

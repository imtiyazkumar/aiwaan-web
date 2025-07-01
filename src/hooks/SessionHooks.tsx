import { Outlet } from "react-router";
import { useIdleTimer } from "react-idle-timer";
import { useAuth } from "../root/providers/AuthProvider";
import config from "../../config";

export const ValidateSession = () => {
    const auth = useAuth();

    useIdleTimer({
        timeout: 1000 * 60 * 60 * config.inactivityDuration,
        promptTimeout: 0,
        onIdle: auth.clearAuth,
        debounce: 1000 * 60 * 1,
        crossTab: true,
        name: "Aiwaan Timer",
        syncTimers: 1000 * 60 * 1,
    });

    return <Outlet />;
};

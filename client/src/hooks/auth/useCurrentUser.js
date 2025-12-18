import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCurrentUserHook } from "../useCurrentUser";

/**
 * useCurrentUser
 * - Returns logged-in user from Redux
 * - Automatically watches for auth changes
 * - Adds a safe-loading state (prevents flicker)
 */

export default function useCurrentUser() {
    useCurrentUserHook();
    const userFromStore = useSelector((state) => state.user?.userData);
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        setUser(userFromStore || null);
        setChecking(false);
    }, [userFromStore]);

    return {
        user,
        isLoggedIn: Boolean(user),
        checking, // true until Redux loads user
    };
}

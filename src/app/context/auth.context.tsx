"use client";

import supabaseClient from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
    isInitialized: boolean;
    isLoggedIn: boolean;
    user: User | null;
};

const initialValue: AuthContextValue = {
    isInitialized: false,
    isLoggedIn: false,
    user: null,
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [user, setUser] = useState<AuthContextValue["user"]>(null);
    const isLoggedIn = !!user;

    useEffect(() => {
        // 서버에서는 무용지물
        const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log(event);

            if (event === "INITIAL_SESSION") {
                // handle initial session
                setUser(session?.user || null);
            } else if (event === "SIGNED_IN") {
                // handle sign in event
                setUser(session!.user);
            } else if (event === "SIGNED_OUT") {
                setUser(null);
                // handle sign out event
            } else if (event === "PASSWORD_RECOVERY") {
                // handle password recovery event
            } else if (event === "TOKEN_REFRESHED") {
                // handle token refreshed event
            } else if (event === "USER_UPDATED") {
                // handle user updated event
                setUser(session!.user);
            }
            setIsInitialized(true);
        });

        // Cleanup subscription on unmount
        return () => {
            data?.subscription.unsubscribe();
        };
    }, []);

    const value = { isInitialized, isLoggedIn, user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

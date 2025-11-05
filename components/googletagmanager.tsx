"use client";

import { initGoogleTagManager } from "@/lib/initGTM";

export const GoogleTagManager = () => {
    return (
        <script>
            <>{initGoogleTagManager()}</>
        </script>
    )
}
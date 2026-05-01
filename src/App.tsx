import { Suspense, lazy, useEffect } from "react";
import PublicApp from "./PublicApp";

const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));

export default function App() {
  useEffect(() => {
    const win = window as Window & {
      dataLayer?: Array<Record<string, unknown>>;
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    win.dataLayer = win.dataLayer || [];

    const loadGtm = () => {
      win.dataLayer?.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-KGLVZXQG";
      document.head.appendChild(script);
    };

    const scheduleLoad = () => {
      window.setTimeout(loadGtm, 1200);
    };

    if (win.requestIdleCallback && win.cancelIdleCallback) {
      const idleHandle = win.requestIdleCallback(scheduleLoad, {
        timeout: 3000,
      });

      return () => {
        win.cancelIdleCallback?.(idleHandle);
      };
    }

    const timeoutHandle = window.setTimeout(loadGtm, 1800);

    return () => {
      window.clearTimeout(timeoutHandle);
    };
  }, []);

  return (
    <>
      <PublicApp />
      <Suspense fallback={null}>
        <AdminRoutes />
      </Suspense>
    </>
  );
}

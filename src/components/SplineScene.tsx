import { useEffect, useState } from "react";

type HanaViewerElement = HTMLElement & {
  url?: string;
};

type SplineSceneProps = {
  className?: string;
};

const HANA_VIEWER_SCRIPT_ID = "hana-viewer-script";
const HANA_VIEWER_SCRIPT_SRC =
  "https://cdn.spline.design/@splinetool/hana-viewer@1.2.36/hana-viewer.js";

export default function SplineScene({ className = "" }: SplineSceneProps) {
  const [isViewerReady, setIsViewerReady] = useState(false);

  useEffect(() => {
    if (document.getElementById(HANA_VIEWER_SCRIPT_ID)) {
      setIsViewerReady(true);
      return;
    }

    const handleLoad = () => setIsViewerReady(true);
    const script = document.createElement("script");
    script.id = HANA_VIEWER_SCRIPT_ID;
    script.type = "module";
    script.src = HANA_VIEWER_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", handleLoad, { once: true });
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div
      className={`absolute top-0 -right-[5%] h-full w-full lg:w-[65%] z-10 ${className}`}
      aria-hidden="true"
    >
      {isViewerReady ? (
        <hana-viewer
          url="https://prod.spline.design/qX4LoQu5MgXiSwdT-czf/scene.hanacode"
          ref={(element) => {
            if (element) {
              (element as HanaViewerElement).url =
                "https://prod.spline.design/qX4LoQu5MgXiSwdT-czf/scene.hanacode";
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            cursor: "grab",
          }}
        />
      ) : null}
    </div>
  );
}

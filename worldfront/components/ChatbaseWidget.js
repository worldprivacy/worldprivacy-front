"use client"; // Important pour que ce composant soit exécuté côté client

import Script from "next/script";

export default function ChatbaseWidget() {
  return (
    <>
      <Script id="chatbase-init" strategy="afterInteractive">
        {`
          (function() {
              if (!window.chatbase || window.chatbase("getState") !== "initialized") {
                  window.chatbase = (...args) => {
                      if (!window.chatbase.q) {
                          window.chatbase.q = [];
                      }
                      window.chatbase.q.push(args);
                  };

                  window.chatbase = new Proxy(window.chatbase, {
                      get(target, prop) {
                          if (prop === "q") return target.q;
                          return (...args) => target(prop, ...args);
                      }
                  });
              }

              const onLoad = function() {
                  const script = document.createElement("script");
                  script.src = "https://www.chatbase.co/embed.min.js";
                  script.id = "k5oAkZ9Ty3-g90vGrF-nx";
                  script.domain = "www.chatbase.co";
                  document.body.appendChild(script);
              };

              if (document.readyState === "complete") {
                  onLoad();
              } else {
                  window.addEventListener("load", onLoad);
              }
          })();
        `}
      </Script>
    </>
  );
}

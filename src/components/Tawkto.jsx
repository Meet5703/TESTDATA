"use client";
import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/6621d735a0c6737bd12de73c/1hrq31af3";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);

    return () => {
      // Clean up script tag when component unmounts
      s1.parentNode.removeChild(s1);
    };
  }, []);

  return null;
};

export default TawkToChat;

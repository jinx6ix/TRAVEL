"use client";

import { useRef, useEffect, useState, forwardRef } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string; // placeholder image
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  ({ src, poster, autoPlay, ...props }, ref) => {
    const internalRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Merge external ref with internal ref
    const setRefs = (el: HTMLVideoElement | null) => {
      internalRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLVideoElement | null>).current = el;
    };

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.25 }
      );

      if (internalRef.current) observer.observe(internalRef.current);

      return () => {
        if (internalRef.current) observer.unobserve(internalRef.current);
      };
    }, []);

    // Play/pause based on visibility
    useEffect(() => {
      const video = internalRef.current;
      if (!video) return;

      if (isVisible && autoPlay !== false) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, [isVisible, autoPlay]);

    return (
      <div className="relative">
        {/* Poster image displayed until video is visible */}
        {!isVisible && poster && (
          <img
            src={poster}
            alt={props["aria-label"] || "Video preview"}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        )}

        <video
          ref={setRefs}
          src={src} // always keep the src
          muted
          loop
          playsInline
          className={`w-full h-auto object-cover absolute top-0 left-0 ${
            !isVisible ? "hidden" : "block"
          }`}
          {...props}
        />
      </div>
    );
  }
);

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;

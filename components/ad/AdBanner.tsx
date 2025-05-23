"use client";

import React, { useEffect } from "react";

type AdBannerTypes = {
  slot: string;
  width: number;
  height: number;
};

export const AdBanner = ({ slot, width, height }: AdBannerTypes) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className='w-full flex flex-col items-center justify-center my-2'>
      {/* <span className="text-xs opacity-50 tracking-widest">ADVERTISEMENT</span> */}
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: `${width}px`, height: `${height}px` }}
        data-ad-client="ca-pub-8577767299437650"
        data-ad-slot={slot}
      ></ins>
    </div>
  );
};
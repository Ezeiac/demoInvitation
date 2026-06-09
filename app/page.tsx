'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Invitation } from '@/src/components/Invitation';

export type ObjText = {
  sub: string | null;
  text: string | null;
}

export interface ArrayElements {
  sleep: boolean;
  church: boolean;
  guests: guestsObj[];
  comments: userCommentsType[];
  yani: ObjText;
  leo: ObjText;
  payment_coverage: number;
}

export type guestsObj = {
  id: number;
  name: string;
  lastname: string;
  state: string;
  room: number;
  confirm: boolean;
  transfer: boolean;
}

export interface userCommentsType {
  approbed: boolean,
  comment: string,
  created_at?: Date,
  id: number,
  public: boolean,
  slug: string,
  user: string,
}

export type dataInv = {
  data: ArrayElements,
  commentsData: userCommentsType[],
  isDesktop?: boolean | null,
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Home({
  data,
  commentsData
}: dataInv) {

  const [isSiteReady, setIsSiteReady] = useState(false)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const checkDimension = () => setIsDesktop(window.innerWidth >= 992)

    const handleLoad = () => {
      const timer = setTimeout(() => {
        setIsSiteReady(true);
      }, 3000);
      return timer;
    };

    let loadTimer: NodeJS.Timeout;

    checkDimension();
    window.addEventListener('resize', checkDimension);

    if (document.readyState === 'complete') {
      gsap.to(window, {
        scrollTo: 0,
        duration: 0.5,
        onComplete: () => {
          loadTimer = handleLoad();
        }
      });
    } else {
      const onWindowLoad = () => {
        loadTimer = handleLoad();
      };
      window.addEventListener('load', onWindowLoad);
    }

    return () => {
      window.removeEventListener('resize', checkDimension);
      window.removeEventListener('load', () => { });
      if (loadTimer) clearTimeout(loadTimer);
    };
  }, []);

  if (!data) {
    return (
      <div className='flex justify-items-center content-center items-center bg-[#111117]'>
        <div className='logo'></div>
      </div>
    )
  }

  return (
    <>
      <div className={`fixed inset-0 bg-[#111117] flex w-screen z-99 justify-center items-center ${isSiteReady && "hidden"}`}>
        <div className='logo'></div>
      </div>
      <Invitation
        data={data}
        commentsData={commentsData}
        isDesktop={isDesktop}
      />
    </>

  )
}

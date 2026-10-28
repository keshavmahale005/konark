import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { prefersReducedMotion } from '../../hooks/useInView';

/** Muted, looping hero background video. It loads only when it may play: data-saver
    skips it entirely, reduced motion shows its first frame without playing. */
export function useBackgroundVideo(){
  const ref=useRef<HTMLVideoElement>(null);
  const [available,setAvailable]=useState(false);
  const [playing,setPlaying]=useState(false);
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    const saveData=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData;
    if(saveData)return;
    setAvailable(true);
    node.muted=true;
    node.preload='auto';
    if(prefersReducedMotion()){node.load();return;}
    node.play().catch(()=>setPlaying(false));
  },[]);
  const toggle=useCallback(()=>{
    const node=ref.current;
    if(!node)return;
    if(node.paused)node.play().catch(()=>setPlaying(false));
    else node.pause();
  },[]);
  const videoProps={
    ref,muted:true,loop:true,playsInline:true,preload:'none' as const,
    onLoadedData:()=>setReady(true),onPlay:()=>setPlaying(true),onPause:()=>setPlaying(false)
  };
  return {videoProps,available,playing,ready,toggle};
}

export function VideoToggle({className,playing,onToggle}:{className:string;playing:boolean;onToggle:()=>void}){
  return <button className={className} type="button" onClick={onToggle} aria-label={playing?'Pause background video':'Play background video'}>
    {playing?<Pause size={14} aria-hidden="true"/>:<Play size={14} aria-hidden="true"/>}<span aria-hidden="true">{playing?'PAUSE':'PLAY'}</span>
  </button>;
}

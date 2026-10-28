import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Copies a contact detail to the clipboard. Hidden where the Clipboard API is unavailable; the link beside it still works. */
export default function CopyButton({value,what}:{value:string;what:string}){
  const [copied,setCopied]=useState(false);
  const timer=useRef(0);
  useEffect(()=>()=>window.clearTimeout(timer.current),[]);
  if(typeof navigator==='undefined'||!navigator.clipboard)return null;
  async function copy(){
    try{
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current=window.setTimeout(()=>setCopied(false),1800);
    }catch{/* Clipboard permission refused: nothing to undo. */}
  }
  return <>
    <button className={`ct-copy${copied?' is-copied':''}`} type="button" onClick={copy} aria-label={`Copy ${what}`}>
      <span className="ct-copy__icons" aria-hidden="true"><Copy size={15}/><Check size={15}/></span>
      <span className="ct-copy__text" aria-hidden="true">{copied?'Copied':'Copy'}</span>
    </button>
    <span className="ct-sr" role="status">{copied?`${what} copied`:''}</span>
  </>;
}

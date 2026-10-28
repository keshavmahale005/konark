import { createElement, type ReactNode } from 'react';

export const pad=(n:number)=>String(n).padStart(2,'0');

export const matchesQuery=(query:string,...texts:string[])=>{
  const q=query.trim().toLowerCase();
  return !q||texts.some(text=>text.toLowerCase().includes(q));
};

// Wraps the first occurrence of the query in <mark>; returns the text untouched when there is no match.
export function highlight(text:string,query:string):ReactNode{
  const q=query.trim(),i=q?text.toLowerCase().indexOf(q.toLowerCase()):-1;
  if(i<0)return text;
  return [text.slice(0,i),createElement('mark',{key:'match'},text.slice(i,i+q.length)),text.slice(i+q.length)];
}

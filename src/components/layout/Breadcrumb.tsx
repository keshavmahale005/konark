export default function Breadcrumb({items}:{items:[string,string?][]}){
  return <nav className="breadcrumb" aria-label="Breadcrumb">
    <ol>{items.map(([label,href],i)=><li key={label}>{href&&i<items.length-1?<a href={href}>{label}</a>:<span aria-current="page">{label}</span>}</li>)}</ol>
  </nav>;
}

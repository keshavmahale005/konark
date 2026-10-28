import RevealGroup from '../common/RevealGroup';
import { manufacturingGallery } from '../../data/manufacturingGallery';
export default function ManufacturingGallery(){return <RevealGroup className="manufacturing-gallery">{manufacturingGallery.map((item,i)=><figure key={item.image}><img src={item.image} alt={`${item.title} — R&D Therm manufacturing`} loading="lazy"/><figcaption><span>{String(i+1).padStart(2,'0')}</span>{item.title}</figcaption></figure>)}</RevealGroup>}

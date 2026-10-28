import { InCTA, InHero, InSectors } from '../../components/industries/InSections';
import '../../styles/kit.css';
import '../../styles/industries.css';

export default function Industries(){
  return <div className="kit-page in-page">
    <InHero/>
    <InSectors/>
    <InCTA/>
  </div>;
}

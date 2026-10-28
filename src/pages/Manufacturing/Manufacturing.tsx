import MfHero from '../../components/manufacturing/MfHero';
import { MfIntro, MfWhy } from '../../components/manufacturing/MfStory';
import { MfFacility, MfQuality } from '../../components/manufacturing/MfFacility';
import { MfCapabilities, MfCTA, MfMaterials, MfTrack } from '../../components/manufacturing/MfWorks';
import '../../styles/kit.css';
import '../../styles/manufacturing.css';

export default function Manufacturing(){
  return <div className="kit-page mf-page">
    <MfHero/>
    <MfIntro/>
    <MfWhy/>
    <MfFacility/>
    <MfQuality/>
    <MfCapabilities/>
    <MfMaterials/>
    <MfTrack/>
    <MfCTA/>
  </div>;
}

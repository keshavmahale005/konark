import GlHero from '../../components/gallery/GlHero';
import GlWall from '../../components/gallery/GlWall';
import GlCTA from '../../components/gallery/GlCTA';
import '../../styles/kit.css';
import '../../styles/gallery.css';

export default function Gallery(){
  return <div className="kit-page gl-page">
    <GlHero/>
    <GlWall/>
    <GlCTA/>
  </div>;
}

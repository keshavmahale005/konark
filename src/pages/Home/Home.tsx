import HeroSection from '../../components/home/HeroSection';
import PartnersSection from '../../components/home/PartnersSection';
import AboutSection from '../../components/home/AboutSection';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import IndustriesSection from '../../components/home/IndustriesSection';
import CompanyCards from '../../components/home/CompanyCards';
import ProjectsSection from '../../components/home/ProjectsSection';
import Testimonials from '../../components/home/Testimonials';
import ContactCTA from '../../components/home/ContactCTA';
import '../../styles/home.css';

export default function Home(){
  return <div className="home-page">
    <HeroSection/>
    <PartnersSection/>
    <AboutSection/>
    <WhyChooseUs/>
    <IndustriesSection/>
    <CompanyCards/>
    <ProjectsSection/>
    <Testimonials/>
    <ContactCTA/>
  </div>;
}

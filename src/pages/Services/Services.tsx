import ServicesHero from '../../components/services/ServicesHero';
import ServiceCatalogue from '../../components/services/ServiceCatalogue';
import ServiceEquipment from '../../components/services/ServiceEquipment';
import ServiceCompetencies from '../../components/services/ServiceCompetencies';
import ServicesCTA from '../../components/services/ServicesCTA';
import '../../styles/services.css';

export default function Services(){
  return <div className="services-page">
    <ServicesHero/>
    <ServiceCatalogue/>
    <ServiceEquipment/>
    <ServiceCompetencies/>
    <ServicesCTA/>
  </div>;
}

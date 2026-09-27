import { InfoCard } from "../InfoCard/InfoCard";
import { Attractions } from "../Attractions/Attractions";
import './IpInfo.css';

export function IpInfo({ locationInfo, attractions, setPosition, activeFilter, setActiveFilter, setMapZoom, showAllAttractions,  setShowAllAttractions }) {

  if (!locationInfo) {
    return null;
  }

  return (
    <section className="ip-info">

      <div className="card-container">

        <InfoCard
          locationInfo={locationInfo}
        />

        <Attractions
          attractions={attractions}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setPosition={setPosition}
          setMapZoom={setMapZoom}
          showAllAttractions={showAllAttractions}
          setShowAllAttractions={setShowAllAttractions}
        />

      </div>
    </section >
  );
}
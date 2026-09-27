import { useState } from "react";
import './Attractions.css';

export function Attractions({ attractions, showAllAttractions, setShowAllAttractions, activeFilter, setActiveFilter, setPosition, setMapZoom }) {
  const [showAttractions, setShowAttractions] = useState(false);

  function getAttractionCategory(categories) {
    if (categories.some(category => category.includes('all'))) {
      return 'All';
    }
    if (categories.some(category => category.includes('park'))) {
      return 'Parks';
    }
    if (categories.some(category => category.includes('museum'))) {
      return 'Museums';
    }
    if (categories.some(category => category.includes('attraction'))) {
      return 'Attractions';
    }
    if (categories.some(category => category.includes('landmarks'))) {
      return 'Landmarks';
    }

    return 'More';
  }

  const filteredAttractions =
    activeFilter === 'All'
      ? attractions
      : attractions.filter((attraction) => {
        const category = getAttractionCategory(attraction.properties.categories);

        return category === activeFilter;
      });

  const displayedAttractions = showAllAttractions
    ? filteredAttractions
    : filteredAttractions.slice(0, 2);


  return (
    <>
      <div className="attractions">
        <div className="attractions-container">
          <img src='/images/icon-attractions.png' />

          <div className="attractions-container-text">
            <p>Nearby Attractions</p>
            <small>{attractions.length} places found</small>
          </div>

          <button
            className='attractions-button'
            onClick={() => setShowAttractions(true)}
          >
            →
          </button>
        </div>
      </div>


      {showAttractions && (
        <div className="attractions-panel">
          <div className="attractions-panel-header">
            <img src='/images/icon-attractions.png' />

            <div className="attractions-text">
              <h2>Nearby Attractions</h2>
              <p>Explore popular places around your location</p>
            </div>

            <button
              onClick={() => setShowAttractions(false)}
            >
              Close  ×
            </button>
          </div>

          <div className="attraction-filters">
            <button
              className={activeFilter === 'All' ? 'active' : ''}
              onClick={() => { setActiveFilter('All') }}>
              All
            </button>

            <button
              className={activeFilter === 'Attractions' ? 'active' : ''}
              onClick={() => setActiveFilter('Attractions')}>
              Attractions
            </button>

            <button
              className={activeFilter === 'Museums' ? 'active' : ''}
              onClick={() => setActiveFilter('Museums')}>
              Museums
            </button>

            <button
              className={activeFilter === 'Parks' ? 'active' : ''}
              onClick={() => setActiveFilter('Parks')}>
              Parks
            </button>

            <button
              className={activeFilter === 'Landmarks' ? 'active' : ''}
              onClick={() => setActiveFilter('Landmarks')}>
              Landmarks
            </button>

            <button
              className={activeFilter === 'More' ? 'active' : ''}
              onClick={() => setActiveFilter('More')}>
              More
            </button>
          </div>



          <div className="attractions-grid">
            {displayedAttractions.map((attraction) => {
              const place = attraction.properties;
              console.log(place.name);
              const category = getAttractionCategory(place.categories);

              return (
                <div className="attractions-card" key={place.place_id}>
                  <img src={place.wiki_and_media?.image || '/images/icon-attractions.png'} />
                  <h3>{place.name}</h3>
                  <p>{category}</p>
                  <span>📍  {place.distance < 1000
                    ? `${Math.round(place.distance)} m`
                    : `${(place.distance / 1000).toFixed(1)} km`}</span>

                  <button
                    onClick={() => {
                      setPosition([place.lat, place.lon]);
                      setShowAttractions(false);
                      setMapZoom(18);
                    }}
                  >
                    View on map  →
                  </button>
                </div>
              );
            })}
          </div>

          <button
            className="view-all-button"
            onClick={() => { setShowAllAttractions(!showAllAttractions) }}
          >
            {showAllAttractions
              ? 'Show Less  ↑'
              : ' View all attractions  →'
            }
          </button>
        </div>
      )}

    </>
  );
}
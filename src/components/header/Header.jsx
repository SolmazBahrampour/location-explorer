import './Header.css';

export function Header({ inputText, setInputText, search }) {

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function keyEvevnt(event) {
    if(event.key === 'Enter') {
      search();
    }
  }

  return (
    <div className='header'>
      <div className="title">
        <img src='/images/icon-location-blue.png' />
        <div className="title-text">
          <h2>Location  Explore</h2>
          <p>Discover places, weather and more</p>
        </div>
      </div>

      <div className='textbox'>
        <input
          placeholder='Search an IP address, domain or location'
          onChange={saveInputText}
          onKeyDown={keyEvevnt}
          value={inputText}
        />
        <button onClick={search}>
          <img src='/images/icon-arrow.svg' />
        </button>
      </div>
    </div>
  );
}
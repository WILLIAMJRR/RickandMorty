import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
// import getRandomlocation from "./utils/getRamdonlocation";
import LocationInfo from "./components/LocationInfo";
import ResindentInfo from "./components/ResindentInfo";
import videoRaM from "./video/rickmorty.mp4";
import imgError from "./img/3c860ac7a4e88f0de467f381c8566c43.jpg";
import imgLoading from "./img/bannersppinof.gif";
import Character from "./components/Character";

function App() {
  const [location, setlocation] = useState();
  const [currentLocation, setcurrentLocation] = useState("");
  const [allLocation, setAllLocation] = useState();
  const [haserror, sethaserror] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [enteredWord, setEnteredWord] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationMatch, setLocationMatch] = useState([0]);

  const getCharacterLocation = () => {
    const url =
      currentLocation === ""
        ? `https://rickandmortyapi.com/api/character/?page=${page}`
        : `https://rickandmortyapi.com/api/location/${currentLocation}`;

    axios
      .get(url)
      .then((res) => {
        const data =
          currentLocation === ""
            ? setAllLocation(res.data.results)
            : setlocation(res.data);
        sethaserror(false);
        // setIsShow(false);
      })
      .catch((err) => {
        console.log(err);
        sethaserror(true);
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 3000)
      );
  };
  const loadLocations = async () => {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/location"
    );
    setLocations(response.data.results);
  };

  useEffect(() => {
    getCharacterLocation();
    loadLocations();
  }, [currentLocation, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setcurrentLocation(e.target.inputLocation.value.trim().toLowerCase());
    searchLocations();
    inputLocation.value = "";
  };

  const handleOnchange = (e) => {
    e.preventDefault();
    searchLocations(e.target.value);
  };

  const onPreviusPage = () => {
    if (page - 1 >= 1) {
      setpage((page) => page - 1);
    }
  };
  const onNextPage = () => {
    if (page <= allLocation.length) {
      setpage((page) => page + 1);
    }
  };

  const searchLocations = (text) => {
    if (!text) {
      setLocationMatch([]);
    } else {
      let matches = locations.filter((location) => {
        const regex = new RegExp(`${text}`);
        return location.name.match(regex);
      });
      setLocationMatch(matches);
    }
  };

  return (
    <div className="app">
      {loading ? (
        <div className="app_loading">
          <div className="app_rotate">
            <img className="app_img" src={imgLoading} alt="loading" />
          </div>
          <div className="app_name">
            <h2>Loading...</h2>
          </div>
        </div>
      ) : (
        <>
          <header className="app_header"></header>
          <div className="container">
            <form className="form" onSubmit={handleSubmit}>
              <video className="app_video" autoPlay loop muted>
                <source src={videoRaM} />
              </video>
              <div className="form_img">
                <div className="app_input">
                  <input
                    className="form__input"
                    id="inputLocation"
                    //value={enteredWord}
                    onChange={handleOnchange}
                    type="text"
                    placeholder="Universe number"
                    autoComplete="off"
                  />

                  <button className="form__btn">Search</button>
                </div>
              </div>
            </form>
          </div>
          <div className="results__container">
            <ul>
              {locationMatch &&
                locationMatch.map((item, index) => (
                  <div className="location__option" key={index}>
                    <p
                      className="sugerency"
                      onClick={() => {
                        setcurrentLocation(item.id);
                        setLocationMatch([]);
                        setEnteredWord(item.name);
                        inputLocation.value = "";
                      }}
                    >
                      {item.name} {item.id}
                    </p>
                  </div>
                ))}
            </ul>
          </div>
          <div className="app_container">
            {haserror ? (
              <div className="container_error">
                <img className="img_error" src={imgError} alt="" />
                <h2 className="app__error">
                  {" "}
                  ❌ Hey! you must provide an id from 1 to 126
                </h2>
              </div>
            ) : (
              <>
                <LocationInfo location={location} />
                {currentLocation === "" ? (
                  <div>
                    <div className="character_container ">
                      {allLocation?.map((url) => (
                        <Character key={url.id} url={url} />
                      ))}
                    </div>
                    <nav
                      className="container__btn"
                      role="navigation"
                      aria-label="pagination"
                    >
                      <button
                        className={`btn__previous ${
                          page === 1 ? "btn__opacity" : "0"
                        }`}
                        onClick={onPreviusPage}
                      >
                        Previous
                      </button>
                      <button
                        className={`btn__next ${
                          page === allLocation.length + 1 ? "btn__opacity" : "0"
                        }`}
                        onClick={onNextPage}
                      >
                        Next page
                      </button>
                    </nav>
                  </div>
                ) : (
                  <div className="residents_container ">
                    {location?.residents.map((url) => (
                      <ResindentInfo key={url} url={url} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

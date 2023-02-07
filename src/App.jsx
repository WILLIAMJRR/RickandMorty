import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import getRandomlocation from './utils/getRamdonlocation';
import LocationInfo from './components/LocationInfo';
import ResindentInfo from './components/ResindentInfo';
import videoRaM from './video/rickmorty.mp4';
import imgError from './img/3c860ac7a4e88f0de467f381c8566c43.jpg';
import imgLoading from './img/bannersppinof.gif';

function App() {
    const [location, setlocation] = useState();
    const [numberLocation, setNumberLocation] = useState(getRandomlocation());
    const [haserror, sethaserror] = useState(false);
    const [listLocation, setListLocation] = useState();
    const [loading, setLoading] = useState(true);
    // const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const url = `https://rickandmortyapi.com/api/location/${numberLocation}`;

        axios
            .get(url)
            .then((res) => {
                setlocation(res.data);
                sethaserror(false);
                // setIsShow(false);
            })
            .catch((err) => {
                console.log(err);
                sethaserror(true);
            })
             .finally(() => setTimeout(()=>{
                setLoading(false);
            },3000));
             }, [numberLocation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.inputLocation.value.trim().length === 0) {
            setNumberLocation(getRandomlocation());
        } else {
            setNumberLocation(e.target.inputLocation.value.trim());
        }
        e.target.inputLocation.value = e.target.inputLocation.value.trim();
    };

    // const handleChange = (e) => {
    //     const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`;
    //     console.log(url);
    //     axios
    //         .get(url)
    //         .then((res) => setListLocation(res.data.results)) //.map(loc => loc.name)))
    //         .catch((error) => console.log(error));
    //     setIsShow(true);
    // };

    // const handleFocus = (e) => {
    //     e.target.value = listLocation;
    // };

    return (
        <div className='app'>
            {loading ? (
                <div className='app_loading'>
                    <div className='app_rotate'>
                        <img
                            className='app_img'
                            src={imgLoading}
                            alt='loading'
                        />
                    </div>
                    <div className='app_name'>
                        <h2>Loading...</h2>
                    </div>
                </div>
            ) : (
                <>
                    <header className='app_header'></header>
                    <div className='container'>
                        <form className='form' onSubmit={handleSubmit}>
                            <video className='app_video' autoPlay loop muted>
                                <source src={videoRaM} />
                            </video>
                            <div className='form_img'>
                                <div className='app_input'>
                                    <input
                                        className='form__input'
                                        id='inputLocation'
                                        type='text'
                                        placeholder='Universe number'
                                    />

                                    <button className='form__btn'>
                                        Search
                                    </button>
                                </div>
                            </div>
                            {/* <ul>
                                {listLocation?.map((loc) => (
                                    <li
                                        key={loc.id}
                                        onClick={() =>
                                            setNumberLocation(loc.id)
                                        }
                                    >
                                        {loc.name}
                                    </li>
                                ))}
                            </ul> */}
                        </form>
                    </div>
                    <div className='app_container'>
                        {haserror ? (
                            <div className='container_error'>
                                <img
                                    className='img_error'
                                    src={imgError}
                                    alt=''
                                />
                                <h2 className='app__error'>
                                    {' '}
                                    ❌ Hey! you must provide an id from 1 to 126
                                </h2>
                            </div>
                        ) : (
                            <>
                                <LocationInfo location={location} />
                                <div className='residents_container'>
                                    {location?.residents.map((url) => (
                                        <ResindentInfo key={url} url={url} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;

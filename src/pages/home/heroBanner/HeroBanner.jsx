import React, { useEffect, useState } from 'react';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFatch';
import { useSelector } from 'react-redux';
import Img from "../../../components/lazyLoadImage/Img";
import ContantWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const updateBackgroundImage = () => {
            const randomIndex = Math.floor(Math.random() * 20);
            const bg = url.backdrop + data?.results?.[randomIndex]?.backdrop_path;
            setBackground(bg);
        };

        updateBackgroundImage();

        const interval = setInterval(updateBackgroundImage, 3000); 

        return () => {
            clearInterval(interval);
        };
    }, [data, url]);

    const [query, setQuery] = useState("");

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }

    return (
        <div className='heroBanner'>
            {!loading && <div className="backdrop-img">
                <Img src={background} />
            </div>}
            <div className="opacity-layer"></div>
            <ContantWrapper>
                <div className="heroBannerContent">
                    <span className="title">
                        Welcome
                    </span>
                    <span className="subTitle">
                        Millions of movies, TV shows, and people to discover. Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search for movies'
                            onKeyUp={searchQueryHandler}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContantWrapper>
        </div>
    )
}

export default HeroBanner;

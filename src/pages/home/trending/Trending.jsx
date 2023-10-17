import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFatch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {

    const [endPoint, setEndPoint] = useState("day")
    const {data, loading} = useFetch(`/trending/movie/${endPoint}`)

const onTabChange =(tab) => {
    setEndPoint(tab === "day" ? "day" : "week")
}
    
  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle">
            Trending
        </span>
        <SwitchTabs data={["day", "week"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending

import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import userEvent from '@testing-library/user-event';



const News=(props)=> {
 
 const capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase()+string.slice(1);
 }
 const [articles,setArticles]=useState([])
 const [loading,setLoading]=useState(true);
 const [page,setPage]=useState(1)
 const [totalResults,setTotalResults]=useState(0)
 

    
    
  
 
  const updateNews=async()=> {
  
  props.setProgress(10)
  const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page}&pageSize=${props.pageSize}`
  setLoading(true)
  
  let data= await fetch(url);
  props.setProgress(50)
  let parsedData= await data.json()
  props.setProgress(70)
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)
  
  
  props.setProgress(100)
}
useEffect(()=>{
  document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`
  updateNews();
},[])
  
  
  
  
  const handlePrevClick=async()=> {
    
    setPage(page-1)
    updateNews();
  }
  const handleNextClick=async()=> {
    setPage(page+1)
    
    updateNews();
    
  
  

  }
  

  const fetchMoreData=async ()=> {
   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    // setState({loading:true});
    
    let data= await fetch(url);
    let parsedData= await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    
  }
    
    
       
    return (
      //  <div className="container my-3">
      <>
        <h1 className="text-center" style={{margin:'50px'}}>NewsMonkey-Top {capitalizeFirstLetter(props.category)} Headlines.</h1>
        {/* {loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults && articles.length+1!==totalResults}
          loader={<Spinner />}
          
        >
          <div className="container">
        <div className="row">
        {articles.map((element)=> {
        return <div className="col-md-4" key={element.url}>
        <NewsItem title={(element.title?element.title:"Title not found").slice(0,45)} description={(element.description?element.description:"Description not found").slice(0,88)} imageUrl={element.urlToImage?element.urlToImage:"https://morethanjustparks.com/wp-content/uploads/2021/10/DJI_0546.jpg"} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
       </div>
         
      })}
    </div>
    </div>
      </InfiniteScroll>
      {/* <div className=" d-flex justify-content-between">
      <button type="button" disabled={page<=1}  className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
      <button type="button" disabled={page+1>Math.ceil(totalResults/props.pageSize)}className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div> */}
      

        
        
        
        
      </>
      
    )
    
    }


export default News

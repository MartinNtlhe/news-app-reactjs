import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import alertify from "alertifyjs";
import Section from '../../../hoc/Section';
import Loader from 'react-loader-spinner';

const Articles = () => {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const forceUpdate = useCallback(() => ({}), []);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const handleArticleDataStructure = (data) => {
    data.sort((a,b) => (b.updated > a.updated) ? 1 : ((a.updated > b.updated) ? -1 : 0))  
    articles.splice(0, articles.length);
    for(var i = 0; i < data.length; i++){
      const article = data[i];      
      var searchKeys;
      const pictureUri = [];
      const date = new Date(article.updated);      
      if(article.media !== undefined && article.media !== null){
        if(article.media.length > 0){
          const media = article.media[0];
          if(media["media-metadata"] !== undefined && media["media-metadata"] !== null){
            if(media["media-metadata"].length > 0){
              const mediaData = media["media-metadata"];
              pictureUri.push(mediaData[mediaData.length-1].url);
            }
          }
        }
      }
      
      if(article.adx_keywords !== undefined && article.adx_keywords !== null){
        if(article.adx_keywords.length > 0){
          searchKeys = article.adx_keywords.split(",");
        }
      }
      articles.push({
        title: article.title,
        abstract: article.abstract,
        date: days[ date.getDay() ].substring(0, 3) + ", " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear(),
        author: article.byline,
        metadata: pictureUri[0],
        searchKeys: searchKeys,
        url: article.url
      });      
    }
    setArticles([...articles]);
    setLoading(false)
    forceUpdate();
  }

  useEffect(() => {
    axios.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=rOBWnkHZ6E8tEc21vxJkJVJPlPnrb0Y7').then( (res) => {
      if(res){  
        switch (res.status) {
          case 200:
            setCopyright(res.data.copyright);
            handleArticleDataStructure(res.data.results);
            break;
          case 401:
            alertify.error("Unauthorized request");
            break;
          case 404:
            alertify.error("No articles found");
            break;
          case 429:
            alertify.error("Too many requests.");
            break;
          case 500:
            alertify.error("Server broken");
            break;
          default:
            alertify.error("Unknown error");
            break;
        }
      }
    }).catch(function (error) {
      alertify.error(error);
    });	
  }, [handleArticleDataStructure]);

  return (
    loading ?
      <div id="loadHolder"
        style={{
          opacity: 0.9, backgroundColor:'#ccc',
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" key="loader"/>
      </div>
    :
      <Section id='blog'>
        <div className='container pt-2 pb-5'>
          <div className='section-content'>
            <div className='row'>
            { articles.length > 0 ? (
              articles.map((data, index) => (
                <div className='col-lg-4 mb-3'>
                  <div className='card rounded-0'>
                    <img src={data.metadata.length > 0 ? data.metadata : ""} className='card-img-top' alt='Blog 1' />
                    <div className='card-author'>
                      {data?.author}
                    </div>
                    <div className='card-date'>
                      {data?.date}
                    </div>
                    <div className='card-body'>
                      <h5 className='card-title'>{data?.title}</h5>
                      <p className='card-abstract'>{data?.abstract}</p>
                      <a href="#" className='btn btn-sm btn-primary' onClick={() => window.open(data.url, "_blank")}>
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-lg-4 mb-3'>
                <div className='card rounded-0'>
                  <div className='card-body'>
                    <h5 className='card-title'>No data to show</h5></div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </Section>
  );
};

export default Articles;

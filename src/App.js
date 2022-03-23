import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
import Gallery from "react-grid-gallery";
import InfinitScroll from 'react-infinite-scroll-component'

export default function App() {
  const [galleryData, setGalleryData] = useState([]);
  const [hasMore, SetHasMore] = useState(false);
  const [pageNumber, SetPageNumber] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=11903245-c6f2294b80d77d1fd7402ea4e&q=yellow+flowers&image_type=photo&page=${pageNumber}&per_page=50`
      )
      .then(function (response) {
        // handle success
        console.log(response);
        const IMAGES = [];
       

        response.data.hits.map((imageDetail) => {
          let imageData = {
            src: imageDetail.largeImageURL,
            thumbnail: imageDetail.previewURL,
            thumbnailWidth: 320,
            thumbnailHeight: 174,
            isSelected: false,
            caption: imageDetail.tags
          };
          IMAGES.push(imageData);
        });
        setGalleryData(IMAGES);
        if (  galleryData.length<response.data.totalHits) {
          SetPageNumber(pageNumber+1);
          SetHasMore(true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const loadFunc = () => {
    axios
      .get(
        `https://pixabay.com/api/?key=11903245-c6f2294b80d77d1fd7402ea4e&q=yellow+flowers&image_type=photo&page=${pageNumber}`
      )
      .then(function (response) {
        // handle success
        console.log(response);
        const IMAGES = [];
       

        response.data.hits.map((imageDetail) => {
          let imageData = {
            src: imageDetail.largeImageURL,
            thumbnail: imageDetail.previewURL,
            thumbnailWidth: 320,
            thumbnailHeight: 174,
            isSelected: false,
            caption: imageDetail.tags
          };
          IMAGES.push(imageData);
        });
        if (  galleryData.length<response.data.totalHits) {
          SetPageNumber(pageNumber+1);
          SetHasMore(true);
        }
        const children = galleryData.concat(IMAGES);
        setGalleryData(children);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <InfiniteScroll
        pageStart={pageNumber}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <Gallery images={galleryData} />
        {galleryData.map((image) => {
          console.log("imageData", image);
          return (
            <>
              <img src={image.thumbnail} />
            </>
          );
        })}
      </InfiniteScroll> */}

<InfinitScroll
        dataLength = {galleryData.length}
        next = {loadFunc}
        hasMore = {true}
        loader={<h4>Loading ... </h4>}
      >
                <Gallery images={galleryData} />

{/* {galleryData.map((image) => {
          console.log("imageData", image);
          return (
            <>
              <img src={image.thumbnail} />
            </>
          );
        })} */}
</InfinitScroll>
    </div>
  );
}

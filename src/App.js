import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
import Gallery from "react-grid-gallery";
import InfinitScroll from "react-infinite-scroll-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export default function App() {
  const [galleryData, setGalleryData] = useState([]);
  const [hasMore, SetHasMore] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, SetPageNumber] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=11903245-c6f2294b80d77d1fd7402ea4e&q=${
          searchValue || "Cars"
        }&image_type=photo&page=${pageNumber}&per_page=50`
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
            caption: imageDetail.tags,
          };
          IMAGES.push(imageData);
        });
        setGalleryData(IMAGES);
        if (galleryData.length < response.data.totalHits) {
          SetPageNumber(pageNumber + 1);
          SetHasMore(true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const loadFunc = (flag) => {
    if (flag) {
      SetPageNumber(1);
    }
    axios
      .get(
        `https://pixabay.com/api/?key=11903245-c6f2294b80d77d1fd7402ea4e&q=${
          searchValue || "Cars"
        }&image_type=photo&page=${pageNumber}`
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
            caption: imageDetail.tags,
          };
          IMAGES.push(imageData);
        });
        if (galleryData.length < response.data.totalHits) {
          SetPageNumber(pageNumber + 1);
          SetHasMore(true);
        }
        let children = [];
        if (!flag) {
          children = galleryData.concat(IMAGES);
          setGalleryData(children);
        } else {
          setGalleryData(IMAGES);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div className="App">
      <div class="sidebar">
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search Images"
          aria-label="Search Images"
          aria-describedby="basic-addon2"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => loadFunc(true)}
        >
          Search
        </Button>
      </InputGroup>

      <InfinitScroll
        dataLength={galleryData.length}
        next={loadFunc}
        hasMore={true}
        loader={<h4>Loading ... </h4>}
      >
        <Gallery images={galleryData} />
      </InfinitScroll>
    </div>
  );
}

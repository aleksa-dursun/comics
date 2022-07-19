import {Gallery, Item} from "react-photoswipe-gallery";
import {photoSlide} from "../public/comic-data";
import {useEffect, useRef, useState} from "react";
import {ItemSlide} from "./ItemSlide";

export const CustomGallery = props => {

  const [gallery, setGallery] = useState();
  const [step, setStep] = useState(0);
  const galeryRef = useRef();
  const onBeforeOpen = (instance) => {
    setGallery(instance);
    console.log(instance)
  }
  console.log(gallery, 'fuck');
  const transitionTo = (step) => {
    console.log(galeryRef.current)
    // gallery.currSlide.zoomTo(
    //   step.zoom, // slide zoom level, 1 - original image size
    //   {x: step.x, y: step.y}, // zoom center point
    //   2000, // transition duration, can be 0
    //   true // wether pan/zoom bounds should be ignored
    // );
  }

  return (
    <Gallery ref={galeryRef} onOpen={onBeforeOpen} options={{clickToCloseNonZoomable: false}}>
      {photoSlide.pages.map((page, index) => (
        <Item
          key={index}
          content={<ItemSlide page={page} onClick={() => transitionTo(page.steps[0])}/>}
          original={page.imageUrl}
          thumbnail={page.imageUrl}
          width="1165"
          height="734"
        >
          {({ref, open}) => (
            <img ref={ref} onClick={open} src={page.imageUrl}/>
          )}
        </Item>
      ))}
    </Gallery>
  );
};
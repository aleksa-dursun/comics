import {Gallery, Item} from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import {girlsNight, livingDress, photoSlide} from "../public/comic-data";
import {useState} from "react";
import {CustomGallery} from "../components/CustomGallery";
import SimpleGallery from "../components/SimpleGallery";

export default function livingdress() {
  return (
    <>
      <SimpleGallery comic={livingDress}/>
    </>
  );
}
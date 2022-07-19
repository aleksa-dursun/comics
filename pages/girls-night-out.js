import SimpleGallery from "../components/SimpleGallery";
import {girlsNight} from "../public/comic-data";

export default function girlsNightOut(props) {
  return (
    <>
      <SimpleGallery comic={girlsNight}/>
    </>
  );
};
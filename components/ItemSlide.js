import {useRef} from "react";

export const ItemSlide = ({page, onClick}) => {
  console.log(page, onClick);
  return (
    <img onClick={onClick} src={page.imageUrl}/>
  );
};
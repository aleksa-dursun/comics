import styles from '../styles/ComicPage.module.scss';
import React, {useEffect, useRef, useState} from "react";
import {comic} from "../public/comic-data";

export const Comic = props => {
  const [activeSlide, setActiveSlide] = useState(0);
  const comicRef = React.createRef();
  const prevCountRef = useRef();

  useEffect(() => {
    resetClasses();
    comicRef.current.children[activeSlide].className = `${styles['active-slide']} `;
    if (prevCountRef.current < activeSlide) {
      animateNext();
    } else if (prevCountRef.current > activeSlide) {
      animatePrev();
    }
    prevCountRef.current = activeSlide;
  }, [activeSlide]);

  const resetClasses = () => {
    console.log(comicRef.current.children[activeSlide].offsetHeight);
    comicRef.current.style.height = `${comicRef.current.children[activeSlide].offsetHeight}px`;
    for (let i = 0; i < comicRef.current.children.length; i++) {
      comicRef.current.children[activeSlide].className = '';
    }
  }

  const animateNext = () => {
    comicRef.current.children[activeSlide].className += styles[comic.pages[activeSlide - 1].next];
    if (comicRef.current.children[activeSlide - 1]) {
      comicRef.current.children[activeSlide - 1].className += styles[comic.pages[activeSlide - 1].direction];
    }
  }

  const animatePrev = () => {
    comicRef.current.children[activeSlide].className += styles[`${comic.pages[activeSlide].direction}-reverse`];
    if (comicRef.current.children[activeSlide + 1]) {
      comicRef.current.children[activeSlide + 1].className += styles[comic.pages[activeSlide].previous];
    }
  }

  const goToNextSlide = () => {
    if (activeSlide < comic.pages.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  }

  const goToPreviousSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  }

  return (
    <>
      <button className={styles.buttons} onClick={goToPreviousSlide}>
        back
      </button>

      <div className={styles.wrapper} ref={comicRef}>
        {comic.pages.map((page, index) => (
          <img key={`${page.imageUrl}-${index}`} style={{'z-index': (comic.pages.length - index).toString()}} className={index === activeSlide ? styles.activeSlide : ''}
               src={page.imageUrl}/>
        ))}
      </div>

      <button className={styles.buttons} onClick={goToNextSlide}>
        Next
      </button>
    </>
  );
};
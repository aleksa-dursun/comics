import React, {useEffect} from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import styles from '../styles/SimpleGallery.module.scss';
import useNavigationEvents from "../hooks/useNavigationEvents";
import useFullscreenApi from "../hooks/useFullscreenApi";

let stepIndex = 0;
let pageIndex = 0;

export default function SimpleGallery(props) {
  const comic = props.comic;
  const navigation = useNavigationEvents();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fullScreenApi = useFullscreenApi();
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      clickToCloseNonZoomable: false,
      // Add function that returns promise
      openPromise: fullScreenApi.getFullscreenPromise,

      // Append PhotoSwipe to our container
      appendToEl: fullScreenApi.fullscreenAPI ? fullScreenApi.pswpContainer : document.body,

      // disable opening/closing animations
      showAnimationDuration: 0,
      hideAnimationDuration: 0,

      // setup PhotoSwipe Core dynamic import
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();
    lightbox.on('close', () => {
      fullScreenApi.pswpContainer.style.display = 'none';
      if (fullScreenApi.fullscreenAPI && fullScreenApi.fullscreenAPI.isFullscreen()) {
        fullScreenApi.fullscreenAPI.exit();
      }
    });
    lightbox.on('change', () => {
      pageIndex = lightbox.pswp.currIndex;
      stepIndex = 0;
    });
    navigation.onNextStep(() => goToNextStep(lightbox));

    return () => {
      lightbox.destroy();
      navigation.clearListeners();
      lightbox = null;
    };
  }, []);

  const zoomTo = (lightbox, step) => {
    lightbox.pswp.currSlide.zoomAndPanToInitial();
    lightbox.pswp.currSlide.zoomTo(
      step.zoom, // slide zoom level, 1 - original image size
      {x: step.x, y: step.y}, // zoom center point
      500, // transition duration, can be 0
      true // wether pan/zoom bounds should be ignored
    );
  }

  const goToNextStep = (lightbox) => {
    const page = comic.pages[pageIndex];
    const steps = window.innerWidth > 2000 ? page.stepsXL :
      window.innerWidth > 1500 ? page.stepsLG :
        window.innerWidth > 600 ? page.stepsMD : page.stepsSM;
    if (steps[stepIndex]) {
      zoomTo(lightbox, steps[stepIndex]);
      stepIndex += 1;
    } else {
      goToNextPage(lightbox);
    }
  }

  const onOpenPage = (index) => {
    pageIndex = index;
    stepIndex = 0;
  }

  const goToNextPage = (lightbox) => {
    if (comic.pages[pageIndex + 1]) {
      stepIndex = 0;
      pageIndex = pageIndex + 1;
      lightbox?.pswp?.goTo(pageIndex);
      if (comic.pages[pageIndex]?.stepsLG && comic.pages[pageIndex + 1]?.stepsLG.length) {
        goToNextStep(lightbox);
      }
    }
  }

  return (
    <div className="pswp-gallery" id="gallery">
      {comic.pages.map((page, index) => (
        <a
          onClick={() => onOpenPage(index)}
          href={page.imageUrl}
          data-pswp-width={page.width}
          data-pswp-height={page.height}
          key={index}
          target="_blank"
          rel="noreferrer"
        >
          {
            index === 0 ? <img src={page.imageUrl} className={styles.cover} alt=""/> : ''
          }
        </a>
      ))}
    </div>
  );
}

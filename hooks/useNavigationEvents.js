export default function useNavigationEvents() {
  let keyupListener;
  let clickListener;
  const onNextStep = (callback) => {
    window.addEventListener('keyup', keyupListener = (e) => {
      if (e.key === " " ||
        e.code === "Space" ||
        e.keyCode === 32
      ) {
        e.preventDefault();
        callback();
      }
    });
    window.addEventListener('click', clickListener = (e) => {
      e.preventDefault();
      callback();
    }, false)
  }

  const clearListeners = () => {
    if (keyupListener) {
      window.removeEventListener('keyup', keyupListener);
    }
    if (clickListener) {
      window.removeEventListener('click', clickListener);
    }
  }

  return {
    onNextStep,
    clearListeners
  };
}
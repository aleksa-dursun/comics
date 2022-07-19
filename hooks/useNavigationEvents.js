export default function useNavigationEvents() {
  let keyupListener;
  const onNextStep = (callback) => {
    window.addEventListener('keyup', keyupListener = (e) => {
      if (e.key === " " ||
        e.code === "Space" ||
        e.keyCode === 32
      ) {
        e.preventDefault();
        callback();
      }
    })
  }

  const clearListeners = () => {
    if (keyupListener) {
      window.removeEventListener('keyup', keyupListener);
    }
  }

  return {
    onNextStep,
    clearListeners
  };
}
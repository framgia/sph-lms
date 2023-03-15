type DebounceProps = (callback: any, wait: number) => (...args: any) => void;

const debounce: DebounceProps = (callback, wait) => {
  let timeoutId: number | null = null;
  return (...args: any) => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export default debounce;

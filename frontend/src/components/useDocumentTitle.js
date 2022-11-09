// useDocumentTitle.js
import { useRef, useEffect } from "react";

function useDocumentTitle(title, prevailOnUnmount = false) {
  // console.log(title);
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  });
}

export default useDocumentTitle;

import "Components/ScrollTop/ScrollTop.scss";
import { useEffect,useState } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import cx from "classnames";



const ScrollTop = () => {
  const [showChervon, setSowChervon] = useState(false);

  useEffect(()=>{
    window.addEventListener("scroll", scrollFunction);

    return () =>{
     window.removeEventListener("scroll", scrollFunction);
    }
  })

  function scrollFunction() {
     if (window.pageYOffset > 100) {  
      if (!showChervon) {
        setSowChervon(true);
      }
      return;
    }

    if (showChervon ) {
      setSowChervon(false);
    }
  }
function onScrollTop() {
  window.scrollTo(0, 0);

}

  return (
    <div
    onClick={()=>onScrollTop()}
     className={cx({ chevron_box: true, chevron_box__active:showChervon})}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-chevron-double-up"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
        />
        <path
          fillRule="evenodd"
          d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
        />
      </svg>{" "}
    </div>
  );
}
 
export default ScrollTop;
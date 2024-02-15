import { MouseEventHandler, useState } from "react";
import beautySale from "../../assets/beautysale.jpg";
import clothes from "../../assets/clothes.jpg";
import electronics from "../../assets/electronics.jpg";
import grocery from "../../assets/grocery.jpg";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";

const carouselData = [beautySale, clothes, electronics, grocery];

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleLeftClick: MouseEventHandler = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev <= 0 ? carouselData.length - 1 : prev - 1));
  };

  const handleRightClick: MouseEventHandler = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev >= carouselData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center relative">
        <button onClick={handleLeftClick} className="absolute w-50 h-full z-50 left-0 p-5"> 
          <img src={leftArrow} alt="Previous" className="w-4 h-6"   />
        </button>
        <div className="overflow-hidden relative w-full" style={{height : "90vh"}}>
          {/* <div className=" absolute bg-gradient-to-t from-stone-800  to-black-500 w-full h-full z-10"></div> */}
          <div className="flex relative transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            {carouselData.map((image, index) => (
              <img key={index} src={image} className="h-full w-full object-cover relative bottom-12" alt={`Slide ${index}`}/>
            ))}
          </div>
        </div>
        <button onClick={handleRightClick} className="absolute w-50 h-full z-50 right-0 p-5 ">
          <img src={rightArrow} alt="Next" className="w-4 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;

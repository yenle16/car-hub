import { useState } from "react";
import Image from "next/image";
import { CarProps } from "@types";
import { generateCarImageUrl } from "@utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      closeModal();
    }, 300); // Adjust the duration to match your transition duration
  };

  return isOpen ? (
    <div className={`overlay ${isClosing ? "closing" : ""}`} onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>
          <Image src="/close.svg" alt="close" width={20} height={20} className="object-contain" />
        </button>

        <div className="content">
          <div className="image-container">
            <Image src={generateCarImageUrl(car)} alt="car model" fill priority className="object-contain" />
          </div>

          <div className="additional-images">
            {/* Additional images here */}
          </div>
          
          <div className="details">
            <h2 className="font-semibold text-xl capitalize">{car.make} {car.model}</h2>

            <div className="info">
              {Object.entries(car).map(([key, value]) => (
                <div className="info-row" key={key}>
                  <h4 className="label">{key.split("_").join(" ")}</h4>
                  <p className="value">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CarDetails;

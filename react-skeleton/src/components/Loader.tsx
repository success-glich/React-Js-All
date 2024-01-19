// src/CardLoader.js
import Skeleton from "react-loading-skeleton";

const CardLoader = () => {
  return (
    <div className="property-loader">
      <div className="loader-image">
        <Skeleton height={150} width={"100%"} />
      </div>
      <div className="loader-title">
        <Skeleton height={20} width={"80%"} />
      </div>
      <div className="loader-description">
        <Skeleton height={200} width={"100%"} />
      </div>
      <div className="loader-price">
        <Skeleton height={20} width={"60%"} />
      </div>
      <div className="loader-button">
        <Skeleton height={40} width={"100%"} />
      </div>
    </div>
  );
};

export default CardLoader;

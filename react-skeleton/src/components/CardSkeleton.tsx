import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="left-col">
        <Skeleton circle width={40} height={40} />
      </div>
      <div className="right-col">
        <Skeleton width={250} />
      </div>
    </div>
  );
};

export default CardSkeleton;

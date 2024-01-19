import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./components/CardSkeleton";
function App() {
  // const loader = true;
  return (
    <>
      {/* <SkeletonTheme baseColor="#fff" highlightColor="#4C4C4C"> */}
      <CardSkeleton />
    </>
  );
}

export default App;

import { Triangle } from "react-loader-spinner";

function TriangleLoader({ color = "white", size = "80" }) {
  return (
    <div className="loader">
      <Triangle
        height={size}
        width={size}
        color={color}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

export default TriangleLoader;

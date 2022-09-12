import MealItem from "Components/Meal/Meal";

function Home({ currectTabData, selectedPath }) {
  return (
    <div className="tabs__meals__Section container">
      <>
        {currectTabData &&
          Array.isArray(currectTabData) &&
          currectTabData.map((meal, index) => {
            return (
              <MealItem
                selectedPath={selectedPath}
                meal={meal}
                key={index.toString()}
              />
            );
          })}
      </>
    </div>
  );
}

export default Home;

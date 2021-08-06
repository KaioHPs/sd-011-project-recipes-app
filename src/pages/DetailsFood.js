import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MyContext from '../context/MyContext';
import DetailHeader from '../components/DetailHeader';
import DetailIngredient from '../components/DetailIngredient';
import DetailInstruction from '../components/DetailInstruction';
import Recommendations from '../components/Recommendations';
import '../components/styles/details.css';

function DetailsFood() {
  const { id } = useParams();
  const { setFoodDetails,
    getFoodById,
    foodDetails,
    setFoodIngredients,
  } = useContext(MyContext);

  const [load, setLoad] = useState(true);
  const food = useCallback(async () => {
    const fetch = await getFoodById(id);
    console.log(fetch);
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = fetch[0].strYoutube.match(regExp);
    if (match !== null) {
      setFoodDetails({ ...fetch[0], url: `https://www.youtube.com/embed/${match[2]}` });
    } else {
      setFoodDetails({ ...fetch[0] });
    }

    setLoad(false);
  }, [getFoodById, id, setFoodDetails]);

  useEffect(() => {
    food();
  }, [food]);

  useEffect(() => {
    const length = -1;
    const takeIngredients = Object.keys(foodDetails)
      .map((key) => (key.indexOf('strIngredient') > length ? foodDetails[key] : ''))
      .filter((value) => value !== '' && value !== null && value);

    const ingredientAmount = Object.keys(foodDetails)
      .map((key) => (key.indexOf('strMeasure') > length ? foodDetails[key] : ''))
      .filter((value) => value !== '' && value !== ' ' && value !== null && value);

    const ingredients = ingredientAmount.map(
      (item, index) => `${item} ${takeIngredients[index]}`,
    );

    setFoodIngredients(ingredients);
  }, [foodDetails, setFoodIngredients]);

  return !load ? (
    <main>
      <DetailHeader />
      <DetailIngredient />
      <DetailInstruction />
      <Card>
        <Card.Title>Video</Card.Title>
        <Card className="detail-video-box">
          <iframe
            className="iframe"
            title={ foodDetails.strMeal }
            src={ foodDetails.url }
            frameBorder="0"
            data-testid="video"
          />
        </Card>
        <Recommendations />
      </Card>
    </main>
  ) : <h1>Loading</h1>;
}

export default DetailsFood;
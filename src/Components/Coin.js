import React from "react";
import "../Components/Coin.css";
// import { useNavigate } from "react-router-dom";
import ButtonComp from "./ButtonComp/ButtonComp";
import { MdArrowForwardIos } from "react-icons/md";
import { green, red } from "./Colors";

const Coin = ({
  icon,
  coinName,
  coinSymbol,
  price,
  marketCap,
  priceChange,
  id,
  setId,
}) => {
  // let history = useNavigate();
  return (
    <div className="coinCard">
      <img src={icon} alt={`${coinName} icon`} />
      <p className="coinSymbol">{coinSymbol}</p>
      <p
        style={{ color: priceChange < 0 ? red : green }}
        className="priceChange"
      >
        {priceChange.toFixed(2)}%
      </p>
      <p className="coinVolume">${marketCap.toLocaleString()}</p>
      <div className="name_price_cont">
        <p className="coinPrice">${price.toFixed(2)}</p>
        <h1 className="coinName">{coinName}</h1>
      </div>
      <ButtonComp
        className="moreButton"
        otherProps={{
          onClick: () => {
            setId(id);
            // history(`/CoinPage/${id}`);
          },
        }}
      >
        More Info <MdArrowForwardIos className="arrowIcon" />
      </ButtonComp>
    </div>
  );
};

export default Coin;

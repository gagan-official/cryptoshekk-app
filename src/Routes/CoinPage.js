import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Styles/CoinPage.module.css";
import { green, red } from "../Components/Colors";
import IOSLoader from "../Components/Loaders/IOSLoader/IOSLoader";
import { dummyCoinData } from "../DummyData/DummyData";
// import BackgroundImg from "../Images/cryptobckg.jpeg";
// https://dribbble.com/shots/19916839-Crypto-Wallet-App
// https://www.npmjs.com/package/@babel/plugin-proposal-private-property-in-object
function CoinPage({ id,backBtn }) {
  // let { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  // coin start has to be null first to give time to fetch API data

  useEffect(() => {
    setLoading(true);
    const getCoinData = () => {
      console.log(id);
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(
        (response) => {
          console.log(response.data);
          setLoading(false);
          setCoin(response.data);
        }
        ).catch(err => {
          console.error(err);
          setLoading(false);
          setCoin(dummyCoinData[id]);
      });
    }
    getCoinData();
  }, [id]);


  // if statement to check if data has reached, only then render the component
  if (coin) {
    return (
      <>
        {/* <div
        className={styles.coinPage_Container}
        style={{
          backgroundImage: `url(${BackgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      > */}
        <div className={styles.coinPage_Info}>
          {loading && <IOSLoader/>}
          <img
            src={coin.image.large}
            alt="Icon"
            className={styles.coinPage_Icon}
          />
          <h1>{coin.name}</h1>
          <div className={styles.coinPage_Data}>
            <div className={styles.coinPage_Row}>
              <h3 className={styles.coinPage_RowHeader}>Symbol:</h3>
              <h3 className={styles.coinPage_RowData}>{coin.symbol}</h3>
            </div>
            <div className={styles.coinPage_Row}>
              <h3 className={styles.coinPage_RowHeader}>Current Price:</h3>
              <h3 className={styles.coinPage_RowData}>
                $ {coin.market_data.current_price.usd.toLocaleString()}
              </h3>
            </div>
            <div className={styles.coinPage_Row}>
              <h3 className={styles.coinPage_RowHeader}>Market Cap:</h3>
              <h3 className={styles.coinPage_RowData}>
                $ {coin.market_data.market_cap.usd.toLocaleString()}
              </h3>
            </div>
            <div className={styles.coinPage_Row}>
              <h3 className={styles.coinPage_RowHeader}>Total Volume:</h3>
              <h3 className={styles.coinPage_RowData}>
                $ {coin.market_data.total_volume.usd.toLocaleString()}
              </h3>
            </div>
            <div className={styles.coinPage_Row}>
              <h3 className={styles.coinPage_RowHeader}>24hr High:</h3>
              <h3 style={{ color: green }} className={styles.coinPage_RowData}>
                $ {coin.market_data.high_24h.usd.toLocaleString()}
              </h3>
            </div>
            <div className={styles.coinPage_Row}>
              <h3 className={styles.coinPage_RowHeader}>24hr Low:</h3>
              <h3 style={{ color: red }} className={styles.coinPage_RowData}>
                $ {coin.market_data.low_24h.usd.toLocaleString()}
              </h3>
            </div>
          </div>
          {backBtn && <Link to="/">
            <div className={styles.coinPage_RouteButton}>Go back</div>
          </Link>}

          {/* coinName={coins.name}
              coinSymbol={coins.symbol}
              price={coins.current_price}
              marketCap={coins.market_cap}
              priceChange={ */}
        </div>
        {/* </div> */}
      </>
    );
  } else {
    return null; // if API data not fetched, return null
  }
}

export default CoinPage;

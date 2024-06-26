import styles from "../App.module.css";
import Axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Coin from "../Components/Coin";
import { MdRefresh, MdSearch } from "react-icons/md";
import { dummyData } from "../DummyData/DummyData";
import ButtonComp from "../Components/ButtonComp/ButtonComp";
import CoinPage from "./CoinPage";
import GradientBorder from "../Components/Loaders/GradientBorder/GradientBorder";

function Home() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState("false");
  const [netError, setNetError] = useState(false);
  const [letId, setId] = useState("bitcoin");

  useEffect(() => {
    refreshPage();
  }, []);

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const refreshPage = () => {
    setIsLoading("true");
    Axios.get(
      // `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${process.env.REACT_APP_COINGECKO_API_KEY}`
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => {
        console.log(response.data);
        // setIsLoading(false);
        setIsLoading("animate");
        setTimeout(() => {
          setIsLoading("false");
        }, 500);
        setNetError(false);
        setCoins(response.data);
      })
      .catch((error) => {
        // if(error.code==="ERR_NETWORK") {
        // if (error) {
        // }
        console.error(error);
        setIsLoading("animate");
        setTimeout(() => {
          setIsLoading("false");
        }, 500);
        setCoins(dummyData);
        setNetError(true);
      });
  };

  // const getCoins = () => {
  //   Axios.get(
  //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  //   ).then((response) => {
  //     console.log(response);
  //     setCoins(response.data);
  //   });
  // };

  // <Route exact path="/coin/:id"

  // history.push("/coin/${id}")
  return (
    <>
      <div className={styles.headerContainer}>
        <h1>CryptoShekk</h1>
        <p className={styles.quote}>
          Get your favorite cryptocurrency information here!
        </p>
        <div className={styles.buttonContainer}>
          <div className={styles.inputContainer}>
            <input
              placeholder="Search for a Coin"
              type="text"
              onChange={handleSearch}
            />
            <MdSearch className={styles.searchIcon} />
          </div>
          <ButtonComp otherProps={{ onClick: refreshPage }}>
            Refresh <MdRefresh className={styles.refreshIcon} size="1.5rem" />
          </ButtonComp>
        </div>
      </div>
      {/* {isLoading && <h1 className={styles.loadingMssg}>Data Loading...</h1>} */}
      {netError && (
        <h3 className={styles.netErrorHeading}>
          There was a network issue, rendering dummy data for now:
        </h3>
      )}
      <div className={styles.topContainer}>
        {isLoading === "false" ? null : <GradientBorder loading={isLoading} />}
        {/* <GradientBorder loading={true} /> */}
        <div className={styles.coinsContainer}>
          {filterCoins.map((coins, index) => {
            return (
              <Fragment key={index}>
                <Coin
                  letId={letId}
                  setId={setId}
                  id={coins.id}
                  icon={coins.image}
                  coinName={coins.name}
                  coinSymbol={coins.symbol}
                  price={coins.current_price}
                  marketCap={coins.market_cap}
                  priceChange={coins.price_change_percentage_24h}
                />
              </Fragment>
            );
          })}
        </div>
        <CoinPage id={letId} />
      </div>
    </>
  );
}

export default Home;

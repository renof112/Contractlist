import { useEffect, useState } from "react";
import classes from "./popup.module.css";
import chainList from "../../utils/chainlist.json";
import { Paper, useTheme } from "@material-ui/core";

const Popup = ({ visible, setVisible, data }) => {
  const [activeTab, setActiveTab] = useState();
  const [isMobile, setIsMobile] = useState(true);
  const [checked, setChecked] = useState();

  const theme = useTheme();

  useEffect(() => {
    if (window?.innerWidth > 800) setIsMobile(false);
    if (visible) setActiveTab(data?.chains?.[0]);
  }, [visible]);

  const handleClick = (e) => {
    return;
    const popup = document?.getElementById("popup");
    if (e.target !== popup) {
      setVisible(false);
    }
  };

  const copyAddressToClipboard = (address) => {
    setChecked(address);
    navigator.clipboard.writeText(address);
    setTimeout(() => {
      setChecked(undefined);
    }, 3000);
  };

  if (!visible) return null;

  return (
    <div className={classes.popup__container} onClick={handleClick}>
      <Paper elevation={1} className={classes.popup} id="popup">
        <div className={classes.popup__closebtn}>
          <div onClick={() => setVisible(false)}>&times;</div>
        </div>
        <a
          href={data.infoURL}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.popup__title}
        >
          <img src={data.icon} alt={data.name} height={40} width={40} />
          {data.name}
        </a>
        <div className={classes.chainList}>
          {data?.chains?.map((chainId, i) => (
            <span
              className={`${classes.popup__chain} ${
                activeTab === chainId ? classes.tab__active : ""
              }`}
              onClick={() => setActiveTab(chainId)}
            >
              {chainList[chainId]}
            </span>
          ))}
        </div>
        <table className={classes.popup__table}>
          <div className={classes.popup__table_head}>
            <span>Contracts</span>
            <span>Address</span>
          </div>
          {data?.contracts?.[activeTab ?? data?.chains[0]]?.map((d, i) => (
            <div key={i} className={classes.popup__tablerow}>
              <a href={d?.github} target="_blank" rel="noopener noreferrer">
                {isMobile ? `${d?.name.slice(0, 12)}...` : d?.name}
              </a>
              <span className={classes.address}>
                {isMobile
                  ? `${d?.address?.slice(0, 6)}...${d?.address?.slice(-6)}`
                  : d?.address}
                {checked === d?.address ? (
                  <p
                    style={{ color: "greenyellow", margin: 0, fontWeight: 900 }}
                  >
                    &#10004;
                  </p>
                ) : (
                  <img
                    src={`https://img.icons8.com/material-rounded/50/${
                      theme.palette.type === "dark" ? "ffffff" : "000000"
                    }/copy.png`}
                    alt="Copy to Clipboard"
                    className={classes.copy}
                    onClick={() => copyAddressToClipboard(d?.address)}
                  />
                )}
              </span>
            </div>
          ))}
        </table>
      </Paper>
    </div>
  );
};

export default Popup;

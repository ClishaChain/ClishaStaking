import s from "./Header.module.scss";
import clishaLogo from "../../assets/icons/clisha-logo.svg";
import Logo from "../../assets/icons/logo.svg";
import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { useGetCLISHABalance } from "../../helpers/contractRead";
import { useAppContext } from "../../context/context";
import { ConnectionBtn } from "../ConnectionBtn/ConnectionBtn";
import { formatEther } from "viem";
import { toFixedDigits, formattAddress } from "../../helpers/mathHelpers";
import { DisconnectBtn } from "../DisconnectBtn/DisconnectBtn";

export const Header = () => {
  const { isConnected, address } = useAccount();
  const { data: walletBalance } = useBalance({ address });

  const clishaBalance = useGetCLISHABalance(String(address));
  const setClishaBalance = useAppContext()?.setClishaBalance;
  const formattedWalletBalance = toFixedDigits(
    Number(walletBalance?.formatted)
  );
  const formattedAddress = formattAddress(String(address));
  const formattedClishaBalance =
    clishaBalance && typeof clishaBalance === "bigint"
      ? toFixedDigits(Number(formatEther(clishaBalance)))
      : "0";

  useEffect(() => {
    if (isConnected && setClishaBalance) {
      setClishaBalance(formattedClishaBalance);
    }
  }, [formattedClishaBalance, setClishaBalance, isConnected]);

  return (
    <header className={s.header}>
      <div className={s.header_container}>
        <a
          href="https://staking.clishachain.com/"
          target="_blank"
          rel="noreferrer"
          className={s.logo_link}
        >
          <img src={Logo} width={302} height={86} alt="Clisha Logo" className={s.logo_image} />
        </a>
        {isConnected ? (
          <div className={s.wallet_info}>
            <img className={s.clisha_logo} src={clishaLogo} alt="CLISHA logo" />
            {walletBalance ? formattedWalletBalance : "0.00"}{" "}
            {walletBalance?.symbol}
            <span className={s.wallet_adress}>|</span>
            <span className={s.wallet_adress}>
              {address ? formattedAddress : "unknown"}
            </span>
            <DisconnectBtn />
          </div>
        ) : (
          <div className={s.connect_btn_box}>
            <ConnectionBtn />
          </div>
        )}
      </div>
    </header>
  );
};

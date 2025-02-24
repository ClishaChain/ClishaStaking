import s from "./Notification.module.scss";
import { useAppContext } from "../../context/context";
import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { formatEther } from "viem";
import crossIcon from "../../assets/icons/cross.svg";
import tickIcon from "../../assets/icons/tick.svg";
import CustomLoader from "../CustomLoader/CustomLoader";

export const Notification: FC = () => {
  const location = useLocation();
  const context = useAppContext();

  const status = context?.status;
  const payload = context?.payload;
  const transactionStatus = context?.transactionStatus;
  const tokenAmount = payload ? Number(formatEther(payload)).toFixed(2) : 0;

  // close notification
  useEffect(() => {
    if (status?.includes("success") || status?.includes("error")) {
      setTimeout(() => {
        context?.setStatus("");
      }, 5000);
    }
  }, [status]);

  // close notification if user change route
  useEffect(() => {
    context?.setStatus("");
    context?.setTransactionStatus("");
  }, [location]);

  return (
    <div className={s.notify}>
      {/*  showing loader  */}
      {transactionStatus && !status && <CustomLoader />}
      {/*  showing success img  */}
      {status?.includes("success") && (
        <div className={s.notify_circle_success}>
          <img src={tickIcon} alt="Tick icon" />
        </div>
      )}
      {/*  showing error img  */}
      {status?.includes("error") && (
        <div className={s.notify_circle_error}>
          <img src={crossIcon} alt="Cross icon" />
        </div>
      )}
      <p className={s.notify_desc}>
        {/* showing transaction in process messages */}
        {transactionStatus === "stake_loading" && !status && (
          <>
            Adding <span className={s.notify_accent}>{tokenAmount}</span> CLISHA to Staking
          </>
        )}
        {transactionStatus === "withdraw_loading" && (
          <>
            Withdrawing <span className={s.notify_accent}>{tokenAmount}</span> CLISHA
          </>
        )}
        {transactionStatus === "exit_loading" && (
          <>
            Withdrawing <span className={s.notify_accent}>{tokenAmount}</span> CLISHA
          </>
        )}
        {transactionStatus === "claim_loading" && (
          <>
            Adding <span className={s.notify_accent}>{tokenAmount}</span> CLISHA to wallet
          </>
        )}
        {/* showing error and success messages */}
        {status === "error" && (
          <>
            <span className={s.notify_accent}>
              Connection Error<span className={s.notify_dot}>. </span>
            </span>
            <span className={s.notify_string}>Please try again</span>
          </>
        )}
        {status === "success_stake" && (
          <>
            <span className={s.notify_accent}>{tokenAmount} CLISHA </span> successfully{" "}
            <span className={s.notify_string}>added to Staking</span>
          </>
        )}
        {status === "success_withdraw" && (
          <>
            <span className={s.notify_accent}>{tokenAmount} CLISHA </span>
            successfully <span className={s.notify_string}>added to wallet</span>
          </>
        )}
        {status === "success_exit" && (
          <>
            <span className={s.notify_accent}>{tokenAmount} CLISHA </span> successfully{" "}
            <span className={s.notify_string}>added to wallet</span>
          </>
        )}
        {status === "success_claim" && (
          <>
            <span className={s.notify_accent}>{tokenAmount} CLISHA </span> successfully{" "}
            <span className={s.notify_string}>added to wallet</span>
          </>
        )}
      </p>
    </div>
  );
};

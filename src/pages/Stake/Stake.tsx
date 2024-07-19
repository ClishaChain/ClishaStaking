import s from "../Pages.module.scss";
import { useAppContext } from "../../context/context";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { parseEther } from "viem";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { useGetTotalRate } from "../../hooks/useGetTotalRate";

import {
  useStakeToken,
  useWaitForStake,
} from "../../helpers/contractWrite";



export const Stake = () => {
  const { address } = useAccount();

  const context = useAppContext();
  const clishaBalance = context?.clishaBalance;
  const totalRate = useGetTotalRate();

  const { writeStake, stakeWriteLoading, stakeData } = useStakeToken();
  const { stakeLoading } = useWaitForStake(stakeData);

  const isLoading = stakeWriteLoading;

  useEffect(() => {
    if (stakeLoading) context?.setTransactionStatus("stake_loading");
  }, [stakeLoading, context]);

  const handleSubmit = (amount: string) => {
    if (!address) {
      console.error("No wallet connected");
      return;
    }
    const weiAmount = parseEther(amount);
    writeStake({ 
      value: weiAmount 
    });
  };

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Stake</h2>
        <p>
          <span className={s.page_rate_title}>Reward rate: </span>
          <span className={s.page_rate_value}>
            {totalRate ? totalRate : "0"}
          </span>
          <span className={s.page_rate_desc}> CLISHA/WEEK</span>
        </p>
      </div>
      <TransactionForm
        handleSubmit={handleSubmit}
        balance={clishaBalance !== undefined ? clishaBalance : ""}
      />
      <SubmitButton
        text="Stake"
        className={"stake_btn"}
        isLoading={isLoading}
      />
    </div>
  );
};

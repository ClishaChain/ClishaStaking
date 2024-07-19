import stakeABI from "../constants/abis/newABI.json";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useAppContext } from "../context/context";
import { WriteDataType } from "../constants/types";

const { VITE_STAKE_ADDRESS } = import.meta.env;


// send CLISHA token to stake, pass amount of staked token in args
export const useStakeToken = () => {
  const setStatus = useAppContext()?.setStatus;

  const {
    data: stakeData,
    isLoading: stakeWriteLoading,
    write: writeStake,
  } = useContractWrite({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "stake",

    onError() {
      if (setStatus) setStatus("error");
    },
  });

  return { writeStake, stakeData, stakeWriteLoading };
};

// method for waitting useStakeToken transaction, gets in approve writing hash in props
export const useWaitForStake = (data: WriteDataType | undefined) => {
  const setStatus = useAppContext()?.setStatus;
  const setTransactionStatus = useAppContext()?.setTransactionStatus;

  const { isLoading: stakeLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("success_stake");
        console.log("Successful stake", data);
      }
    },
    onError() {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("error");
      }
    },
  });

  return { stakeLoading };
};

// get CLISHA token from stake, pass desired amount of token in args
export const useWithdraw = () => {
  const setStatus = useAppContext()?.setStatus;

  const {
    data: dataWithdraw,
    isLoading: withdrawIsLoading,
    write: writeWithdraw,
  } = useContractWrite({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "withdraw",
    onError() {
      if (setStatus) setStatus("error");
    },
  });
  return { writeWithdraw, dataWithdraw, withdrawIsLoading };
};

// method for waitting useWithdraw transaction
export const useWaitForWithdraw = (data: WriteDataType | undefined) => {
  const setStatus = useAppContext()?.setStatus;
  const setTransactionStatus = useAppContext()?.setTransactionStatus;

  const { isLoading: withdrawLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("success_withdraw");
        console.log("Successful withdraw", data);
      }
    },
    onError() {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("error");
      }
    },
  });

  return { withdrawLoading };
};

// get rewards from stake
export const useClaimRewards = () => {
  const setStatus = useAppContext()?.setStatus;

  const {
    data: dataClaim,
    isLoading: claimIsLoading,
    write: writeClaim,
  } = useContractWrite({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "claimReward",
    onError() {
      if (setStatus) setStatus("error");
    },
  });
  return { writeClaim, dataClaim, claimIsLoading };
};

// method for waitting useClaimRewards transaction
export const useWaitClaimRewards = (data: WriteDataType | undefined) => {
  const setStatus = useAppContext()?.setStatus;
  const setTransactionStatus = useAppContext()?.setTransactionStatus;

  const { isLoading: claimLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("success_claim");
        console.log("Successful getting claim rewards", data);
      }
    },
    onError() {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("error");
      }
    },
  });

  return { claimLoading };
};

// take all (staked balance + rewards) from stake
export const useTakeAll = () => {
  const setStatus = useAppContext()?.setStatus;

  const {
    data: takeAllData,
    isLoading: takeAllIsLoading,
    write: takeAllWrite,
  } = useContractWrite({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "exit",
    onError() {
      if (setStatus) setStatus("error");
    },
  });
  return { takeAllWrite, takeAllData, takeAllIsLoading };
};

// method for waitting useTakeAll transaction
export const useWaitTakeAll = (data: WriteDataType | undefined) => {
  const setStatus = useAppContext()?.setStatus;
  const setTransactionStatus = useAppContext()?.setTransactionStatus;

  const { isLoading: takeAllLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("success_exit");
        console.log("Successful getting all staked balance", data);
      }
    },
    onError() {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("error");
      }
    },
  });
  return { takeAllLoading };
};

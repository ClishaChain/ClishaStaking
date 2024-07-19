import stakeABI from "../constants/abis/newABI.json";
import { useBalance, useContractRead } from "wagmi";

const { VITE_STAKE_ADDRESS } = import.meta.env;

// Helper function to validate address format
const isValidAddress = (address: string): address is `0x${string}` => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// reading CLISHA token balance, takes user address in args
export const useGetCLISHABalance = (address: string) => {
  if (!isValidAddress(address)) {
    console.error('Invalid address format');
    return BigInt(0); // or handle this error case as appropriate for your app
  }

  const { data } = useBalance({
    address,
    watch: true,
  });
  return data?.value;
};

// reading staked balance, takes user address in args
export const useGetStakedBalance = (address: string) => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "balanceOf",
    args: [`${address}`],
    watch: true,
  });
  return data;
};

// reading total number of rewards for the period
export const useGetNumberOfRewards = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "getRewardForDuration",
  });
  return data;
};

// reading the total amount of stakes made by all users
export const useGetTotalAmountOfStakes = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "totalSupply",
  });
  return data;
};

// reading the timestamp of the end of the reward distribution period
export const useGetTimeStampOfTheEnd = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "periodFinish",
  });
  return data;
};

// reading awailable amount rewards for user, takes user address in args
export const useGetUserRewards = (address: string) => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "earned",
    args: [`${address}`],
    watch: true,
  });
  return data;
};

// reading reward rate
export const useGetRewardRate = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "rewardRate",
  });
  return data;
};

// reading reward rate
export const useGetTotalSupply = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "totalSupply",
  });
  return data;
};

"use client"

import { API_URL } from "@/app/config/config";
import useSWR from "swr";

export const formatLargeNumber = (value, toFixedNr) => {
    const suffixes = ["", "K", "M", "B", "T"];

    let suffixIndex = 0;
    let formattedValue = value;

    while (formattedValue >= 1000 && suffixIndex < suffixes.length - 1) {
      formattedValue /= 1000;
      suffixIndex++;
    }

    return `${parseFloat(formattedValue.toFixed(2))}${suffixes[suffixIndex]}`;
  };

  export const FromDb = (link) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data: result, isLoading, mutate } = useSWR(
      `${API_URL}/api/${link}`,
      fetcher
    );
    return {result, isLoading, mutate};
  }

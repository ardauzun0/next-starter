import axios from "@lib/axios";
import { useLocale } from "next-intl";
import { useEffect, useMemo } from "react";

const useAxios = () => {
  const locale = useLocale();
  const referer = typeof window !== "undefined" ? window.location.href : "";

  const axiosInstance = useMemo(() => axios, []);

  useEffect(() => {
    axiosInstance.defaults.headers.common["X-Locale"] = locale;
    axiosInstance.defaults.headers.common["X-Referer"] = referer;
  }, [locale, referer]); // eslint-disable-line react-hooks/exhaustive-deps

  return axiosInstance;
};

export default useAxios;

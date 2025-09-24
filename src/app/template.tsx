'use client';

import Loader from "@/components/loader";
import { useIsFirstLoad } from "@/store/loading-store";

const Template = ({ children }: { children: React.ReactNode }) => {
  const isFirstLoad = useIsFirstLoad();

  return (
    <>
      <Loader isFirstLoad={isFirstLoad} />

      {children}
    </>
  );
};

export default Template;
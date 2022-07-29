import dynamic from "next/dynamic";
import { Suspense } from "react";

const MainComponent = dynamic(() => import("../components/Main"), {
  ssr: false,
  suspense: true,
});

const Index = () => {
  return (
    <Suspense>
      <MainComponent />
    </Suspense>
  );
};

export default Index;

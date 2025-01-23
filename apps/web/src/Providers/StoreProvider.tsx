"use client";
import { AppStore, makeStore } from "@/Redux/Store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import LoadingComp from "@/components/LoadingComp";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        persistor={persistStore(storeRef.current)}
        loading={<LoadingComp />}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}

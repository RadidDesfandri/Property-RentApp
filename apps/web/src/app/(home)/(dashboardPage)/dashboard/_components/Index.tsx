"use client";

import { useState } from "react";
import ActivityMenu from "./ActivityMenu";
import { TbMessageReport } from "react-icons/tb";
import CardSalesreport from "./cardSalesreport";
import ListTotalProperty from "./ListTotalProperty";
import ListTotalPublish from "./ListTotalPublish";
import ListTotalDraft from "./ListTotalDraft";

const Dashboardpage = () => {
  const [cardId, setCardId] = useState(4);
  return (
    <section className="w-full">
      <h1 className="text-xl font-semibold text-hitam lg:text-2xl">
        Property List
      </h1>
      <h4 className="text-sm font-light text-gray-500">
        Jelajahi informasi dan aktivitas tentang properti anda
      </h4>
      <div className="mt-5">
        <ActivityMenu cardId={cardId} setCardId={setCardId} />
      </div>

      <div className="mt-7">
        {cardId === 1 ? (
          <ListTotalProperty />
        ) : cardId === 2 ? (
          <ListTotalPublish />
        ) : cardId === 3 ? (
          <ListTotalDraft />
        ) : null}
      </div>

      <button
        type="button"
        className="mt-4 flex items-center gap-2 rounded-md text-xl font-medium text-hitam transition-all duration-300 ease-in-out hover:scale-105"
        onClick={() => setCardId(4)}
      >
        <TbMessageReport /> Report Sales
      </button>
      {cardId === 4 && <CardSalesreport />}
    </section>
  );
};

export default Dashboardpage;

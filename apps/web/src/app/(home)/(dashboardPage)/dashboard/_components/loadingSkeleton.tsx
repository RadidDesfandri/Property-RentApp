"use client"

const SkeletonPropertyCard = () => {
    return (
      <div className="w-full overflow-hidden rounded-lg border bg-slate-100 shadow-md animate-pulse">
        <div className="h-[140px] w-full rounded-lg bg-gray-300 md:h-[180px]" />
        <section className="px-3 py-2">
          <div className="flex items-center justify-between gap-6">
            <div className="h-4 w-1/2 rounded bg-gray-300" />
            <div className="h-4 w-1/4 rounded bg-gray-300" />
          </div>
          <div className="mt-2 h-4 w-3/4 rounded bg-gray-300" />
          <div className="mt-1 h-4 w-1/2 rounded bg-gray-300" />
          <div className="mt-4 h-8 w-full rounded bg-gray-300" />
        </section>
      </div>
    );
  };
  
  export default SkeletonPropertyCard;
  
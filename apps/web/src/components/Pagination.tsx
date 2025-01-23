"use client";
import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  onPageChange: ({ selected }: { selected: number }) => void;
  total: number;
  take: number;
}

const Pagination: React.FC<PaginationProps> = ({
  take,
  total,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      breakLabel={<span>...</span>}
      nextLabel={<GoChevronRight className="w-6 h-6 text-hitam"/>}
      previousLabel={<GoChevronLeft className="w-6 h-6 text-hitam"/>}
      pageCount={total}
      renderOnZeroPageCount={null}
      containerClassName="flex gap-4 w-fit m-4"
      pageLinkClassName="px-4 py-2 rounded-lg"
      activeLinkClassName="bg-btn text-hitam"
      onPageChange={onPageChange}
    />
  );
};

export default Pagination;

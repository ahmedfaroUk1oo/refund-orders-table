import React, { useState } from "react";
import { Order } from "./Table.types";
import TableRow from "./TableRow";
import ReactPaginate from "react-paginate";

interface TableProps {
  data: Order[];
  onDecisionChange: (id: string, decision: string) => void;
  onStatusToggle: (id: string, active: boolean) => void;
  onViewDetails: (order: Order) => void;
}

const Table: React.FC<TableProps> = ({ data, onDecisionChange, onStatusToggle, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Reason</th>
              <th className="py-2 px-4">Store Name</th>
              <th className="py-2 px-4">Store Logo</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Decision</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((order) => (
              <TableRow
                key={order.id}
                order={order}
                onDecisionChange={onDecisionChange}
                onStatusToggle={onStatusToggle}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center mt-4 space-x-2"}
        pageClassName={"px-3 py-1 border rounded"}
        activeClassName={"bg-blue-500 text-white"}
        previousClassName={"px-3 py-1 border rounded"}
        nextClassName={"px-3 py-1 border rounded"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default Table;
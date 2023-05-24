import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { runGqlQuery, getLaunchesQuery } from "../../actions/space_x";
import SpaceXLaunchDetails from "./SpaceXLaunchDetails";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function SpaceXLaunches() {
  // GQL Query
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["launches"],
    queryFn: () =>
      runGqlQuery(getLaunchesQuery, {
        limit: 5,
        sort: "launch_date_local",
      }).then((res) => res.data),
  });

  const [rowSelection, setRowSelection] = React.useState({});
  const [launchId, setLaunchId] = React.useState();

  // react-table setup
  const columns = useMemo(
    () => [
      {
        id: (row) => row.mission_id,
        header: "Select",
        cell: ({ row }) => (
          <div className="px-1">
            {row.getIsSelected() && (
              <span className="text-green-500">Selected</span>
            )}
          </div>
        ),
      },
      {
        header: "Name",
        accessorKey: "mission_name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Launch Date",
        accessorKey: "launch_date_local",
        cell: (info) => new Date(info.getValue()).toDateString(),
      },
    ],
    []
  );

  const setSelection = (table, row) => {
    row.toggleSelected(true);
  };

  const table = useReactTable({
    data: data?.data?.launches,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true, //enable row selection for all rows
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    if (table.getIsSomeRowsSelected()) {
      setLaunchId(table.getSelectedRowModel().flatRows[0].original.id);
    }
  }, [rowSelection]);

  if (isError) {
    return <p className="text-red-800">Error: {JSON.stringify(error)}</p>;
  }

  if (!data || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-4 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header.isPlaceholder ? null : (
                            <>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      onClick={() => {
                        setSelection(table, row);
                      }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-sky-200">
        <SpaceXLaunchDetails launchId={launchId} />
      </div>
    </div>
  );
}

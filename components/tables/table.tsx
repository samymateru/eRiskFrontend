"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface BaseTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

export const BaseTable = <TData,>({ data, columns }: BaseTableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
  <div className="[&>div]:max-h-[calc(100svh-200px)]">
    <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
      <TableHeader className="bg-primary text-primary-foreground sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="hover:bg-transparent text-primary-foreground rounded-md">
            {headerGroup.headers.map((header, index) => {
              const isFirst = index === 0;
              const isLast = index === headerGroup.headers.length - 1;
              return (
                <TableHead
                  key={header.id}
                  className={`text-primary-foreground  ${isFirst ? "rounded-tl-lg" : ""} ${
                    isLast ? "rounded-tr-lg" : ""
                  }`}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, rowIndex) => {
            const isLastRow = rowIndex === table.getRowModel().rows.length - 1;
            const cells = row.getVisibleCells();

            return (
              <TableRow
                className="odd:bg-blue-100 even:bg-blue-200 hover:bg-blue-300"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {cells.map((cell, cellIndex) => {
                  const isFirstCell = cellIndex === 0;
                  const isLastCell = cellIndex === cells.length - 1;

                  const cornerClass =
                    isLastRow && isFirstCell
                      ? "rounded-bl-md"
                      : isLastRow && isLastCell
                      ? "rounded-br-md"
                      : "";

                  return (
                    <TableCell
                      key={cell.id}
                      className={`max-w-[350px] p-2 ${cornerClass}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
  );
};

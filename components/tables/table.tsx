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
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {cn} from "@/lib/utils";
import {
    ReactNode,
    useEffect,
    useRef,
    useState
} from "react";
import {Label} from "@/components/ui/label";

interface BaseTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  height?: string,
  onSelectionChange?: (selectedIds: string[]) => void;
  getRowId?: (row: TData) => string;
  groupColumn?: string,
  emptyTable?: ReactNode

}


export const BaseTable = <TData,>({
    data,
    columns,
    height = "200px",
    onSelectionChange,
    getRowId,
    emptyTable = <Label>No Results</Label>
}: BaseTableProps<TData>) => {
    const [rowSelection, setRowSelection] = useState({});
    const prevIds = useRef<string[]>([]);
    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    useEffect(() => {
        if (!onSelectionChange || !getRowId) return;

        const selectedIds = table.getSelectedRowModel().rows.map((row) =>
            getRowId(row.original)
        );

        const isEqual =
            selectedIds.length === prevIds.current.length &&
            selectedIds.every((id, i) => id === prevIds.current[i]);

        if (!isEqual) {
            onSelectionChange(selectedIds);
            prevIds.current = selectedIds;
        }
    }, [rowSelection, onSelectionChange, getRowId, table]);

  return (
  <div className={cn(
      "w-full",
      height === "208" ?  "[&>div]:max-h-[calc(100svh-208px)]" :
          height === "185" ? "[&>div]:max-h-[calc(100svh-185px)]" : "[&>div]:max-h-[calc(100svh-200px)]"
  )}>
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
                className={"bg-blue-50 hover:bg-blue-50"}
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
                      className={`max-w-[350px] align-top h-full p-2 ${cornerClass}`}>
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
          <TableRow className={"w-full relative"}>
            <TableCell colSpan={10} className=" h-24 w-full">
                <section className={"w-fit mx-auto"}>
                    {emptyTable}
                </section>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
  );
};

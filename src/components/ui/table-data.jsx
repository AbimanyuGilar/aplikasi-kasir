import { useState } from "react"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { SearchBar } from "@/components/ui/search-bar"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

export default function TableData({data, columns, pageSize, searchFilter, filter}) {
  const [sorting, setSorting] = useState([])

  const [columnFilters, setColumnFilters] = useState([])

  columns = columns.map(((col) => (
    {
      ...col, 
      header: col.short 
        ? ({column}) => (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {col.header}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        : col.header
    }
  )))

  const table = useReactTable(
    {
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageSize,
        },
      },
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        columnFilters,
      },
    }
  )

  function getVisiblePageIndex() {
    const range = []
    const allPage = table.getPageOptions()
    const currentPage = table.getState().pagination.pageIndex

    allPage.map((index) => index+1)
    
    allPage.forEach(pageIndex => {
      if ((pageIndex >= currentPage-1 && pageIndex <= currentPage+1) || pageIndex === 0 || pageIndex === allPage.length-1) {
        range.push(pageIndex)
      } else if (range[range.length - 1] !== "...") {
        range.push("...")
      }
    })
    console.log(allPage)
    console.log(range)
    return range
  }
  
  return (
    <>
      <div className="flex gap-3"> 
        {searchFilter && (
          <SearchBar
            placeholder="Cari Produk..."
            value={(table.getColumn(searchFilter)?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn(searchFilter)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          )
        }
        {
          filter.column && filter.data && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='group' variant="outline">
                  {table.getColumn(filter.column)?.getFilterValue() ?? filter.title ?? "Filter"}
                  <ChevronDown className="transition duration-300 group-data-[state=open]:rotate-180"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {
                    filter.default && (
                      <DropdownMenuItem key="0" onClick={() => {table.getColumn(filter.column)?.setFilterValue(undefined)}}>{filter.default}</DropdownMenuItem>
                    )
                  }
                  {filter.data.map((item, index) => (
                    <DropdownMenuItem key={index+1} onClick={() => {table.getColumn(filter.column)?.setFilterValue(item)}}>{item}</DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      </div>
      <Table>
        <TableHeader>
          { table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              { headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    { 
                      header.isPlaceholder 
                      ? null 
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) 
                    }
                  </TableHead>
                )
              }) }
            </TableRow>
          )) }
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {
            getVisiblePageIndex().map((page, index) => {
              if (page === "...") {
                return <span key={`dots-${index}`} className="px-2 text-muted-foreground">...</span>
              }

              return (
                <Button
                  key={page}
                  variant={table.getState().pagination.pageIndex === page ? "default" : "outline"}
                  className="h-8 w-8 p-0"
                  onClick={() => table.setPageIndex(page)}
                >
                  {page + 1}
                </Button>
            )
            })
          }
          
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  )
}
import React from 'react'
import { DetailCardsSekaloton } from '../_components/DetailCards'
import { DataTableSkeleton } from '../_components/data-table/skeleton'

const loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-2 w-full">
            <DetailCardsSekaloton cards={4} />
            <DataTableSkeleton
                searchableColumnCount={1}
                filterableColumnCount={2}
                columnCount={6}
                cellWidths={["18rem", "8rem", "10rem", "8rem", "8rem", "2rem"]}
                shrinkZero
            />
        </div>
    )
}

export default loading

import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportStatus } from '@prisma/client';

const ReportStatusFilters = ({ onChange, value }: { onChange: (v: string) => void | Promise<() => void>, value?: ReportStatus }) => {
    return (
        <Select onValueChange={(v) => onChange(v)} defaultValue={value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="APPROVED">APPROVED</SelectItem>
                <SelectItem value="REJECTED">REJECTED</SelectItem>
            </SelectContent>
        </Select>

    )
}

export default ReportStatusFilters

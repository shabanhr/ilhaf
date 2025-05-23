import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useRef, useState } from 'react'
import ReportStatusFilters from "../../_components/ReportStatusFilters"
import { Report, ReportStatus } from '@prisma/client';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { UpdateReport } from '../../reports/actions';
import { toast } from 'sonner';

interface Props {
    form: any;
    report: Report | null;
    IsDisabled: boolean;
    loading: boolean;
    StartLoading: (v: string) => void;
    endLoading: (v: string) => void;
}

const LyricsAndReport = ({ form, IsDisabled, report, loading, StartLoading, endLoading }: Props) => {
    const [reportStatus, setReportStatus] = useState<ReportStatus | undefined>(report?.status);

    const selectTextInTextarea = (textarea: HTMLTextAreaElement, textToSelect: string) => {
        const text = textarea.value;
        const startIndex = text.indexOf(textToSelect);
        if (startIndex !== -1) {
            const endIndex = startIndex + textToSelect.length;
            textarea.focus();
            textarea.setSelectionRange(startIndex, endIndex);
        }
    };


    const urduRef = useRef<HTMLTextAreaElement>(null);
    const englishRef = useRef<HTMLTextAreaElement>(null);

    const handeFindReport = () => {
        if (report) {
            const { mistaken } = report;
            const urduTextarea = urduRef.current;
            const englishTextarea = englishRef.current;

            if (urduTextarea && urduTextarea.value.includes(mistaken)) {
                selectTextInTextarea(urduTextarea, mistaken);
            } else if (englishTextarea && englishTextarea.value.includes(mistaken)) {
                selectTextInTextarea(englishTextarea, mistaken);
            }
        }
    }

    useEffect(() => {
        handeFindReport()
    }, [report, englishRef, urduRef]);

    const handeUpdateReport = async () => {
        StartLoading("report")
        if (report && reportStatus) {
            const res = await UpdateReport(report.id, { status: reportStatus });
            const { message } = res;
            toast(message)
        }
        endLoading("report")
    }


    return <>
        <div className="w-full flex flex-col md:flex-row gap-2">
            <FormField
                control={form.control}
                name="english"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>English Lyrics</FormLabel>
                        <FormControl>
                            <Textarea
                                disabled={IsDisabled}
                                className="min-h-[70vh] max-h-screen"
                                placeholder="Enter english Lyrics" {...field}
                            ref={englishRef}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="urdu"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Urdu Lyrics</FormLabel>
                        <FormControl>
                            <Textarea
                                disabled={IsDisabled}
                                className="min-h-[70vh] max-h-screen"
                                placeholder="Enter urdu lyrics" {...field}
                            ref={urduRef}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        {report?.correct && <>
            <div className="w-full flex items-center justify-center mt-10 p-4 border rounded-lg">
                <ReportStatusFilters value={reportStatus} onChange={(v) => setReportStatus(v as ReportStatus)} />
                <Button className="ml-auto" type="button" size="sm"
                    onClick={handeUpdateReport}
                    disabled={loading}
                    icon={<Spinner active={loading} />}
                >
                    Update Report
                </Button>
            </div>

            <div className="bg-background border z-10 shadow-md fixed bottom-0 right-5 w-[350px] flex flex-col items-center justify-center min-h-20 h-max rounded-t-lg p-4 ">
                Mistake
                <Textarea value={report.mistaken} className="min-h-[100px] h-max" readOnly />
                Correct
                <Textarea value={report.correct} className="min-h-[100px] h-max" readOnly />
                <Button className="ml-auto mt-2" type="button" size="sm" onClick={handeFindReport}>
                    Find
                </Button>
            </div>
        </>}

    </>
}

export default LyricsAndReport

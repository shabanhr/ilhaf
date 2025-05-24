import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useRef, useState } from 'react';
import ReportStatusFilters from '../../_components/ReportStatusFilters';
import { Report, ReportStatus } from '@prisma/client';
import { Spinner } from '@/components/ui/spinner';
import { Button, ButtonWithLoading } from '@/components/ui/button';
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
	};

	useEffect(() => {
		handeFindReport();
	}, [report, englishRef, urduRef]);

	const handeUpdateReport = async () => {
		StartLoading('report');
		if (report && reportStatus) {
			const res = await UpdateReport(report.id, { status: reportStatus });
			const { message } = res;
			toast(message);
		}
		endLoading('report');
	};

	return (
		<>
			<div className="flex w-full flex-col gap-2 md:flex-row">
				<FormField
					control={form.control}
					name="english"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>English Lyrics</FormLabel>
							<FormControl>
								<Textarea
									disabled={IsDisabled}
									className="max-h-screen min-h-[70vh]"
									placeholder="Enter english Lyrics"
									{...field}
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
									className="max-h-screen min-h-[70vh]"
									placeholder="Enter urdu lyrics"
									{...field}
									ref={urduRef}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{report?.correct && (
				<>
					<div className="mt-10 flex w-full items-center justify-center rounded-lg border p-4">
						<ReportStatusFilters value={reportStatus} onChange={(v) => setReportStatus(v as ReportStatus)} />
						<ButtonWithLoading
							className="ml-auto"
							type="button"
							size="sm"
							onClick={handeUpdateReport}
							isLoading={loading}
						>
							Update Report
						</ButtonWithLoading>
					</div>

					<div className="bg-background fixed right-5 bottom-0 z-10 flex h-max min-h-20 w-[350px] flex-col items-center justify-center rounded-t-lg border p-4 shadow-md">
						Mistake
						<Textarea value={report.mistaken} className="h-max min-h-[100px]" readOnly />
						Correct
						<Textarea value={report.correct} className="h-max min-h-[100px]" readOnly />
						<Button className="mt-2 ml-auto" type="button" size="sm" onClick={handeFindReport}>
							Find
						</Button>
					</div>
				</>
			)}
		</>
	);
};

export default LyricsAndReport;

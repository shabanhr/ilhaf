"use client";
import React, { useEffect } from 'react'
import { ModalBody, ModalClose, ModalFooter } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import Spinner from '@/components/Spinner';
import { ReportSchema } from '@/types/zod';
import { createReport } from '../../_lib/actions';
import { useLyricsInteractions } from '@/hooks/use-lyrics-interactions';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    selection?: string;
}


const CreateReportForm = ({ setOpen, selection }: Props) => {
    const { lyricsData: data, userId } = useLyricsInteractions();
    if (!data || !userId) return null;
    const lyricsId = data.id;

    type Inputs = z.infer<typeof ReportSchema>
    const form = useForm<Inputs>({
        resolver: zodResolver(ReportSchema),
        defaultValues: {
            mistaken: selection,
            correct: selection,
        }
    })
    const { formState: { isSubmitting } } = form;

    const onSubmit = async (values: z.infer<typeof ReportSchema>) => {
        if (values.correct === values.mistaken) {
            return form.setError("correct", { message: "It must not remain as it currently is." })
        }
        const res = await createReport(lyricsId, userId, values);
        if (res.success) {
            toast.success(res.message)
            setOpen(false)
        } else {
            toast.error(res.message)
        }
    };

    useEffect(() => {
        form.setFocus("correct")
    }, [])

    return <>
        <ModalBody>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
                    <FormField
                        control={form.control}
                        name="mistaken"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mistaken Part</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className='opacity-50'
                                        disabled={isSubmitting}
                                        {...field}
                                        readOnly
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="correct"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correction</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isSubmitting}
                                        {...field}
                                        placeholder='Enter the correct lyrics!'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </ModalBody>
        <ModalFooter>
            <ModalClose asChild>
                <Button
                    variant="outline"
                    color="danger"
                    disabled={isSubmitting}
                >
                    Close
                </Button>
            </ModalClose>
            <Button
                className='w-full md:w-max'
                disabled={isSubmitting}
                icon={<Spinner active={isSubmitting} />}
                onClick={form.handleSubmit(onSubmit)}
            >
                Submit
            </Button>
        </ModalFooter>
    </>
}

export default CreateReportForm;
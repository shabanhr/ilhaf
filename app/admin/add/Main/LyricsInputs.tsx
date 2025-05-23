import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { CheckIcon } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import MultiSelectFormField from "./MultiSelectFormField"
import MagicBox from "@/components/ui/magicBox"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { LyricsType } from '@prisma/client';
import { cn } from '@/lib/utils';
import { dataType } from '../types';
import { UseFormReturn } from 'react-hook-form';

interface Props {
    form: UseFormReturn<any>;
    IsDisabled: boolean;
    data: {
        topics: dataType[];
        types: dataType[];
        reciters: dataType[];
        writers: dataType[];
    };
}

const LyricsInputs = ({ form, IsDisabled, data }: Props) => {
    const { setValue, getValues } = form;
    const { types, reciters, writers, topics } = data;

    const [triggerState, setTriggerState] = useState<boolean>(false);
    const [reciterState, setReciterState] = useState<boolean>(false);
    const [dateTrigger, setDateTrigger] = useState<boolean>(false);

    const otherReciters = reciters.filter(reciter => reciter.id !== getValues("reciterId"))


    return <>
        <div className="w-full flex flex-col md:flex-row gap-2 items-center justify-center">
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                            <MagicBox open={triggerState} onOpenChange={setTriggerState} trigger={
                                <Button variant="outline" role="combobox"
                                disabled={IsDisabled} className="w-full justify-between capitalize">
                                    {field.value ? types.find(i => i.id === field.value)?.name : "Select Type"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            }>
                                <Command>
                                    <CommandInput placeholder="Filter ..." />
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup>
                                            {types.map((item, i) => (
                                                <CommandItem key={i} value={item.id} onSelect={(value) => {
                                                    setValue("type", value.toUpperCase() as LyricsType);
                                                    setTriggerState(false);
                                                }}>
                                                    {item.name}
                                                    <CheckIcon className={cn("ml-auto h-4 w-4", item.id === field.value ? "opacity-100" : "opacity-0")} />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </MagicBox>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="dop"
                render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                        <FormLabel>Date Of Publish</FormLabel>
                        <FormControl>
                            <MagicBox open={dateTrigger} onOpenChange={setDateTrigger} asChild trigger={
                                <Button     disabled={IsDisabled} variant="outline" className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}>
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            }>
                                <Calendar
                                    mode="single"
                                    onSelect={field.onChange}
                                    captionLayout="dropdown-buttons"
                                    fromYear={1990}
                                    toYear={new Date().getFullYear()}
                                    selected={new Date(field.value as Date)}
                                />
                            </MagicBox>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2">
            <FormField
                control={form.control}
                name="reciterId"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Reciter</FormLabel>
                        <FormControl>
                            <MagicBox open={reciterState} onOpenChange={setReciterState} trigger={
                                <Button variant="outline" role="combobox"
                                disabled={IsDisabled}className="w-full justify-between capitalize">
                                    {field.value ? reciters.find(i => i.id === field.value)?.name : "Select Type"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            }>
                                <Command>
                                    <CommandInput placeholder="Filter ..." />
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup>
                                            {reciters.map((item, i) => (
                                                <CommandItem key={i} value={item.id} onSelect={(value) => {
                                                    setValue("reciterId", value);
                                                    setReciterState(false);
                                                }}>
                                                    {item.name}
                                                    <CheckIcon className={cn("ml-auto h-4 w-4", item.id === field.value ? "opacity-100" : "opacity-0")} />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </MagicBox>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="writers"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Writers</FormLabel>
                        <FormControl>
                            <MultiSelectFormField
                                disabled={IsDisabled}
                                title="Writers"
                                options={writers}
                                model="writer"
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                                placeholder="Select options"
                                variant="inverted"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2">
            <FormField
                control={form.control}
                name="otherReciters"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Other Reciter</FormLabel>
                        <FormControl>
                            <MultiSelectFormField
                                title="Other Reciters"
                                model="reciter"
                                options={otherReciters}
                                disabled={IsDisabled}
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                                placeholder="Select more Reciters"
                                variant="inverted"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="topics"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Topics</FormLabel>
                        <FormControl>
                            <MultiSelectFormField
                                disabled={IsDisabled}
                                title="Topics"
                                model="topic"
                                options={topics}
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                                placeholder="Select options"
                                variant="inverted"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </>
}

export default LyricsInputs

import React from 'react'
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { getTimeAgo } from '@/lib/date';
import Link from 'next/link';

interface Props {
    item: any
}

const ReportCard = ({ item }: Props) => {
    const { mistaken, correct, createdAt, status, lyrics: { title, slug, reciter: { slug: reciter } } } = item;
    return (
        <Card className=''>
            <CardHeader className='relative'>
                <p> On:
                    <Link className='a ml-2 opacity-60' href={`/lyrics/${reciter}/${slug}`}>{title}</Link>
                </p>
                <div className='-mt-2 opacity-50'>{getTimeAgo(Number(createdAt))}</div>
                <div className='absolute top-2 right-2'>
                    <Badge
                        variant={status === "PENDING" ? "secondary" : (status === "APPROVED" ? "default" : "destructive")}
                    >{status}</Badge>
                </div>
            </CardHeader>
            <CardContent className=' flex items-center justify-center gap-2'>
                <div className='w-full'>
                    <p>Mistaken</p>
                    <Textarea className='min-h-[100px] h-full -mt-2' value={mistaken} readOnly />
                </div>
                <div className='w-full'>
                    <p>Correction</p>
                    <Textarea className='min-h-[100px] h-full -mt-2' value={correct} readOnly />
                </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}

export default ReportCard

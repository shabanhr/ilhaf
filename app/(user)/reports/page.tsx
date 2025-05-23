import NoResults from '@/components/NoResults';
import { currentUser } from '@/config/auth'
import React from 'react'
import { getData } from './actions';
import { LoadMore} from '@/components/load-more';
import { redirect } from 'next/navigation';


export default async function Favorite() {

    const user = await currentUser();
        if (!user || !user.id) return redirect('/auth');
    
    const { data, count } = await getData({ page: 1, userId: user.id })

    if (data[0]) {
        return (
            <>
                <div className='grid md:grid-cols-2 gap-3 w-full'>
                    {data}
                </div>
                <LoadMore className='lg:grid-cols-2' Func={getData} count={count} perPage={8} additionalProps={{ userId: user.id }} />
            </>
        )
    } else {
        return <NoResults />
    }
}

import React from 'react'
import { Skeleton } from '../ui/skeleton'
import AuthDivider from './AuthDivider'

const AuthLoader = () => {
  return (
    <div className="space-y-5 w-full">
      <Skeleton className='min-h-[14px] w-[50px]' />
      <Skeleton className='min-h-[42px] w-full rounded-lg' />
      <Skeleton className='min-h-[42px] w-full rounded-full' />
      <AuthDivider />
      <Skeleton className='min-h-[42px] mt-5 w-full rounded-full' />
    </div>
  )
}

export default AuthLoader

import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Headset } from 'lucide-react'

const CallToAction = () => {
  return (
    <div className='bg-accent/70 rounded-lg p-4 my-10 flex flex-col items-center justify-center max-w-6xl'>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <h2 className='text-base md:text-lg font-semibold'>
          Have any Questions?
        </h2>
        <p className='opacity-80 text-center text-foreground'>
          Feel free to reach out to us with any questions or concerns you may have. Whether you're looking for specific lyrics, need help navigating the site, or have any other inquiries, we're here to help!
        </p>
      </div>
      <div className='w-full flex items-center justify-center py-4'>
        <Link className={buttonVariants({ size: 'lg' })} href="/contact">
          <Headset className='mr-1 size-5' />
          Contact Us
        </Link>
      </div>
    </div>
  )
}

export default CallToAction

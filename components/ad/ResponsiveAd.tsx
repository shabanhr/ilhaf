import React from 'react'
import { AdBanner } from './AdBanner';


type AdBannerTypes = {
    mobile: {
        slot: string;
        width: number;
        height: number;
    }
    desktop: {
        slot: string;
        width: number;
        height: number;
    }
};


const ResponsiveAd = ({ mobile, desktop }: AdBannerTypes) => {
    return (
        <>
            <div className='md:hidden'>
                <AdBanner
                    slot={mobile.slot}
                    width={mobile.width}
                    height={mobile.height}
                />
            </div>
            <div className='hidden md:block'>
                <AdBanner
                    slot={desktop.slot}
                    width={desktop.width}
                    height={desktop.height}
                />
            </div>

        </>
    )
};

export default ResponsiveAd 
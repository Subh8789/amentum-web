//import TableWithHeader from '@/components/TableWithHeader';
"use client";
import TrackingForm from '@/components/TrackingForm';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const ApplicationDetail = () => {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get("trackingCode");
  return (
    <div>
        <TrackingForm trackingCode={trackingCode}/>
    </div>
  )
}

export default ApplicationDetail;

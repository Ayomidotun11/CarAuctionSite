'use client';

import { deleteAuction } from '@/app/actions/auctionActions';
import { Button, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    id: string
}

export default function DeleteButton({id}: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function doDelete() {
        setLoading(true);
        deleteAuction(id)
            .then(res => {
                if (res.error) throw res.error;
                router.push('/');
            }).catch(error => {
                toast.error(error.status + ' ' + error.message)
            }).finally(() => setLoading(false)) 
    }

    return (
        <Button color="failure" onClick={doDelete} disabled={loading}>
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <span>Deleting...</span>
          </div>
        ) : (
          'Delete Auction'
        )}
      </Button>
    )
}

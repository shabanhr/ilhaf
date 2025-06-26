    export function getRequestBadgeVariant(status: string) {
        switch (status) {
            case 'pending':
                return 'outline';
            case 'approved':
                return 'default';
            case 'rejected':
                return 'destructive';
        }
    }
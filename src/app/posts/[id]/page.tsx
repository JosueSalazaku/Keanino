import type { PageParams } from '~/types';
    
export default function Page({ params }: { params: PageParams }) {
    return (
      <div>My slug is: {params.id}</div>
    )
  }
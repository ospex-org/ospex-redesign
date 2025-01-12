'use client'

import ContestDetail from '../../../components/contest/ContestDetail'

export default function ContestPage({ params }: { params: { id: string } }) {
  return <ContestDetail contestId={params.id} />
}

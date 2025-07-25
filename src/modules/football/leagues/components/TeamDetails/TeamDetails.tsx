'use client'

import Image from 'next/image'
import { EmptyData } from '@/components/EmptyData'
import { useTeamDetailsStore } from '../../store/useTeamDetailsStore'

export const TeamDetails = () => {
  const { team } = useTeamDetailsStore()

  if (!team) {
    return <EmptyData />
  }

  return (
    <div key={team.id} className="justify-center p-4">
      <div className="mb-6 flex items-center gap-4 text-neutral-white">
        <Image
          src={team.crest}
          alt={team.name}
          width={120}
          height={120}
          className="rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-bold ">{team.name}</h2>
          <span className="text-sm ">{team.tla}</span>
        </div>
      </div>

      <div className="space-y-4">
        <InfoItem label="Estádio" value={team.address} />
        <InfoItem label="Website" value={team.website} />
        <InfoItem
          label="Fundação"
          value={team.founded?.toString() || 'Não informado'}
        />
        <InfoItem label="Cores do Clube" value={team.clubColors} />
      </div>
    </div>
  )
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-neutral-grey pb-2">
    <span className="font-medium ">{label}: </span>
    <span>{value}</span>
  </div>
)

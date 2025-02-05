'use client'

import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchTeamFormData, searchTeamFormSchema } from './schema'

export function SearchTeamForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchTeamFormData>({
    resolver: zodResolver(searchTeamFormSchema),
  })

  const onSubmit = (data: SearchTeamFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Input
        placeholder="Digite o nome do time que voce deseja buscar"
        error={errors.teamName?.message}
        className="min-w-96"
        {...register('teamName')}
      />
    </form>
  )
}

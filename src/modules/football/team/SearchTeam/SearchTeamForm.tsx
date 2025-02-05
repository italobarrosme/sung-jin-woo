'use client'

import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchTeamFormData, searchTeamFormSchema } from './schema'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { cn } from '@/utils/cn'
import { getTeamAction } from '../actions'
export function SearchTeamForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchTeamFormData>({
    mode: 'onChange',
    resolver: zodResolver(searchTeamFormSchema),
  })

  const teamName = watch('teamName')
  const [debouncedValue, setValueDebounced] = useDebounceValue(teamName, 900)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: SearchTeamFormData) => {
    try {
      setIsLoading(true)
      const response = await getTeamAction(data.teamName)
      console.log(response, 'RESPONSE')
    } catch (error) {
      console.log(error, 'ERROR')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (debouncedValue) {
      setValue('teamName', debouncedValue)
      handleSubmit(onSubmit)()
    }
  }, [debouncedValue, handleSubmit])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        `group fixed bottom-5 left-16 flex items-center justify-start w-14
        bg-complementary-highlight rounded-full p-2 transition-all duration-300 ease-in-out
        focus-within:w-96 focus-within:h-auto focus-within:bg-transparent focus-within:px-4`,
        {
          'opacity-100 min-w-96': errors.teamName,
        },
      )}
    >
      <Icon
        icon="mdi:search"
        width={24}
        height={24}
        className={cn(
          'text-neutral-white absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 group-focus-within:opacity-0',
          {
            'opacity-0': errors.teamName,
          },
        )}
      />

      <Input
        placeholder="Busque pelo nome do seu time"
        className={cn(
          'opacity-0 w-14 transition-all duration-300 ease-in-out rounded-full group-focus-within:opacity-100 group-focus-within:w-96',
          {
            'opacity-100 min-w-96': errors.teamName,
          },
        )}
        error={errors.teamName?.message}
        {...register('teamName')}
        onChange={(e) => setValueDebounced(e.target.value)}
      />

      {isLoading && (
        <Icon
          icon="mdi:loading"
          width={24}
          height={24}
          className="absolute right-0 top-4 animate-spin text-complementary-highlight"
        />
      )}
    </form>
  )
}

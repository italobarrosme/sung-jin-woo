import { Icon } from '@iconify/react'

export const EmptyData = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Icon icon="mdi:information" className="text-4xl text-neutral-grey" />
        <h1 className="text-2xl font-bold text-neutral-grey">
          Nenhum dado encontrado
        </h1>
      </div>
    </div>
  )
}

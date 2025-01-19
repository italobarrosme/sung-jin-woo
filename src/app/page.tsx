import { Button } from '@/components/Button'

export default function Home() {
  return (
    <div className="bg-neutral-black text-neutral-white p-4 flex flex-col items-center justify-center h-screen gap-4">
      <h1>Welcome to boilerplate Nextjs 15</h1>

      <Button variant="fit-secondary">Click me</Button>
    </div>
  )
}

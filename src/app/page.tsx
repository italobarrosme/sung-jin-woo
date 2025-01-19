import { Button } from '@/components/Button'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-neutral-black p-4 text-neutral-white">
      <h1>Welcome to boilerplate Nextjs 15</h1>

      <Button variant="fit-secondary">Click me</Button>
    </div>
  )
}

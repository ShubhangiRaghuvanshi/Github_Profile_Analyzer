import { Input } from "@/components/ui/input"



import { Button } from "@/components/ui/button"
import { useState } from "react"

type Props = {
  onSearch: (username: string) => void
}

export default function UsernameForm({ onSearch }: Props) {
  const [username, setUsername] = useState("")
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button className="bg-white text-black border" onClick={() => onSearch(username)}> Search </Button>
    </div>
  )
}

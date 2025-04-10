type Repo = {
    id: number
    name: string
    html_url: string
    description: string
  }
  
  export default function RepoList({ repos }: { repos: Repo[] }) {
    return (
      <ul className="space-y-2 mt-4">
        {repos.map((repo) => (
          <li key={repo.id} className="border p-4 rounded-lg shadow">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
              {repo.name}
            </a>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>
    )
  }
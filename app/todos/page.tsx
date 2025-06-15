import { createClient } from '../utils/supabase/server'
import { cookies } from 'next/headers'

interface Todo {
  id: string
  title: string
  // Add other todo properties as needed
}

export default async function Page() {
  // No need to pass cookieStore - createClient handles it internally
  const supabase = createClient()

  const { data: todos } = await supabase.from('todos').select('*')

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
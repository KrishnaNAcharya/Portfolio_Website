import { memo } from 'react'
import { LoadingProps } from '@/lib/types'

const Loading = memo(function Loading({ setLoading }: LoadingProps = {}) {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
})

Loading.displayName = 'Loading'

export default Loading

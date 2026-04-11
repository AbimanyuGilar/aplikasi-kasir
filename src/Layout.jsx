import { Outlet } from 'react-router'

function Layout() {

  return (
    <div className='px-5 h-[calc(100vh-1.8rem)] overflow-hidden flex flex-col'>
      <Outlet />
    </div>
  )
}

export default Layout

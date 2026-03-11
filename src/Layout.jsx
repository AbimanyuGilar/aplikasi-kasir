import { Outlet } from 'react-router'

function Layout() {

  return (
    <div className='px-5 h-[calc(100vh-3rem)] overflow-hidden flex flex-col'>
      <Outlet />
    </div>
  )
}

export default Layout

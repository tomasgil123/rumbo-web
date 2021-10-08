import React, { useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import cx from 'classnames'
// utils
import { setLocalAccessToken, setLocalRefreshToken } from 'utils/session'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useInitialData from 'hooks/useInitialData'

enum PageSections {
  dashboard = 'dashboard',
  tasks = 'tareas',
}

const Navbar = (): JSX.Element => {
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey, distributorLogo, distributorName } =
    useInitialDataDistributor(distributorId, auditProgram)

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const location = useLocation()
  const history = useHistory()

  const stylesMobileMenu = cx({ hidden: !showMobileMenu })
  const stylesLinkDesktop = (isActive: boolean): string => {
    return cx('capitalize font-semibold py-4 px-2 border-b-4 transition duration-300', {
      'text-primary-light border-primary-light': isActive,
      'text-gray-500 border-transparent': !isActive,
    })
  }

  const logOut = (): void => {
    setLocalAccessToken('')
    setLocalRefreshToken('')
    history.push('/')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-0">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="text-primary font-bold text-3xl self-center">
              <Link to="/dashboard">Rumbo</Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                className={stylesLinkDesktop(location.pathname.includes(PageSections.dashboard))}
                to={`/${PageSections.dashboard}`}
              >
                {PageSections.dashboard}
              </Link>
              <Link
                className={stylesLinkDesktop(location.pathname.includes(PageSections.tasks))}
                to={`/${PageSections.tasks}`}
              >
                {PageSections.tasks}
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            <div className="flex flex-row items-center">
              <div className="py-2 px-2 font-medium text-gray-500 rounded  hover:text-white transition duration-300">
                {distributorName}
              </div>
              <div className="m-1  ">
                {distributorLogo ? (
                  <img className="w-10 h-10 rounded-full ring-1 ring-black" src={distributorLogo} />
                ) : (
                  <i className="icon-user text-2xl rounded-full ring-1 ring-black ring-offset-4	" />
                )}
              </div>
            </div>
            <button
              onClick={logOut}
              className="font-bold py-2 px-2 text-white bg-primary-light rounded hover:bg-primary transition duration-300"
            >
              Log out
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={(): void => setShowMobileMenu(!showMobileMenu)}
              className="outline-none"
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={stylesMobileMenu}>
        <ul className="">
          <li className="active">
            <Link
              className="capitalize block text-sm px-2 py-4 border-t border-gray-400"
              to={PageSections.dashboard}
            >
              {PageSections.dashboard}
            </Link>
          </li>
          <li>
            <Link
              className="capitalize block text-sm px-2 py-4 border-t border-gray-400"
              to={PageSections.tasks}
            >
              {PageSections.tasks}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

import Link from 'next/link'
export default ( {currentUser} ) => {

  const links = [
    !currentUser && {
      label: 'Sign Up',
      link: '/auth/signup'
    },
    !currentUser && {
      label: 'Sign In',
      link: '/auth/signin'
    },
    currentUser && {
      label: 'Sign Out',
      link: '/auth/signout'
    }
  ].filter(linkConfig => linkConfig)
  .map(({label, link})=> {
    return <li key={label} className="nav-item"> 
      <Link href={link}>
        <a className="nav-link"> {label} </a>
      </Link>
    </li>
  })

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand"> Tix </a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  )

}
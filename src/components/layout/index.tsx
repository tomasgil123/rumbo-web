import Navbar from 'components/navbar'
// high order component to add a navbar to a screen
const Layout =
  (Screen: () => JSX.Element) =>
  (props: any): JSX.Element => {
    return (
      <div>
        <Navbar />
        <Screen {...props} />
      </div>
    )
  }

export default Layout

// components
import Navbar from 'components/navbar'
import Footer from 'components/footer'
// high order component to add a navbar to a screen
const Layout =
  (Screen: () => JSX.Element) =>
  (props: any): JSX.Element => {
    return (
      <div className="relative min-h-screen">
        <Navbar />
        <div className="pb-32">
          <Screen {...props} />
        </div>

        <Footer />
      </div>
    )
  }

export default Layout

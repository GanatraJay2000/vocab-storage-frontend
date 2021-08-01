import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import routes from './util/routes';
import Header from './components/header'
import Footer from './components/footer'

function App() {
  return (<main className="h-100 d-flex flex-column">
    <Header />
    <section className="wrapper m-4">
      <Suspense
						fallback={
          <>
            <div className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
            </>
						}
					>
						<Switch>
							{routes.map((route, index) => (
								<Route {...route} />
							))}
						</Switch>
      </Suspense>
    </section>  
      <Footer/>
    </main>
  );
}

export default App;

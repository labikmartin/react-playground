import { lazy, Suspense, useLayoutEffect, useState } from 'react';
import './App.css';
const D3NetworkMapPage = lazy(() => import('@D3NetworkMap/D3NetworkMapPage'));
const PlaygroundPage = lazy(() => import('@Playground/PlaygroundPage'));

const apps = [
  {
    id: 'react-playground',
    name: 'React Playground',
    description: 'A clean React playground',
    component: PlaygroundPage,
  },
  {
    id: 'd3js-network-map',
    name: 'D3.js Network Map',
    description: 'A network map built with D3.js',
    component: D3NetworkMapPage,
  },
] as const;

type App = (typeof apps)[number];

const activeAppLocalStorageKey = 'app' as const;

function App() {
  const [activeApp, setActiveApp] = useState<App | null>(null);
  const Page = activeApp?.component || (() => <></>);

  function handleSetActivePage(app: App) {
    localStorage.setItem(activeAppLocalStorageKey, app.id);

    setActiveApp(app);
  }

  useLayoutEffect(() => {
    const activeAppId = localStorage.getItem(activeAppLocalStorageKey);
    const activeApp = apps.find((app) => app.id == activeAppId);

    if (activeApp) {
      setActiveApp(activeApp);
    }
  }, []);

  return (
    <>
      <nav>
        <ul>
          {apps.map((app) => (
            <li key={app.id}>
              <button type="button" onClick={() => handleSetActivePage(app)}>
                {app.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        {activeApp == null && (
          <section className="section">
            <h1>Welcome to the React Playground App</h1>
            <p>Select an app from the navigation to get started.</p>
          </section>
        )}
        <section className="section">
          <Suspense fallback={<div>Loading...</div>}>
            <Page />
          </Suspense>
        </section>
      </main>
    </>
  );
}

export default App;

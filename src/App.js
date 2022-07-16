import { Box, LinearProgress } from '@mui/material';
import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import headerRoutes from './routes/headerRoutes';
import contentRoutes from './routes/contentRoutes';


function App() {
  return (
    <>
      {/* headerRoutes */}
      <Routes>
        {headerRoutes.map((c) => {
          return <Route
            key={c.path}
            path={c.path}
            element={(
              <React.Suspense fallback={(
                <Box sx={{ width: '100%', py: 2 }}>
                  <LinearProgress color='error' />
                </Box>
              )}>{c.element}</React.Suspense>
            )} />
        })}
      </Routes>
      {/* contentRoutes */}
      <Routes>
        {contentRoutes.map((c) => {
          return <Route
            key={c.path}
            path={c.path}
            element={(
              <React.Suspense fallback={(
                <Box sx={{ width: '100%', py: 2 }}>
                  <LinearProgress color='error' />
                </Box>
              )}>{c.element}</React.Suspense>
            )} />
        })}
      </Routes>
    </>
  );
}

export default App;

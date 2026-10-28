import React from 'react';
import { createRoot } from 'react-dom/client';
// global.css must load before App so responsive.css (imported by App) can override it.
import './styles/global.css';
import App from './App';
import './styles/usability.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

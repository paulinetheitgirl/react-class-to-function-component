import ReactDOM from 'react-dom';
import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import SpaceXLaunches from './components/SpaceX/SpaceXLaunches';
import './styles/output.css';

// Create a client
const queryClient = new QueryClient();

const App = () => {
    return (
        // Provide the query client
        <QueryClientProvider client={queryClient}>
            <SpaceXLaunches/>
        </QueryClientProvider>);
 }
ReactDOM.render(<App />, document.getElementById('app'));
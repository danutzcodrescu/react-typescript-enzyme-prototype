import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css';

export function LoadingComponent() {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
}

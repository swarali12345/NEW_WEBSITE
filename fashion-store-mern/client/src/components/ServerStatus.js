import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

const ServerStatus = () => {
  const [serverStatus, setServerStatus] = useState('unknown');

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get('/api/healthcheck');
        if (response.data && response.data.status === 'ok') {
          setServerStatus('online');
        } else {
          setServerStatus('error');
        }
      } catch (error) {
        console.error('Server health check failed:', error);
        setServerStatus('offline');
      }
    };

    checkServerStatus();
  }, []);

  if (serverStatus === 'unknown' || serverStatus === 'online') {
    return null;
  }

  return (
    <Alert variant={serverStatus === 'offline' ? 'danger' : 'warning'} className="mb-4">
      {serverStatus === 'offline' ? (
        <>
          Server is currently offline. Login and registration features may not work.
          Using demo mode with local storage only.
        </>
      ) : (
        <>
          Server connection issue. Some features may be limited.
        </>
      )}
    </Alert>
  );
};

export default ServerStatus; 
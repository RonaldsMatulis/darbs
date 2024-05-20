import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:3000";

const BinStatus = () => {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('binReported', data => {
      setBins(bins => [...bins, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Atkritumu tvertņu statusi</h2>
      <ul>
        {bins.map(bin => (
          <li key={bin._id}>Atrašanās vieta: {bin.location}, Statuss: {bin.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default BinStatus;

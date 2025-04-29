import React, { useEffect, useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import styles from './OnlinePlayerCount.module.css';

const OnlinePlayerCount = () => {
  const { socket, isConnected } = useSocket();
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!socket || !isConnected) return;
    // Request the current online player count
    socket.emit('getOnlinePlayerCount', (n) => {
      setCount(n);
    });
    // Listen for real-time updates
    const handler = (n) => setCount(n);
    socket.on('onlinePlayerCountUpdate', handler);
    return () => {
      socket.off('onlinePlayerCountUpdate', handler);
    };
  }, [socket, isConnected]);

  if (count === null) return null;
  return (
    <div className={styles.pill}>
      <span className={styles.pulse} />
      <span className={styles.text}>{count} online</span>
    </div>
  );
};

export default OnlinePlayerCount;

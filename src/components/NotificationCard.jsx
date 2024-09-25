import React from 'react';

function NotificationCard({ item }) {
  return (
    <div className="my-2">
      <p>{item.description}</p>
    </div>
  );
}

export default NotificationCard;

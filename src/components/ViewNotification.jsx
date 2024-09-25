import React, { useEffect, useState } from 'react';
import NotificationCard from './NotificationCard';
import { MAIN_IMAG_URL, deleteNotification, fetchNotification } from '../api';
import { errorToast } from '../toast';
import { filterNotificationOnlyManual } from '../utils';
import { Link } from 'react-router-dom';

function ViewNotification() {
  const [notifications, setNotifications] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [textLimit, setTextLimit] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNotification();
        const filteredNotifications = filterNotificationOnlyManual(
          response.result
        );
        setNotifications(filteredNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleToggleDetails = itemId => {
    setExpandedItemId(itemId === expandedItemId ? null : itemId);
  };

  const handleDelete = async id => {
    if (!id) return errorToast('Id Is Not Provided!');

    try {
      await deleteNotification(id);
      setRefresh(!refresh);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message || error.message);
      }
    }
  };

  return (
    <section>
      {notifications.length > 0 &&
        notifications.map(item => (
          <div
            key={item._id}
            className='sf-medium rounded-[5px] px-4 my-2 py-2 border shadow-md'
          >
            <div className='flex justify-between items-center'>
              <p className='flex-1'>
                {expandedItemId === item._id ? (
                  <>
                    {item.title}
                    <span
                      className='font-semibold cursor-pointer'
                      onClick={() => handleToggleDetails(item._id)}
                    >
                      {' '}
                      ...read less
                    </span>
                  </>
                ) : (
                  <>
                    {item.title && item.title.length > 250 ? (
                      <>
                        {item.title.slice(0, 250)}
                        <span
                          className='font-semibold cursor-pointer'
                          onClick={() => handleToggleDetails(item._id)}
                        >
                          {' '}
                          ...read more
                        </span>
                      </>
                    ) : (
                      item.title
                    )}
                  </>
                )}
              </p>
              {item.mainImgaeLink && (
                <img
                  src={MAIN_IMAG_URL + '/' + item.mainImgaeLink}
                  className='w-[80px] h-[80px] rounded-[5px] overflow-hidden object-cover'
                  alt={item.title}
                />
              )}
            </div>
            <div className='text-sm flex justify-start mt-2 mb-1.5 me-5 text-red-600'>
              {!item.mainImgaeLink && (
                <>
                  <Link
                  to={`/admin/edit-notification/${item._id}`}
                    className='w-[100px] me-2 h-[28px] flex text-xs text-white justify-center items-center bg-green-500 rounded  '
                    
                  >
                    Edit
                  </Link>

                  <a
                    className='w-[100px] h-[28px] flex text-xs text-white justify-center items-center bg-red-500 rounded  '
                    onClick={() => {
                      const status = confirm('Are you want to delete!');
                      if (status) {
                        handleDelete(item._id);
                      }
                    }}
                  >
                    Delete
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
    </section>
  );
}

export default ViewNotification;

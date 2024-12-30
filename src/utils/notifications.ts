export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return;
  }

  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }
};

export const scheduleNotification = (title: string, daysLeft: number) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: `${daysLeft} day${daysLeft === 1 ? '' : 's'} remaining`,
      icon: '/vite.svg',
    });
  }
};
import BackgroundJob from 'react-native-background-actions';
const sleep = (time) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));
const taskRandom = async (taskData) => {
  if (Platform.OS === 'ios') {
    console.warn(
      'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
      'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
    );
  }
  await new Promise(async (resolve) => {
    // For loop with a delay
    const {delay} = taskData;
    for (let i = 0; BackgroundJob.isRunning(); i++) {
      // console.log('Runned -> ', i);
      // await BackgroundJob.updateNotification({
      //   progressBar: {
      //     max: 50,
      //     value: 27,
      //     //indeterminate: true,
      //   },
      // });
      await sleep(delay);
    }
  });
};
const options = {
  taskName: 'RunningZone',
  taskTitle: 'Running Zone',
  taskDesc: 'app is running',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  //  linkingURI: 'exampleScheme://chat/jane',
  parameters: {
    delay: 36000,
  },
};
export const backgroundTask = async () => {
  try {
    console.log('Trying to start background service');
    await BackgroundJob.start(taskRandom, options);
    console.log('Successful start!');
  } catch (e) {
    console.log('Error', e);
  }
};

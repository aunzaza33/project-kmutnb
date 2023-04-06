import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = () => {
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);

  const switchCamera = () => {
    if (cameraType === RNCamera.Constants.Type.back) {
      setCameraType(RNCamera.Constants.Type.front);
    } else {
      setCameraType(RNCamera.Constants.Type.back);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={cameraType}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
      />

      <TouchableOpacity onPress={switchCamera}>
        <Text>Switch Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;
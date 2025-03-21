import React, { useRef, useState } from 'react';
import { View, Button, Alert, Image, TouchableOpacity, Text } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from '../components/Api';

const SignaturePad = () => {
  const ref = useRef(null);
  const [signature, setSignature] = useState(null);
  const [image, setImage] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleOK = (signatureData) => {
    setSignature(signatureData);
    setIsSigning(false);
  };

  const handleClear = () => {
    ref.current.clearSignature();
    setSignature(null);
    setIsSigning(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });
    if (!result.canceled) {
      setImage(result.uri);
      setSignature(null);
    }
  };

  const uploadSignature = async () => {
    if (!signature) {
      Alert.alert('Error', 'No signature to upload');
      return;
    }
    setIsUploading(true);
    try {
      const token = await SecureStore.getItemAsync("jwtToken");
      const formattedToken = token.replace(/^"|"$/g, "");

      const formData = new FormData();
      formData.append('signatureFile', {
        uri: `data:image/png;base64,${signature}`,
        name: 'signature.png',
        type: 'image/png',
      });

      const response = await axios.post(
        `${API_BASE_URL}/customer/upload-signature`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${formattedToken}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Signature uploaded successfully');
      } else {
        Alert.alert('Error', 'Failed to upload signature');
      }
    } catch (error) {
      console.error('Error uploading signature:', error);
      Alert.alert('Error', 'Failed to upload signature');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Sign below or upload an image</Text>

      {!image && (
        <>
          {!isUploading && (
            <SignatureScreen
              ref={ref}
              onOK={handleOK}
              onEmpty={() => Alert.alert('Error', 'Please provide a signature')}
              autoClear={false}
              descriptionText='Sign here'
            />
          )}
          {signature && <Image source={{ uri: signature }} style={{ width: 200, height: 100, marginTop: 10 }} />}
          <Button title='Clear Signature' onPress={handleClear} disabled={!signature} />
        </>
      )}

      {!signature && (
        <TouchableOpacity onPress={pickImage} style={{ marginTop: 20 }}>
          <View style={{ padding: 10, backgroundColor: 'blue', alignItems: 'center' }}>
            <Button title='Upload Image' color='black' onPress={pickImage} />
          </View>
        </TouchableOpacity>
      )}

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 100, marginTop: 10 }} />}

      {signature && (
        <TouchableOpacity onPress={uploadSignature} style={{ marginTop: 20 }}>
          <View style={{ padding: 10, backgroundColor: 'green', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Submit Signature</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SignaturePad;

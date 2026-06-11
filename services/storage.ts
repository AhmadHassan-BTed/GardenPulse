import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Uploads a local image (e.g. from camera/library URI) to Firebase Storage.
 * Converts the local URI to a blob before uploading.
 * 
 * @param uri The local URI of the image (file:// or temporary device path)
 * @param path The destination path in Firebase Storage (e.g. 'users/uid/plants/plant_id.jpg')
 * @returns The public download URL of the uploaded image
 */
export async function uploadPlantImage(uri: string, path: string): Promise<string> {
  if (!uri) {
    throw new Error('Local image URI is required for upload');
  }
  
  try {
    // 1. Fetch the local URI to convert it to a Blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // 2. Create a reference to the storage path
    const storageRef = ref(storage, path);

    // 3. Upload the Blob
    await uploadBytes(storageRef, blob);

    // 4. Retrieve the download URL
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Firebase Storage upload failed:', error);
    throw error;
  }
}

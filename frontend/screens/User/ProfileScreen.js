// ProfileScreen.js - Modern Clean Layout
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    TextInput,
    Modal,
    Alert,
    Image,
    Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile as apiUpdateProfile, updatePassword as apiUpdatePassword } from '../../utils/api';
import { setUser } from '../../redux/authSlice';

// Password Modal Component
const PasswordModal = ({ visible, onClose }) => {
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const handleChangePassword = async () => {
        if (passwords.new !== passwords.confirm) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        try {
            const res = await apiUpdatePassword(passwords.current, passwords.new);
            Alert.alert('Success', 'Password changed successfully!');
            onClose();
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to update password');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                        <Text style={styles.modalCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Change Password</Text>
                    <TouchableOpacity onPress={handleChangePassword} activeOpacity={0.7}>
                        <Text style={styles.modalSave}>Save</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Current Password</Text>
                        <TextInput
                            style={styles.input}
                            value={passwords.current}
                            onChangeText={(text) => setPasswords({ ...passwords, current: text })}
                            placeholder="Enter current password"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            value={passwords.new}
                            onChangeText={(text) => setPasswords({ ...passwords, new: text })}
                            placeholder="Enter new password"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Confirm New Password</Text>
                        <TextInput
                            style={styles.input}
                            value={passwords.confirm}
                            onChangeText={(text) => setPasswords({ ...passwords, confirm: text })}
                            placeholder="Confirm new password"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const ProfileScreen = ({ navigation }) => {
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const [editedUser, setEditedUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthday: '',
    });

    useEffect(() => {
        if (user) {
            setEditedUser({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                birthday: user.birthday || '',
            });
        }
    }, [user]);

    const handleSave = async () => {
        if (isLoading) return;
        
        try {
            setIsLoading(true);
            
            if (!editedUser.firstName.trim() || !editedUser.lastName.trim()) {
                Alert.alert('Error', 'First name and last name are required');
                return;
            }

            if (!editedUser.email.trim()) {
                Alert.alert('Error', 'Email is required');
                return;
            }

            const formData = new FormData();
            formData.append('firstName', editedUser.firstName.trim());
            formData.append('lastName', editedUser.lastName.trim());
            formData.append('email', editedUser.email.trim());
            formData.append('birthday', editedUser.birthday || '');

            if (selectedAvatar && selectedAvatar.uri) {
                const getFileExtension = (mimeType, fileName) => {
                    if (fileName && fileName.includes('.')) {
                        return fileName.split('.').pop().toLowerCase();
                    }
                    if (mimeType) {
                        const typeMap = {
                            'image/jpeg': 'jpg',
                            'image/jpg': 'jpg', 
                            'image/png': 'png',
                            'image/gif': 'gif',
                            'image/webp': 'webp'
                        };
                        return typeMap[mimeType] || 'jpg';
                    }
                    return 'jpg';
                };

                const fileExtension = getFileExtension(selectedAvatar.mimeType, selectedAvatar.fileName);
                const finalFileName = selectedAvatar.fileName || `avatar.${fileExtension}`;
                const finalMimeType = selectedAvatar.mimeType || 'image/jpeg';

                formData.append('avatar', {
                    uri: selectedAvatar.uri,
                    type: finalMimeType,
                    name: finalFileName,
                });
            }

            const res = await apiUpdateProfile(formData);

            if (!res.data || !res.data.success) {
                throw new Error('Invalid response from server');
            }

            const { user: updatedUser, token: newToken } = res.data;

            if (!updatedUser) {
                throw new Error('No user data in response');
            }

            const payload = {
                user: {
                    ...updatedUser,
                    id: updatedUser.id || updatedUser._id,
                    _id: updatedUser._id || updatedUser.id,
                },
                token: newToken || token,
            };

            dispatch(setUser(payload));
            await AsyncStorage.setItem("userData", JSON.stringify(payload));

            setSelectedAvatar(null);
            setIsEditing(false);

            Alert.alert('Success', 'Profile updated successfully!');

        } catch (error) {
            console.error('❌ Profile update error:', error);
            
            let errorMessage = 'Failed to update profile';
            
            if (error.message.includes('Network connection failed')) {
                errorMessage = 'Network connection failed. Please check your internet connection and try again.';
            } else if (error.message.includes('timeout')) {
                errorMessage = 'Request timed out. Please try again with a smaller image.';
            } else if (error.message.includes('File too large')) {
                errorMessage = 'Image file is too large. Please choose a smaller image.';
            } else if (error.response?.status === 401) {
                errorMessage = 'Session expired. Please login again.';
            } else if (error.response?.data?.msg) {
                errorMessage = error.response.data.msg;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            Alert.alert('Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImagePicker = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert('Permission Denied', 'You need to allow access to your photos.');
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.7,
                allowsEditing: true,
                aspect: [1, 1],
                allowsMultipleSelection: false,
            });

            if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets[0]) {
                const selectedImage = pickerResult.assets[0];
                
                if (selectedImage.fileSize && selectedImage.fileSize > 5 * 1024 * 1024) {
                    Alert.alert('File Too Large', 'Please choose an image smaller than 5MB.');
                    return;
                }
                
                setSelectedAvatar(selectedImage);
            }
        } catch (error) {
            console.error('❌ Image picker error:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const getCurrentAvatarUri = () => {
        if (selectedAvatar?.uri) {
            return selectedAvatar.uri;
        }
        if (user?.avatar?.url) {
            return user.avatar.url;
        }
        return null;
    };

    const formatBirthday = (birthday) => {
        if (!birthday) return '';
        const date = new Date(birthday);
        return date.toISOString().split('T')[0];
    };

    const getFullName = (firstName, lastName) => {
        return `${firstName || ''} ${lastName || ''}`.trim() || 'User';
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <Icon name="arrow-back" size={22} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity 
                    onPress={() => setIsEditing(!isEditing)}
                    disabled={isLoading}
                    activeOpacity={0.7}
                    style={styles.editButtonContainer}
                >
                    <Text style={[styles.editButton, isLoading && { opacity: 0.5 }]}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Picture Section */}
                <View style={styles.profileSection}>
                    <TouchableOpacity
                        style={styles.avatarContainer}
                        onPress={isEditing ? handleImagePicker : undefined}
                        activeOpacity={isEditing ? 0.7 : 1}
                        disabled={isLoading}
                    >
                        {getCurrentAvatarUri() ? (
                            <Image 
                                source={{ uri: getCurrentAvatarUri() }} 
                                style={styles.avatar}
                                onError={(error) => console.error('Avatar image error:', error)}
                            />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>
                                    {(editedUser.firstName || user?.firstName || 'U').charAt(0).toUpperCase()}
                                </Text>
                            </View>
                        )}
                        {isEditing && !isLoading && (
                            <View style={styles.editIconContainer}>
                                <Icon name="camera-alt" size={14} color="#FFFFFF" />
                            </View>
                        )}
                    </TouchableOpacity>
                    
                    <Text style={styles.userName}>
                        {getFullName(editedUser.firstName || user?.firstName, editedUser.lastName || user?.lastName)}
                    </Text>
                    <Text style={styles.userEmail}>{editedUser.email || user?.email || 'user@example.com'}</Text>
                    {user?.tupId && (
                        <View style={styles.idBadge}>
                            <Text style={styles.userTupId}>ID: {user.tupId}</Text>
                        </View>
                    )}
                </View>

                {/* Profile Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.inputRow}>
                            <View style={styles.inputHalf}>
                                <Text style={styles.inputLabel}>First Name</Text>
                                <TextInput
                                    style={[styles.input, !isEditing && styles.inputDisabled]}
                                    value={editedUser.firstName}
                                    onChangeText={(text) => setEditedUser({ ...editedUser, firstName: text })}
                                    editable={isEditing && !isLoading}
                                    placeholder="First name"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>

                            <View style={styles.inputHalf}>
                                <Text style={styles.inputLabel}>Last Name</Text>
                                <TextInput
                                    style={[styles.input, !isEditing && styles.inputDisabled]}
                                    value={editedUser.lastName}
                                    onChangeText={(text) => setEditedUser({ ...editedUser, lastName: text })}
                                    editable={isEditing && !isLoading}
                                    placeholder="Last name"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <TextInput
                                style={[styles.input, !isEditing && styles.inputDisabled]}
                                value={editedUser.email}
                                onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                                editable={isEditing && !isLoading}
                                placeholder="Enter your email"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputRow}>
                            <View style={styles.inputHalf}>
                                <Text style={styles.inputLabel}>Birthday</Text>
                                <TextInput
                                    style={[styles.input, !isEditing && styles.inputDisabled]}
                                    value={formatBirthday(editedUser.birthday)}
                                    onChangeText={(text) => setEditedUser({ ...editedUser, birthday: text })}
                                    editable={isEditing && !isLoading}
                                    placeholder="YYYY-MM-DD"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>

                            {user?.tupId && (
                                <View style={styles.inputHalf}>
                                    <Text style={styles.inputLabel}>TUP ID</Text>
                                    <TextInput
                                        style={[styles.input, styles.inputDisabled]}
                                        value={user.tupId}
                                        editable={false}
                                        placeholder="TUP ID"
                                        placeholderTextColor="#9CA3AF"
                                    />
                                </View>
                            )}
                        </View>

                        {isEditing && (
                            <TouchableOpacity 
                                style={[styles.saveButton, isLoading && { opacity: 0.5 }]} 
                                onPress={handleSave}
                                disabled={isLoading}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.saveButtonText}>
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Security Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Security</Text>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => setShowPasswordModal(true)}
                            disabled={isLoading}
                            activeOpacity={0.7}
                        >
                            <Icon name="lock" size={18} color="#6366F1" />
                            <Text style={styles.optionText}>Change Password</Text>
                            <Icon name="chevron-right" size={18} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Change Password Modal */}
            <PasswordModal
                visible={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1F2937',
    },
    editButtonContainer: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    editButton: {
        fontSize: 15,
        color: '#6366F1',
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileSection: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        marginHorizontal: 16,
        paddingVertical: 32,
        paddingHorizontal: 20,
        borderRadius: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#6366F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    idBadge: {
        backgroundColor: '#F3F0FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    userTupId: {
        fontSize: 12,
        color: '#6366F1',
        fontWeight: '600',
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
        paddingLeft: 4,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    inputRow: {
        flexDirection: 'row',
        gap: 12,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputHalf: {
        flex: 1,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#1F2937',
    },
    inputDisabled: {
        backgroundColor: '#F3F4F6',
        color: '#6B7280',
        borderColor: '#D1D5DB',
    },
    saveButton: {
        backgroundColor: '#6366F1',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        elevation: 2,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    optionText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1F2937',
        flex: 1,
        marginLeft: 12,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        backgroundColor: '#FFFFFF',
    },
    modalTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1F2937',
    },
    modalCancel: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
    },
    modalSave: {
        fontSize: 15,
        color: '#6366F1',
        fontWeight: '600',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
    },
});

export default ProfileScreen;
import React from 'react';
import profileCover from '../../src/assets/images/profile.jpeg'
import useAuth from '../Hooks/useAuth';

const Profile = () => {
    const {user} = useAuth()

    const userData = {
        name: user?.displayName,
        email: user?.email,
        location: "Polashbari, Bangladesh",
        avatar: user?.photoURL,
        cover: "https://source.unsplash.com/800x300/?nature,abstract",
      };

    return (
        <div>
            <div className=" pb-20 pt-5 flex justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-xl  overflow-hidden">
                    {/* Cover Image */}
                    <div className="relative">
                        <img
                            src={profileCover}
                            alt="Cover"
                            className="w-full h-48 object-cover"
                        />
                        {/* Profile Image */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                            <img
                                src={userData.avatar}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full border-4  border-primary-color shadow-md"
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="mt-16 px-6 pb-6 text-center">
                        <h2 className="text-2xl font-bold text-secondary-color">{userData.name}</h2>
                        <p className="text-sm text-secondary-text">{userData.email}</p>

                        <div className="mt-4">
                            <button className="btn bg-primary-color rounded-full text-primary-text px-6">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
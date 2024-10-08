import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from '../../stores/slices/authSlice';
import "../../components/Header.css";

const ProfileField = ({ label, value }) => (
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <span className="flex-grow">{value}</span>
      <span className="ml-4 flex-shrink-0">

      </span>
    </dd>
  </div>
);


export default function UserProfile() {
  const dispatch = useDispatch();
  const { userId, userProfile, isLoading, error } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (userId) {
        dispatch(fetchUserProfile(userId));
    } else {
        console.log("User ID is not available.");
    }
}, [dispatch, userId]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>This user does not exist</div>;
  }

  return (
    <div className="lg:pl-64">
      <div className="lg:px-8">
        <div className="mx-auto flex flex-col lg:max-w-4xl">
          <main className="flex-1">
            <div className="relative mx-auto max-w-4xl">
              <div className="pb-16 pt-10">
                <div className="px-4 sm:px-6 lg:px-0">
                  <div className="py-6">
                    <div className="mt-10 divide-y divide-gray-200">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                          This information will be displayed publicly so be careful what you share.
                        </p>
                      </div>
                      <div className="mt-6">
                        <dl className="divide-y divide-gray-200">
                          <ProfileField label="User Name:" value={userProfile.username} />
                          <ProfileField label="Email" value={userProfile.email} />
                          <ProfileField label="Address" value={userProfile.address} />
                          <ProfileField label="Phone" value={userProfile.phoneNumber} />
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>   
    </div>
    
  );
}
import React, { useState, useEffect } from 'react';
import { User, Mail, Briefcase, Heart, FileText, Linkedin, Github, Award, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile, getUserStats } from '../../services/profileApi';
import { showToast } from '../Toast/CustomToast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    favoriteCount: 0,
    totalProblemsGenerated: 0
  });

  const [formData, setFormData] = useState({
    name: user?.name || '',
    organization: user?.organization || '',
    socialLinks: {
      linkedin: user?.socialLinks?.linkedin || '',
      leetcode: user?.socialLinks?.leetcode || '',
      codeforces: user?.socialLinks?.codeforces || '',
      github: user?.socialLinks?.github || ''
    }
  });

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await getUserStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialField = name.split('.')[1];
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [socialField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateProfile(formData);
      if (response.success) {
        showToast.success('Profile updated successfully');
        updateUser(response.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      showToast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      organization: user?.organization || '',
      socialLinks: {
        linkedin: user?.socialLinks?.linkedin || '',
        leetcode: user?.socialLinks?.leetcode || '',
        codeforces: user?.socialLinks?.codeforces || '',
        github: user?.socialLinks?.github || ''
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-[#00607a] to-[#00485a] rounded-2xl shadow-2xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User size={48} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{user?.name || 'User'}</h2>
            <div className="flex items-center space-x-2 text-gray-200">
              <Mail size={18} />
              <span>{user?.email}</span>
            </div>
            {user?.organization && (
              <div className="flex items-center space-x-2 text-gray-200 mt-1">
                <Briefcase size={18} />
                <span>{user.organization}</span>
              </div>
            )}
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-white text-[#00607a] rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#00607a] rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-200 text-sm mb-1">Favorite Problems</p>
              <p className="text-4xl font-bold">{stats.favoriteCount}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart size={32} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#00607a] rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-200 text-sm mb-1">Problems Generated</p>
              <p className="text-4xl font-bold">{stats.totalProblemsGenerated}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FileText size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-[#00607a] rounded-2xl shadow-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Profile Information</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
              className="w-full px-4 py-3 bg-[#002029] text-white rounded-lg border border-[#005066] focus:border-[#00a8cc] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 bg-[#001a21] text-gray-400 rounded-lg border border-[#003844] cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          {/* Organization */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Organization
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Your university or company"
              className="w-full px-4 py-3 bg-[#002029] text-white rounded-lg border border-[#005066] focus:border-[#00a8cc] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Social Links Section */}
          <div className="border-t border-[#005066] pt-6">
            <h4 className="text-xl font-semibold text-white mb-4">Social Profiles</h4>
            
            {/* LinkedIn */}
            <div className="mb-4">
              <label className="flex items-center text-gray-200 text-sm font-medium mb-2">
                <Linkedin size={18} className="mr-2" />
                LinkedIn
              </label>
              <input
                type="url"
                name="social.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-4 py-3 bg-[#002029] text-white rounded-lg border border-[#005066] focus:border-[#00a8cc] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* LeetCode */}
            <div className="mb-4">
              <label className="flex items-center text-gray-200 text-sm font-medium mb-2">
                <Award size={18} className="mr-2" />
                LeetCode
              </label>
              <input
                type="url"
                name="social.leetcode"
                value={formData.socialLinks.leetcode}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://leetcode.com/yourprofile"
                className="w-full px-4 py-3 bg-[#002029] text-white rounded-lg border border-[#005066] focus:border-[#00a8cc] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Codeforces */}
            <div className="mb-4">
              <label className="flex items-center text-gray-200 text-sm font-medium mb-2">
                <Award size={18} className="mr-2" />
                Codeforces
              </label>
              <input
                type="url"
                name="social.codeforces"
                value={formData.socialLinks.codeforces}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://codeforces.com/profile/yourprofile"
                className="w-full px-4 py-3 bg-[#002029] text-white rounded-lg border border-[#005066] focus:border-[#00a8cc] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* GitHub */}
            <div className="mb-4">
              <label className="flex items-center text-gray-200 text-sm font-medium mb-2">
                <Github size={18} className="mr-2" />
                GitHub
              </label>
              <input
                type="url"
                name="social.github"
                value={formData.socialLinks.github}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://github.com/yourprofile"
                className="w-full px-4 py-3 bg-[#002029] text-white rounded-lg border border-[#005066] focus:border-[#00a8cc] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center space-x-2 flex-1 bg-gradient-to-r from-[#00a8cc] to-[#0088aa] text-white px-6 py-3 rounded-lg hover:from-[#0088aa] hover:to-[#006688] transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-3 bg-[#002029] text-white rounded-lg hover:bg-[#003844] transition-all duration-200 font-semibold border border-[#005066] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;

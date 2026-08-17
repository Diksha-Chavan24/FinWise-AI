import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INDIAN_PROFILES } from '../data/indianProfiles';
import { generatePersonalizedPlans } from '../engine/financialEngine';
import { loadIndianProfilesFromCSV } from '../services/csvService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [profiles, setProfiles] = useState(INDIAN_PROFILES);
  const [selectedProfileId, setSelectedProfileId] = useState(INDIAN_PROFILES[0].id);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('plan-balanced');

  useEffect(() => {
    async function initCSV() {
      const csvProfiles = await loadIndianProfilesFromCSV();
      if (csvProfiles && csvProfiles.length > 0) {
        // Merge primary rich 5 profiles with CSV entries
        const existingIds = new Set(INDIAN_PROFILES.map(p => p.name.toLowerCase()));
        const uniqueCsv = csvProfiles.filter(p => !existingIds.has(p.name.toLowerCase()));
        setProfiles([...INDIAN_PROFILES, ...uniqueCsv]);
      }
    }
    initCSV();
  }, []);

  const selectedProfile = useMemo(() => {
    return profiles.find((p) => p.id === selectedProfileId) || profiles[0];
  }, [profiles, selectedProfileId]);

  const generatedPlans = useMemo(() => {
    return generatePersonalizedPlans(selectedProfile);
  }, [selectedProfile]);

  const activePlan = useMemo(() => {
    return generatedPlans.find((p) => p.id === selectedPlanId) || generatedPlans[0];
  }, [generatedPlans, selectedPlanId]);

  const handleSelectProfile = (profile) => {
    setSelectedProfileId(profile.id);
    setSelectedPlanId('plan-balanced');
  };

  const handleSaveCustomProfile = (newProfile) => {
    setProfiles((prev) => [newProfile, ...prev]);
    setSelectedProfileId(newProfile.id);
    setSelectedPlanId('plan-balanced');
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const value = {
    profiles,
    selectedProfile,
    selectedProfileId,
    generatedPlans,
    activePlan,
    selectedPlanId,
    isLoggedIn,
    setSelectedPlanId,
    handleSelectProfile,
    handleSaveCustomProfile,
    handleLogin,
    handleLogout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

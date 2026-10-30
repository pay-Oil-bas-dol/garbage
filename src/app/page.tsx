'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { BottomNav, TabType } from '@/components/BottomNav';
import { Dashboard } from '@/components/Dashboard';
import { MissionWizard } from '@/components/MissionWizard';
import { HistoryLedger } from '@/components/HistoryLedger';
import { Leaderboard } from '@/components/Leaderboard';
import { AuthModal } from '@/components/AuthModal';
import { SettingsModal } from '@/components/SettingsModal';
import { getUser, getMissions, DEFAULT_USER } from '@/lib/store';
import { UserProfile, Mission } from '@/types';

export default function Home() {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync initial state on client
  useEffect(() => {
    setUser(getUser());
    setMissions(getMissions());
  }, []);

  const refreshData = () => {
    setUser(getUser());
    setMissions(getMissions());
  };

  const handleStartMission = () => {
    setActiveTab('wizard');
  };

  const handleMissionSuccess = (newMission: Mission) => {
    refreshData();
    setSelectedMission(newMission);
    setActiveTab('history');
  };

  const handleTriggerDemoPair = (pairNumber: 1 | 2) => {
    setActiveTab('wizard');
  };

  return (
    <div className="min-h-screen bg-[#EBF3ED] flex justify-center py-0 sm:py-4">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md bg-[#F7FAF7] min-h-screen sm:min-h-[844px] sm:max-h-[920px] sm:rounded-[36px] sm:overflow-hidden sm:border-8 sm:border-slate-800 shadow-2xl flex flex-col relative">
        {/* Top Navbar */}
        <Navbar
          user={user}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* Scrollable Main Content Container */}
        <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
          {activeTab === 'dashboard' && (
            <Dashboard
              user={user}
              missions={missions}
              onStartMission={handleStartMission}
              onViewAllHistory={() => setActiveTab('history')}
              onSelectMission={(m) => {
                setSelectedMission(m);
                setActiveTab('history');
              }}
              onTriggerDemoPair={handleTriggerDemoPair}
            />
          )}

          {activeTab === 'wizard' && (
            <MissionWizard
              onSuccess={handleMissionSuccess}
              onCancel={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'history' && (
            <HistoryLedger
              missions={missions}
              selectedMission={selectedMission}
              onSelectMission={setSelectedMission}
              onStartNewMission={handleStartMission}
            />
          )}

          {activeTab === 'leaderboard' && <Leaderboard user={user} />}
        </main>

        {/* Mobile App Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onStartMission={handleStartMission}
        />

        {/* Modals */}
        <AuthModal
          currentUser={user}
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onUserChanged={(u) => setUser(u)}
        />

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onDataReset={refreshData}
          onTriggerDemoPair={handleTriggerDemoPair}
        />
      </div>
    </div>
  );
}

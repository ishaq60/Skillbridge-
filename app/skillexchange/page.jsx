"use client";

import { useState, useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import UserProfile from "../../components/swaping/user-profile";
import ProfileEditor from "../../components/swaping/profile-editor";
import MatchesList from "../../components/swaping/matches-list";
import SearchUsers from "../../components/swaping/search-users";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [matchScores, setMatchScores] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadCurrentUser();
    loadAllUsers();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const response = await fetch("/api/users/current");
      const user = await response.json();
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  };

  const loadAllUsers = async () => {
    try {
      const response = await fetch("/api/users/all");
      const users = await response.json();
      setAllUsers(users);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const handleFindMatches = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const response = await fetch("/api/matching/find-matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await response.json();
      setMatches(data.matches);
      setMatchScores(data.matchScores || {});
      setActiveTab("matches");
    } catch (error) {
      console.error("Failed to find matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setActiveTab("user-detail");
  };

  const handleSaveProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    setIsEditing(false);
    loadAllUsers();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SkillSwap</h1>
          <p className="text-gray-600">Find the perfect skill exchange match using AI-powered matching</p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by Cosine Similarity, Collaborative Filtering & Semantic Analysis
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="search">Search Users</TabsTrigger>
            <TabsTrigger value="matches">Matches ({matches.length})</TabsTrigger>
            <TabsTrigger value="user-detail">User Detail</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {currentUser && !isEditing && (
              <>
                <UserProfile user={currentUser} onEdit={() => setIsEditing(true)} />
                <Button
                  onClick={handleFindMatches}
                  disabled={loading}
                  size="lg"
                  className="w-full bg-teal-600 "
                >
                  {loading ? "Finding Matches..." : "Find Skill Exchange Matches"}
                </Button>
              </>
            )}
            {currentUser && isEditing && (
              <ProfileEditor user={currentUser} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />
            )}
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <SearchUsers
              users={allUsers}
              currentUser={currentUser}
              matchScores={matchScores}
              onSelectUser={handleSelectUser}
            />
          </TabsContent>

          <TabsContent value="matches">
            <MatchesList matches={matches} currentUser={currentUser} matchScores={matchScores} />
          </TabsContent>

          {selectedUser && (
            <TabsContent value="user-detail" className="space-y-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                    <p className="text-gray-600 mt-1">{selectedUser.bio}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Can Teach</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.skillsOffering.map((skill) => (
                          <Badge key={skill} className="bg-teal-600">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Wants to Learn</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.skillsLooking.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Experience Level:</span> {selectedUser.experienceLevel}
                    </p>
                    {matchScores[selectedUser.id] && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          Match Score: {Math.round(matchScores[selectedUser.id].score)}%
                        </p>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-teal-600"
                            style={{ width: `${matchScores[selectedUser.id].score}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </main>
  )
}

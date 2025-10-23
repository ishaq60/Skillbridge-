"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

export default function ProfileEditor({ user, onSave, onCancel }) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [skillsOffering, setSkillsOffering] = useState(user.skillsOffering);
  const [skillsLooking, setSkillsLooking] = useState(user.skillsLooking);
  const [newSkillOffering, setNewSkillOffering] = useState("");
  const [newSkillLooking, setNewSkillLooking] = useState("");
  const [location, setLocation] = useState(user.location);
  const [language, setLanguage] = useState(user.language);
  const [rating, setRating] = useState(user.rating);

  const handleAddSkillOffering = () => {
    if (newSkillOffering.trim() && !skillsOffering.includes(newSkillOffering.trim())) {
      setSkillsOffering([...skillsOffering, newSkillOffering.trim()]);
      setNewSkillOffering("");
    }
  };

  const handleAddSkillLooking = () => {
    if (newSkillLooking.trim() && !skillsLooking.includes(newSkillLooking.trim())) {
      setSkillsLooking([...skillsLooking, newSkillLooking.trim()]);
      setNewSkillLooking("");
    }
  };

  const handleRemoveSkillOffering = (skill) => {
    setSkillsOffering(skillsOffering.filter((s) => s !== skill));
  };

  const handleRemoveSkillLooking = (skill) => {
    setSkillsLooking(skillsLooking.filter((s) => s !== skill));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      bio,
      skillsOffering,
      skillsLooking,
      location,
      language,
      rating,
    };
    onSave(updatedUser);
  };
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-teal-600  text-white rounded-t-lg">
        <CardTitle className="text-2xl">Edit Your Profile</CardTitle>
        <CardDescription className="text-indigo-100">Update your skills and information</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Bio</label>
          <Input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., New York, USA" />
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Language</label>
          <Input
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="e.g., English, Spanish, French"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Rating (0-5 stars)</label>
          <Input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(Number.parseFloat(e.target.value))}
            placeholder="Your rating"
          />
        </div>

        {/* Skills Offering */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Skills I Can Teach</label>
          <div className="flex gap-2 mb-3">
            <Input
              value={newSkillOffering}
              onChange={(e) => setNewSkillOffering(e.target.value)}
              placeholder="Add a skill"
              onKeyPress={(e) => e.key === "Enter" && handleAddSkillOffering()}
            />
            <Button onClick={handleAddSkillOffering} className="bg-green-600 hover:bg-green-700">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsOffering.map((skill) => (
              <Badge key={skill} className="bg-teal-500 hover:bg-green-600 cursor-pointer flex items-center gap-1">
                {skill}
                <X size={14} onClick={() => handleRemoveSkillOffering(skill)} className="ml-1 hover:text-white" />
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills Looking */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Skills I Want to Learn</label>
          <div className="flex gap-2 mb-3">
            <Input
              value={newSkillLooking}
              onChange={(e) => setNewSkillLooking(e.target.value)}
              placeholder="Add a skill"
              onKeyPress={(e) => e.key === "Enter" && handleAddSkillLooking()}
            />
            <Button onClick={handleAddSkillLooking} className="bg-teal-600 hover:bg-blue-700">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsLooking.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-blue-100 text-blue-900 cursor-pointer flex items-center gap-1"
              >
                {skill}
                <X size={14} onClick={() => handleRemoveSkillLooking(skill)} className="ml-1 hover:text-blue-700" />
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleSave} className="flex-1 bg-teal-600">
            Save Changes
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

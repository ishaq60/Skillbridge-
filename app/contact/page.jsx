

"use client"

import { useState, useEffect, useRef } from "react"
 import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"

import {
  Video,
  Phone,
  MessageSquare,
  Send,
  Search,
  MoreVertical,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Maximize2,
  Settings,
  ArrowLeft,
  Paperclip,
  Smile,
  User,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const [selectedContact, setSelectedContact] = useState(null)
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [isAudioCall, setIsAudioCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const messagesEndRef = useRef(null)

  const currentUser = {
    name: "You",
    avatar: "/avatar-1.png",
    status: "online",
  }

  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      skill: "Web Development",
      avatar: "/professional-female-avatar.png",
      status: "online",
      lastMessage: "Thanks for the React tips!",
      time: "2m ago",
      unread: 2,
    },
    {
      id: 2,
      name: "Michael Chen",
      skill: "UI/UX Design",
      avatar: "/professional-male-avatar.png",
      status: "online",
      lastMessage: "Can we schedule a session?",
      time: "15m ago",
      unread: 0,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      skill: "Data Science",
      avatar: "/professional-asian-male-avatar.jpg",
      status: "away",
      lastMessage: "Great learning session today!",
      time: "1h ago",
      unread: 0,
    },
    {
      id: 4,
      name: "David Kim",
      skill: "Mobile Development",
      avatar: "/avatar-1.png",
      status: "offline",
      lastMessage: "See you next week",
      time: "2h ago",
      unread: 0,
    },
  ]

  const initialMessages = {
    1: [
      { type: "received", text: "Hi! I'd love to learn React from you.", time: "10:30 AM" },
      { type: "sent", text: "I can help you with that. When are you available?", time: "10:32 AM" },
      { type: "received", text: "How about tomorrow at 3 PM?", time: "10:35 AM" },
      { type: "sent", text: "Perfect! I'll send you a video call link.", time: "10:36 AM" },
      { type: "received", text: "Thanks for the React tips!", time: "Just now" },
    ],
    2: [
      { type: "received", text: "Hey! I saw your profile. Your design work is amazing!", time: "9:15 AM" },
      { type: "sent", text: "Thank you! I'd be happy to share some design principles.", time: "9:20 AM" },
      { type: "received", text: "Can we schedule a session?", time: "9:45 AM" },
    ],
    3: [
      { type: "sent", text: "Thanks for teaching me Python basics!", time: "Yesterday" },
      { type: "received", text: "Great learning session today!", time: "2:30 PM" },
    ],
    4: [
      { type: "received", text: "I'm interested in learning iOS development", time: "Yesterday" },
      { type: "sent", text: "Great! I can teach you Swift basics.", time: "Yesterday" },
      { type: "received", text: "See you next week", time: "3:00 PM" },
    ],
  }

  useEffect(() => {
    setMessages(initialMessages)

    const userId = searchParams.get("user")
    const callType = searchParams.get("type")

    if (userId) {
      const contact = contacts.find((c) => c.id === Number.parseInt(userId))
      if (contact) {
        setSelectedContact(contact)

        // Auto-start call if type is specified
        if (callType === "video") {
          setTimeout(() => setIsVideoCall(true), 500)
        } else if (callType === "audio") {
          setTimeout(() => setIsAudioCall(true), 500)
        }
      }
    }
  }, [searchParams])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedContact])

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedContact) {
      const newMessage = {
        type: "sent",
        text: messageInput,
        time: "Just now",
      }
      setMessages((prev) => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
      }))
      setMessageInput("")

      // Simulate response
      setTimeout(() => {
        const response = {
          type: "received",
          text: "Thanks! I'll get back to you soon.",
          time: "Just now",
        }
        setMessages((prev) => ({
          ...prev,
          [selectedContact.id]: [...(prev[selectedContact.id] || []), response],
        }))
      }, 2000)
    }
  }

  const startVideoCall = () => {
    setIsVideoCall(true)
    setIsAudioCall(false)
  }

  const startAudioCall = () => {
    setIsAudioCall(true)
    setIsVideoCall(false)
  }

  const endCall = () => {
    setIsVideoCall(false)
    setIsAudioCall(false)
    setIsMuted(false)
    setIsVideoEnabled(true)
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.skill.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 text-teal-400 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-xl text-teal-500 font-bold">Skillbridge Connect</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/learners">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-teal-600/50 text-teal-600 hover:bg-teal-50 bg-transparent"
                >
                  Find Learners
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Card className="overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl border-0 h-[calc(100vh-140px)]">
          <div className="flex h-full">
            {/* Contacts Sidebar */}
            <div className="w-full md:w-80 lg:w-96 border-r border-border flex flex-col bg-white">
              {/* Search */}
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-border"
                  />
                </div>
              </div>

              {/* Contacts List */}
              <div className="flex-1 overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      selectedContact?.id === contact.id ? "bg-teal-50" : ""
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={contact.avatar || "/placeholder.svg"}
                        alt={contact.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div
                        className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          contact.status === "online"
                            ? "bg-green-500"
                            : contact.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="font-semibold text-base text-gray-900 truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{contact.time}</span>
                      </div>
                      <p className="text-sm text-teal-600 font-medium mb-1">{contact.skill}</p>
                      <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="bg-teal-600 text-white text-xs h-5 min-w-[20px] rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                        {contact.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gradient-to-br from-white via-teal-50/30 to-cyan-50/30">
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border bg-white/80 backdrop-blur-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedContact.avatar || "/placeholder.svg"}
                        alt={selectedContact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="font-semibold">{selectedContact.name}</h2>
                        <p className="text-xs text-teal-600">{selectedContact.skill}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={startVideoCall}
                        className="hover:bg-teal-50 hover:text-teal-600"
                      >
                        <Video className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={startAudioCall}
                        className="hover:bg-teal-50 hover:text-teal-600"
                      >
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-teal-50 hover:text-teal-600">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  {!isVideoCall && !isAudioCall ? (
                    <>
                      <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {(messages[selectedContact.id] || []).map((message, index) => (
                          <div
                            key={index}
                            className={`flex items-end gap-2 ${message.type === "sent" ? "justify-end" : "justify-start"}`}
                          >
                            {message.type === "received" && (
                              <img
                                src={selectedContact.avatar || "/placeholder.svg"}
                                alt={selectedContact.name}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              />
                            )}
                            <div
                              className={`max-w-[70%] ${
                                message.type === "sent"
                                  ? "bg-teal-600 text-white rounded-2xl rounded-br-md"
                                  : "bg-white border border-border rounded-2xl rounded-bl-md shadow-sm"
                              } px-4 py-3`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <p
                                className={`text-xs mt-1 ${message.type === "sent" ? "text-teal-100" : "text-muted-foreground"}`}
                              >
                                {message.time}
                              </p>
                            </div>
                            {message.type === "sent" && (
                              <img
                                src={currentUser.avatar || "/placeholder.svg"}
                                alt={currentUser.name}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              />
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-border bg-white/80 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                          <img
                            src={currentUser.avatar || "/placeholder.svg"}
                            alt={currentUser.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">You</h3>
                            <p className="text-xs text-teal-600">Active now</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-teal-50 hover:text-teal-600">
                            <Paperclip className="w-5 h-5" />
                          </Button>
                          <Input
                            type="text"
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="flex-1 bg-gray-50 border-border rounded-full"
                          />
                          <Button variant="ghost" size="sm" className="hover:bg-teal-50 hover:text-teal-600">
                            <Smile className="w-5 h-5" />
                          </Button>
                          <Button
                            onClick={handleSendMessage}
                            size="sm"
                            className="bg-teal-600 hover:bg-teal-500 text-white rounded-full px-4"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Video/Audio Call Interface */
                    <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                      {/* Remote Video */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isVideoCall ? (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <img
                              src={selectedContact.avatar || "/placeholder.svg"}
                              alt={selectedContact.name}
                              className="w-48 h-48 rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="text-center">
                            <img
                              src={selectedContact.avatar || "/placeholder.svg"}
                              alt={selectedContact.name}
                              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                            />
                            <h3 className="text-white text-2xl font-semibold mb-2">{selectedContact.name}</h3>
                            <p className="text-gray-400">Audio Call in Progress...</p>
                          </div>
                        )}
                      </div>

                      {/* Local Video (Picture-in-Picture) */}
                      {isVideoCall && isVideoEnabled && (
                        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden shadow-xl border-2 border-white/20">
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-16 h-16 text-gray-500" />
                          </div>
                        </div>
                      )}

                      {/* Call Controls */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() => setIsMuted(!isMuted)}
                          className={`rounded-full w-14 h-14 ${isMuted ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                        >
                          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                        </Button>

                        {isVideoCall && (
                          <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                            className={`rounded-full w-14 h-14 ${!isVideoEnabled ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                          >
                            {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={endCall}
                          className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600 text-white"
                        >
                          <PhoneOff className="w-6 h-6" />
                        </Button>

                        {isVideoCall && (
                          <Button
                            variant="ghost"
                            size="lg"
                            className="rounded-full w-14 h-14 bg-gray-700 hover:bg-gray-600 text-white"
                          >
                            <Maximize2 className="w-6 h-6" />
                          </Button>
                        )}
                      </div>

                      {/* Call Info */}
                      <div className="absolute top-4 left-4 text-white">
                        <p className="text-sm text-gray-400">{isVideoCall ? "Video Call" : "Audio Call"} • 00:45</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* No Contact Selected */
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Contact</h3>
                    <p className="text-muted-foreground">Choose a contact to start chatting or make a call</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

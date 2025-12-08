import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle, Users } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: {
    email: string;
    full_name: string | null;
  };
}

const StudentChat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [profiles, setProfiles] = useState<Record<string, { email: string; full_name: string | null }>>({});

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
    }
  };

  const fetchMessages = async () => {
    const { data: messagesData, error } = await supabase
      .from("student_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(100);

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    // Fetch profiles for all users
    const userIds = [...new Set(messagesData?.map(m => m.user_id) || [])];
    if (userIds.length > 0) {
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .in("id", userIds);

      const profileMap: Record<string, { email: string; full_name: string | null }> = {};
      profilesData?.forEach(p => {
        profileMap[p.id] = { email: p.email, full_name: p.full_name };
      });
      setProfiles(profileMap);
    }

    setMessages(messagesData || []);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel("student-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "student_messages"
        },
        async (payload) => {
          const newMsg = payload.new as Message;
          
          // Fetch profile if not cached
          if (!profiles[newMsg.user_id]) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("id, email, full_name")
              .eq("id", newMsg.user_id)
              .single();
            
            if (profile) {
              setProfiles(prev => ({
                ...prev,
                [profile.id]: { email: profile.email, full_name: profile.full_name }
              }));
            }
          }
          
          setMessages(prev => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !user) return;

    setIsLoading(true);
    const { error } = await supabase.from("student_messages").insert({
      user_id: user.id,
      content: newMessage.trim()
    });

    if (error) {
      toast.error("Failed to send message");
      console.error("Error sending message:", error);
    } else {
      setNewMessage("");
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString();
  };

  const getProfile = (userId: string) => {
    return profiles[userId] || { email: "Unknown", full_name: null };
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.created_at);
    if (!groups[date]) groups[date] = [];
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-primary/10">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Student Chat</h1>
            <p className="text-muted-foreground">Share notes and ideas with fellow students</p>
          </div>
        </div>

        <Card className="h-[calc(100vh-280px)] flex flex-col">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              Community Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {Object.entries(groupedMessages).map(([date, msgs]) => (
                  <div key={date}>
                    <div className="flex justify-center mb-4">
                      <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {date}
                      </span>
                    </div>
                    {msgs.map((message) => {
                      const isOwn = message.user_id === user?.id;
                      const profile = getProfile(message.user_id);
                      return (
                        <div
                          key={message.id}
                          className={`flex gap-3 mb-3 ${isOwn ? "flex-row-reverse" : ""}`}
                        >
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.email}`}
                            />
                            <AvatarFallback>
                              {profile.full_name?.[0] || profile.email[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`max-w-[70%] ${isOwn ? "text-right" : ""}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium">
                                {isOwn ? "You" : profile.full_name || profile.email.split("@")[0]}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(message.created_at)}
                              </span>
                            </div>
                            <div
                              className={`rounded-lg px-3 py-2 inline-block text-left ${
                                isOwn
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading || !newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentChat;
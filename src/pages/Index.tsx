import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calculator, Atom, BookOpen, GraduationCap, Trophy, Book, ArrowRight } from "lucide-react";
import TeacherCard from "@/components/TeacherCard";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-education.jpg";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Auto-redirect authenticated users away from home
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const teachers = [
    {
      type: "math",
      name: "Math Teacher",
      description: "Master mathematics with step-by-step guidance and practice problems",
      icon: Calculator,
    },
    {
      type: "science",
      name: "Science Teacher",
      description: "Explore scientific concepts through experiments and real-world examples",
      icon: Atom,
    },
    {
      type: "language",
      name: "Language Arts Teacher",
      description: "Improve reading, writing, and communication skills with personalized feedback",
      icon: BookOpen,
    },
    {
      type: "general",
      name: "General Tutor",
      description: "Get help with any subject from a knowledgeable and adaptive tutor",
      icon: GraduationCap,
    },
  ];

  const handleTeacherSelect = (teacherType: string, teacherName: string) => {
    navigate("/chat", { state: { teacherType, teacherName } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroImage}
            alt="Education background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            EduVoice
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn with AI-powered voice assistants tailored to your subject
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <span className="text-primary">✓</span>
              <span>Voice & Text Chat</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <span className="text-primary">✓</span>
              <span>Real-time Responses</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <span className="text-primary">✓</span>
              <span>Personalized Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* NCERT Books Card */}
          <Card className="group hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/ncert")}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Book className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">NCERT Books</CardTitle>
                  <CardDescription>Access official NCERT textbooks for Classes 9-12</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">Mathematics</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">Science</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">Physics</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">Chemistry</span>
              </div>
              <Button variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Browse Books <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Olympiad Card */}
          <Card className="group hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/olympiad")}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Olympiad Prep</CardTitle>
                  <CardDescription>Learn from virtual teachers with voice interaction</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">IMO</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">IPhO</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">IChO</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">IOI</span>
              </div>
              <Button variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Meet Teachers <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* General AI Teachers */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-4">General AI Teachers</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Get instant help with any subject from our AI-powered teachers
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.type}
              title={teacher.name}
              description={teacher.description}
              icon={teacher.icon}
              onSelect={() => handleTeacherSelect(teacher.type, teacher.name)}
            />
          ))}
        </div>
      </section>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 EduVoice. Powered by AI to enhance your learning experience.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, Sparkles, Download, Image, RefreshCw } from "lucide-react";

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Science", "English", "History"];
const classes = ["6", "7", "8", "9", "10", "11", "12"];

const Notes = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [topic, setTopic] = useState("");
  const [notesImages, setNotesImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateNotes = async () => {
    if (!selectedSubject || !selectedClass || !topic) {
      toast({
        title: "Missing Information",
        description: "Please select subject, class, and enter a topic",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setNotesImages([]);
    
    try {
      const response = await supabase.functions.invoke("generate-notes", {
        body: {
          subject: selectedSubject,
          className: selectedClass,
          topic: topic,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to generate notes");
      }

      const data = response.data;
      
      if (data.images && data.images.length > 0) {
        setNotesImages(data.images);
        toast({
          title: "Notes Generated!",
          description: `Created ${data.images.length} visual note(s) for ${topic}`,
        });
      } else {
        throw new Error("No images were generated");
      }
    } catch (error: any) {
      console.error("Error generating notes:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate notes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${topic.replace(/\s+/g, "_")}_notes_page_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Downloaded!",
      description: `Note image ${index + 1} saved`,
    });
  };

  const downloadAllImages = () => {
    notesImages.forEach((img, index) => {
      setTimeout(() => downloadImage(img, index), index * 500);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Image className="h-8 w-8 text-primary" />
            AI Visual Notes Generator
          </h1>
          <p className="text-muted-foreground">
            Generate beautiful visual study notes as images for any NCERT topic using AI
          </p>
        </div>

        {/* Generator Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generate Visual Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>
                      Class {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Enter topic (e.g., Newton's Laws)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />

              <Button onClick={generateNotes} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notes Display */}
        {notesImages.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generated Visual Notes
                </CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{selectedSubject}</Badge>
                  <Badge variant="outline">Class {selectedClass}</Badge>
                  <Badge>{topic}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={downloadAllImages}>
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
                <Button variant="outline" size="sm" onClick={generateNotes} disabled={isLoading}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {notesImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={imageUrl} 
                      alt={`Notes page ${index + 1}`} 
                      className="w-full rounded-lg border shadow-md"
                    />
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => downloadImage(imageUrl, index)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {notesImages.length === 0 && !isLoading && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Notes Yet</h3>
              <p className="text-muted-foreground">
                Select a class, subject, and topic above to generate AI-powered visual study notes as images
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Notes;

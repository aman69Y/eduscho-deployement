import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";

interface NCERTBookCardProps {
  className: string;
  subject: string;
  chapters: { number: number; title: string; url: string }[];
}

const NCERTBookCard = ({ className, subject, chapters }: NCERTBookCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{subject}</CardTitle>
            <CardDescription>Class {className}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {chapters.map((chapter) => (
            <Button
              key={chapter.number}
              variant="ghost"
              className="w-full justify-start text-left h-auto py-2"
              asChild
            >
              <a href={chapter.url} target="_blank" rel="noopener noreferrer">
                <span className="truncate flex-1">
                  Ch {chapter.number}: {chapter.title}
                </span>
                <ExternalLink className="h-3 w-3 ml-2 flex-shrink-0" />
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NCERTBookCard;

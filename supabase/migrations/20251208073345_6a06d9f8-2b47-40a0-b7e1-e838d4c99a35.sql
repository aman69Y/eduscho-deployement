-- Create student chat messages table
CREATE TABLE public.student_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_messages ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view all messages
CREATE POLICY "Authenticated users can view all messages" 
ON public.student_messages 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Allow users to create their own messages
CREATE POLICY "Users can create their own messages" 
ON public.student_messages 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_messages;
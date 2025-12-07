import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, className, topic } = await req.json();

    if (!subject || !className || !topic) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: subject, className, topic" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Generating visual notes for ${topic} - ${subject} Class ${className}`);

    const imagePrompt = `Create a beautiful, educational study notes infographic for Class ${className} ${subject} on the topic: "${topic}".

The image should be a well-organized study note page with:
- Clear title at the top with the topic name
- Key concepts in organized sections with headers
- Important formulas or definitions in highlighted boxes
- Simple diagrams or illustrations where applicable
- Bullet points for key takeaways
- Colorful but professional design suitable for students
- Easy to read fonts and clear hierarchy
- Memory tips or mnemonics if applicable

Style: Educational infographic, clean layout, vibrant colors, professional look.
Ultra high resolution, 16:9 aspect ratio suitable for studying.`;

    // Generate image using Lovable AI with Gemini image model
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: imagePrompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate notes image");
    }

    const data = await response.json();
    console.log("AI response received");

    // Extract images from the response
    const images: string[] = [];
    const message = data.choices?.[0]?.message;
    
    if (message?.images && Array.isArray(message.images)) {
      for (const img of message.images) {
        if (img?.image_url?.url) {
          images.push(img.image_url.url);
        }
      }
    }

    if (images.length === 0) {
      console.error("No images found in response:", JSON.stringify(data));
      throw new Error("No images generated");
    }

    console.log(`Generated ${images.length} image(s) for ${topic}`);

    return new Response(
      JSON.stringify({ 
        images,
        topic,
        subject,
        className 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in generate-notes:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate notes" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

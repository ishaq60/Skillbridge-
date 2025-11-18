// app/api/chat/route.js
import { NextResponse } from 'next/server';
import { classifyIntent, generateResponse, extractSkills } from '../../../services/geminiService';
import { getCoursesByKeywords } from '../../../services/courseService';

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    // Check if user is asking about courses, enrollment, or purchase
    const askingForCourses = /course|enroll|purchase|buy|pay|price|recommend|suggest|learn/i.test(message);
    
    let aiReply;

    if (askingForCourses) {
      // User is asking about courses - fetch and recommend available courses
      const prompt = `Extract any specific skills or topics the user wants to learn from this message: "${message}"
      
Return ONLY a JSON with this format:
{
  "skills": ["skill1", "skill2", ...]
}

If no specific topics are mentioned, return empty array.`;

      try {
        const skillsResponse = await generateResponse(prompt);
        const skillsMatch = skillsResponse.match(/\{[\s\S]*\}/);
        let skills = [];
        
        if (skillsMatch) {
          const parsed = JSON.parse(skillsMatch[0]);
          skills = parsed.skills || [];
        }

        let courses = [];
        if (skills.length > 0) {
          courses = await getCoursesByKeywords(skills);
        }

        // If no courses found from skills, show all available courses
        if (courses.length === 0) {
          courses = await getCoursesByKeywords(['development', 'design', 'marketing', 'data']);
        }

        if (courses.length > 0) {
          const courseList = courses.map(course => `
- **${course.title}** 
  💵 Price: $${course.price}
  📚 Category: ${course.category}
  📝 Description: ${course.description}
  👨‍🏫 Instructor: ${course.instructor?.name || 'Expert Instructor'}
  ⏱️ Duration: ${course.duration || 'Self-paced'}
  ⭐ Rating: ${course.rating}/5 (${course.total_reviews} reviews)`).join('\n');

          const coursePrompt = `You are an AI course advisor. The user is interested in courses and asked: "${message}"

Here are our recommended paid courses you can purchase or enroll in:
${courseList}

Provide:
1. A friendly response about available courses
2. Recommend which courses match their interests
3. Mention the pricing and enrollment details
4. Encourage them to purchase or enroll
5. Explain the value and learning outcomes

Be encouraging and helpful!`;

          aiReply = await generateResponse(coursePrompt);
        } else {
          aiReply = "Sorry, no courses are currently available. Please check back soon for our latest course offerings!";
        }
      } catch (error) {
        console.error("Error processing course request:", error);
        aiReply = "I'm having trouble retrieving courses right now. Please try again later.";
      }
    } else {
      // For general questions, provide educational assistance without course matching
      const generalPrompt = `You are a friendly AI learning mentor on the SkillSwap platform. Your role is to:
- Help users with general learning questions and advice
- Provide educational guidance and tips
- Answer questions about skill development
- Be encouraging and supportive

If they ask about courses or enrollment, suggest they ask you about available courses.

User's message: """${message}"""

Respond in a helpful, concise, and friendly tone.`;
      aiReply = await generateResponse(generalPrompt);
    }

    return NextResponse.json({ reply: aiReply }, { status: 200 });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// app/api/chat/route.js
import { NextResponse } from 'next/server';
import { classifyIntent, generateResponse, extractSkills } from '../../../services/geminiService';
import { getCoursesByKeywords, getAllCourses } from '../../../services/courseService';

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    if (!message || message.trim() === '') {
      aiReply = `👋 Welcome to Skillbridge AI Chatbox! Here's how I can assist you:

- **Course Recommendations**: Ask me about courses to learn new skills.
- **Learning Tips**: Get advice on how to improve your skills.
- **Skill Development**: Explore related skills to grow your expertise.

For example, you can ask:
- "What courses do you have for JavaScript?"
- "How can I start learning React?"
- "What are the best skills for web development?"

Feel free to ask me anything! 😊`;
      return NextResponse.json({ reply: aiReply }, { status: 200 });
    }

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
          try {
            const parsed = JSON.parse(skillsMatch[0]);
            skills = parsed.skills || [];
          } catch (e) {
            console.error("Error parsing skills JSON:", e);
            skills = [];
          }
        }

        let courses = [];
        
        // Fetch courses from database based on skills
        if (skills.length > 0) {
          courses = await getCoursesByKeywords(skills);
        }

        // If no courses found from skills, get all featured courses
        if (courses.length === 0) {
          courses = await getAllCourses();
        }

        if (courses && courses.length > 0) {
          // Format top 5 courses for display
          const topCourses = courses.slice(0, 5);
          const courseList = topCourses.map(course => `
- **${course.title}** 
  📚 Category: ${course.category}
  💵 Price: $${course.price}
  📝 Description: ${course.description || 'Professional course'}
  👨‍🏫 Instructor: ${course.instructor?.name || 'Expert Instructor'}
  ⏱️ Duration: ${course.duration || 'Self-paced'}
  ⭐ Rating: ${course.rating}/5 (${course.total_reviews || 0} reviews)
  👥 Students: ${course.total_students || 0}+`).join('\n');

          const coursePrompt = `You are an AI course advisor for Skillbridge Education Platform. The user asked: "${message}"

Here are our recommended paid courses you can purchase or enroll in:
${courseList}

Provide:
1. A friendly response about available courses
2. Highlight the course title and category prominently
3. Mention the pricing and enrollment details clearly
4. Explain the value and learning outcomes
5. Encourage them to enroll

Be warm, encouraging, and helpful!`;

          aiReply = await generateResponse(coursePrompt);
        } else {
          const noCoursePrompt = `The user is interested in learning: "${message}"

Unfortunately, we don't have specific courses available for that topic right now. However, provide a helpful response that:
1. Acknowledges their learning interest
2. Suggests related topics or skills they could explore
3. Provides practical self-learning tips they can start with today
4. Mentions our diverse course library with examples of categories
5. Encourages them to check back soon for new course additions

Be warm, supportive, and motivating!`;

          aiReply = await generateResponse(noCoursePrompt);
        }
      } catch (error) {
        console.error("Error processing course request:", error);
        aiReply = "I'm having trouble retrieving courses right now. Please try again in a moment or contact support.";
      }
    } else {
      // For general questions, provide educational assistance without course matching
      const generalPrompt = `You are a friendly AI learning mentor on the Skillbridge platform. Your role is to:
- Help users with general learning questions and advice
- Provide educational guidance and tips
- Answer questions about skill development
- Be encouraging and supportive
- If they ask about courses or enrollment, suggest they ask you directly

User's message: """${message}"""

Respond in a helpful, concise, and friendly tone. Keep response under 150 words.`;
      aiReply = await generateResponse(generalPrompt);
    }

    return NextResponse.json({ reply: aiReply }, { status: 200 });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// app/api/chat/route.js
import { NextResponse } from 'next/server';
import { classifyIntent, generateResponse, extractSkills } from '../../../services/geminiService';
import { getCoursesByKeywords } from '../../../services/courseService';

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    const intent = await classifyIntent(message);
    console.log('Classified intent:', intent);

    let aiReply;

    if (intent === "COURSE_QUERY") {
      const extractedSkills = await extractSkills(message);
      const { learn: learnSkills, teach: teachSkills } = extractedSkills;

      const allSkills = [...learnSkills, ...teachSkills];
      let courses = [];

      if (allSkills.length > 0) {
        courses = await getCoursesByKeywords(allSkills);
      }

      if (courses.length > 0) {
        const courseList = courses.map(course => `- ${course.title} (${course.category}): ${course.description}`).join('\n');
        const courseRecommendationPrompt = `The user is looking for courses based on their query: """${message}""". They want to learn: ${learnSkills.join(', ') || 'nothing specific'} and teach: ${teachSkills.join(', ') || 'nothing specific'}. I found the following courses:
        """${courseList}""".
        Please generate a friendly, helpful, and educational response recommending these courses. Make sure to mention the course titles and a brief description. Avoid hallucinating and only use the provided course data. If no courses match the user's query, politely ask for more skill details.`;
        aiReply = await generateResponse(courseRecommendationPrompt);
      } else {
        aiReply = "I couldn't find any courses matching your request. Could you please provide more details about the skills or topics you're interested in?";
      }
    } else {
      const normalPrompt = `You are a friendly mentor on the SkillSwap platform. Respond to the following message in a helpful, concise, and educational tone: """${message}""".`;
      aiReply = await generateResponse(normalPrompt);
    }

    return NextResponse.json({ reply: aiReply }, { status: 200 });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

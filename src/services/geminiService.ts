import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBsSPbCc0SEJ4w86UbVm6FBkT_fzWf-0c8';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface DebateAPIRequest {
  userInput: string;
  systemPrompt: string;
  feature: string;
}

export interface DebateAPIResponse {
  success: boolean;
  result?: string;
  error?: string;
}

export class DebateGeminiService {
  private static model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  static async generateDebateResponse(request: DebateAPIRequest): Promise<DebateAPIResponse> {
    try {
      console.log(`Processing ${request.feature} request with Gemini 2.0 Flash`);
      
      // Construct the full prompt with system instructions and user input
      const fullPrompt = `${request.systemPrompt}

USER REQUEST FOR ${request.feature.toUpperCase()}:
${request.userInput}

Please provide a comprehensive, professional response tailored specifically for competitive debate preparation. Format your response clearly with proper structure and actionable insights.`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from Gemini API');
      }

      console.log(`Successfully generated ${request.feature} response`);
      return {
        success: true,
        result: text
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate response'
      };
    }
  }

  static async generateRebuttal(roundStrategy: string): Promise<DebateAPIResponse> {
    return this.generateDebateResponse({
      userInput: roundStrategy,
      systemPrompt: `You are a world-class debate strategist and coach with experience training national champions. Generate compelling, strategic rebuttals that:

1. Directly address opponent arguments with logical counterpoints
2. Strengthen the user's position with evidence-based responses
3. Consider strategic flow and argument prioritization
4. Include specific examples and logical frameworks
5. Provide tactical advice for delivery and timing

Focus on creating rebuttals that are both intellectually rigorous and strategically sound for competitive debate.`,
      feature: 'Rebuttal Generation'
    });
  }

  static async cutCards(content: string, tags?: string): Promise<DebateAPIResponse> {
    return this.generateDebateResponse({
      userInput: `Content to analyze: ${content}${tags ? `\nTags/Topics: ${tags}` : ''}`,
      systemPrompt: `You are an expert evidence analyst specializing in competitive debate research. Analyze the provided content and:

1. Extract key arguments, statistics, and quotable evidence
2. Identify the strongest claims with supporting data
3. Organize findings by topic and argument strength
4. Provide proper citations and source information
5. Highlight the most impactful quotes for competitive use
6. Suggest strategic applications for different debate contexts

Format your response with clear headings, bullet points, and easy-to-reference evidence cards.`,
      feature: 'Card Cutting'
    });
  }

  static async prepareExtemp(topic: string): Promise<DebateAPIResponse> {
    return this.generateDebateResponse({
      userInput: topic,
      systemPrompt: `You are an extemporaneous speaking coach with extensive experience in competitive speech. For the given topic, provide:

1. A clear, structured outline with 3-4 main points
2. Current, relevant examples and statistics
3. Compelling opening and closing strategies
4. Strategic flow that builds a persuasive argument
5. Key talking points and transitions
6. Potential counterarguments to address
7. Time management suggestions for a 7-minute speech

Make your response immediately actionable for competitive extemp preparation.`,
      feature: 'Extemp Preparation'
    });
  }

  static async optimizeForLay(speech: string): Promise<DebateAPIResponse> {
    return this.generateDebateResponse({
      userInput: speech,
      systemPrompt: `You are a communication expert specializing in making complex debate arguments accessible to lay judges and general audiences. Analyze the provided speech and:

1. Identify technical jargon that needs simplification
2. Suggest clearer, more accessible language alternatives
3. Improve overall clarity and flow while maintaining impact
4. Ensure arguments remain persuasive to non-expert audiences
5. Provide specific word choice improvements
6. Maintain the logical structure and strategic value
7. Suggest delivery tips for lay judge appeal

Focus on making the content more relatable and understandable without losing persuasive power.`,
      feature: 'Lay Optimization'
    });
  }

  static async analyzeSpeech(speechText: string): Promise<DebateAPIResponse> {
    return this.generateDebateResponse({
      userInput: speechText,
      systemPrompt: `You are a speech and debate coach with expertise in competitive speaking analysis. Provide a comprehensive critique of the provided speech focusing on:

1. Word efficiency and clarity
2. Argument structure and logical flow
3. Evidence integration and impact
4. Delivery and rhetorical effectiveness
5. Strategic considerations and improvements
6. Specific suggestions for enhancement
7. Strengths to build upon

Provide actionable feedback that will help improve competitive performance, with specific examples from the speech.`,
      feature: 'Speech Analysis'
    });
  }

  static async analyzeProcessFlow(roundSituation: string): Promise<DebateAPIResponse> {
    return this.generateDebateResponse({
      userInput: roundSituation,
      systemPrompt: `You are a master debate strategist with expertise in round analysis and tactical planning. Based on the current round situation:

1. Analyze the strategic position and flow
2. Prioritize arguments for maximum impact
3. Identify tactical opportunities and threats
4. Provide specific advice for the next speech
5. Suggest strategic considerations for time allocation
6. Recommend argument sequencing and emphasis
7. Address potential opponent responses

Your advice should be immediately actionable and strategically sound for competitive debate success.`,
      feature: 'Process Flow Analysis'
    });
  }

  static async organizeStorage(query: string): Promise<DebateAPIResponse> {
    return this.generateDebateResponse({
      userInput: query,
      systemPrompt: `You are a debate organization specialist helping to manage and categorize debate materials efficiently. For the given query:

1. Suggest organizational categories and tagging systems
2. Recommend filing and retrieval strategies
3. Provide tips for material categorization by topic, strength, and relevance
4. Suggest cross-referencing methods for related arguments
5. Offer advice on maintaining an efficient debate evidence database
6. Recommend best practices for quick access during rounds

Focus on practical organizational strategies that enhance competitive preparation efficiency.`,
      feature: 'Storage Organization'
    });
  }
}
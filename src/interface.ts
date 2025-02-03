export interface ChatResponse {
    status: number;
    message: string;
    data: {
      human_message: string;
      ai_message_1: string;
      tool_message: string;
      ai_message_2: string;
    };
  }
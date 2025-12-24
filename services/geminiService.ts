
import { UserProfile, ReadingResult } from "../types";

/**
 * 硅基流动 API 配置
 * 使用 DeepSeek-V3 模型，其在逻辑推理和 JSON 生成方面表现卓越
 */
const API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
const API_KEY = process.env.API_KEY || '';
const DEFAULT_MODEL = 'deepseek-ai/DeepSeek-V3';

export const generateFortune = async (
  profile: UserProfile,
  type: string
): Promise<ReadingResult> => {
  const prompt = `
    你是一位精通中国传统命理（八字、周易、占星）的大师，同时具备深厚的心理学造诣。
    请根据以下用户信息进行专业且详尽的人生分析：
    姓名：${profile.name}
    出生日期：${profile.birthDate}
    出生时间：${profile.birthTime || '未知'}
    性别：${profile.gender === 'male' ? '男 (乾造)' : '女 (坤造)'}
    地点：${profile.location || '未知'}
    分析类型：${type}

    请严格以 JSON 格式返回分析结果，结构如下：
    {
      "title": "充满诗意的分析标题",
      "summary": "核心命格概述 (2-3句话)",
      "aspects": [
        {"label": "事业 (Career)", "content": "详尽分析", "score": 1-100, "icon": "briefcase"},
        {"label": "财运 (Wealth)", "content": "详尽分析", "score": 1-100, "icon": "coins"},
        {"label": "感情 (Love)", "content": "详尽分析", "score": 1-100, "icon": "heart"},
        {"label": "健康 (Health)", "content": "详尽分析", "score": 1-100, "icon": "shield-heart"}
      ],
      "advice": "大师的修身建议或赠言",
      "luckyElements": {
        "color": "开运颜色",
        "number": "幸运数字",
        "direction": "吉利方位"
      }
    }
    分析内容必须使用中文，语气儒雅且富有智慧。
  `;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: "system", content: "你是一个专业的命理分析 API，只输出纯净的 JSON 格式数据。" },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SiliconFlow API Error:", errorText);
      throw new Error(`连接算命服务器失败 (${response.status})`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // 清理可能存在的 Markdown 标签并解析
    const jsonStr = content.replace(/```json\n?/, '').replace(/\n?```/, '').trim();
    return JSON.parse(jsonStr) as ReadingResult;
  } catch (error) {
    console.error("Failed to fetch or parse fortune:", error);
    throw new Error("天机暂时受阻，请检查 API Key 是否有效或稍后再试。");
  }
};

export const chatWithMaster = async (message: string, history: any[]) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { 
            role: "system", 
            content: "你是一位精通易经、八字、占星与心理咨询的命理大师。你的语气儒雅、睿智、平和。你能够通过对话帮助人们找到内心的平静和未来的方向。" 
          },
          ...history.map(h => ({
            role: h.role === 'bot' ? 'assistant' : 'user',
            content: h.text
          })).slice(-6), // 保留最近6轮对话
          { role: "user", content: message }
        ],
        temperature: 0.8
      })
    });

    if (!response.ok) throw new Error("大师正在禅定，请稍候。");

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Chat Error:", error);
    return "星象紊乱，大师暂无法回应。请检查您的硅基流动密钥。";
  }
};

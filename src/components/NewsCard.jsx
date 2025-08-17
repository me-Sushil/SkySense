import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const NewsCard = ({ city }) => {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    setIsLoading(true);
    console.log(city, " city inside async fn");
    const prompt = `
You are a news researcher. Search over the internet, news portals, and articles to find the most recent top 5 news only from ${city} or its country.
Output format:
- Return ONLY valid JSON (no prose).
- An array of exactly 5 objects.
- Each object MUST match this schema:
  {
    "headline": "<max 15 words>",
    "news": "<exactly 100 words news from ${city}, concise summary with who/what/when/where/why/how; include key numbers, names, and outcomes; no opinions>",
    "publisher": "<news outlet name>",
  }
VALIDATION 
- Ensure all fields are filled; do not invent quotes.
- Do not include any text outside the JSON array.
- Stories must be from the ${city} and last 72 hours relative to current time.
- Prefer primary sources; avoid blogs, forums, and AI-generated sites.
- No paywalled teaser pages if a canonical article is available.
- Deduplicate: if multiple outlets cover the same event, pick the most complete/source-most article.
- If fewer than 5 truly recent items exist, include older items but add "(older)" at the end of the headline news from ${city}.`;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      let cleanedResponse = response.text
        .replace(/```json\n?/g, "") // Remove ```json
        .replace(/```\n?/g, "") // Remove ```
        .trim(); // Remove extra whitespace
      console.log(response.text);

      setNews(JSON.parse(cleanedResponse));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (city) {
      fetchNews();
    }
  }, [city]);

  console.log(city, "city for news");

  const handleNewsClick = (Inews) => {
    setSelectedNews(Inews);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedNews(null);
  };

  if (isLoading) {
    return <div>Loading news...</div>;
  }
  return (
    <>
      <div
        style={{
          paddingBottom: "3px",
          borderBottom: "2px solid black",
          display: "inline-block",
          marginBottom: "-9px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Top 5 Recent News from {city}
      </div>
      <div className="news">
        <ul>
          {news.map((Inews, index) => {
            return (
              <li key={index} onClick={() => handleNewsClick(Inews)}>
                {Inews.headline} ...Read More
              </li>
            ); //.headline, Inews.news, Inews.publisher
          })}
        </ul>
      </div>
      {isModalVisible && selectedNews && (
        <Model news={selectedNews} onClose={handleCloseModal} />
      )}
    </>
  );
};
export default NewsCard;

from openai import OpenAI
import environ
import json

env = environ.Env()
environ.Env.read_env()

class OpenAIService:
    def __init__(self):
        self.api_key = env('OPENAI_API_KEY')
        self.client = OpenAI(
            api_key=self.api_key
        ) 
        self.model = "gpt-4o-mini"

    def generate_places_to_visit_suggestions(self, trip_data):
        system_prompt = f"""Based on the following travel data:
                        - country: {trip_data['country']},
                        - city: {trip_data['city']},
                        - preferences: {trip_data['tripPreferences']},
                        - travel date: {trip_data['date']},

                        suggest four places to visit in this city, adhering strictly to the following JSON format:

                        [
                            {{
                                "name": "<place name>",
                                "type": "<place type, e.g., Landmark, Museum, Park, Fountain, Historical Building>",
                                "cost": "<cost, e.g., '15 EUR' or 'Free'>",
                                "duration": "<visit duration, e.g., '1-2 hours'>",
                                "priority": "<priority, e.g., 'must-see' or 'recommended'>",
                                "description": "<short description of the place>",
                                "tips": ["<tip 1>", "<tip 2>", ...]
                            }},
                            ...
                        ]

                        The response must be 100% compliant with the above JSON format. Provide **only** the JSON object, without any introductory text, explanations, or additional comments. Use concise phrases or single keywords instead of full sentences. Do not exceed the specified fields and their formatting.

                        Example response format:
                        [
                            {{
                                "name": "Vatican Museums",
                                "type": "Museum",
                                "cost": "17 EUR",
                                "duration": "2-3 hrs",
                                "priority": "must-see",
                                "description": "Art, history, Sistine Chapel.",
                                "tips": ["Go early", "Expect crowds"]
                            }},
                            ...
                        ]

                        - When selecting places, consider preferences: if preferences are "city," suggest landmarks and historical sites. If "nature," choose parks and natural attractions.
                        - For summer travel dates, include tips addressing heat and tourist crowds. For winter, focus on places suitable for colder weather.
                        """


        
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a tourist assistant."},
                {"role": "user", "content": system_prompt}
            ]
        )
        return response

    @staticmethod
    def format_places_to_visit_suggestions(response):
        try:
            content = response.choices[0].message.content
            suggestions = json.loads(content)
            
            formatted_suggestions = []
            for suggestion in suggestions:
                formatted_suggestions.append({
                    "name": suggestion["name"],
                    "type": suggestion["type"],
                    "cost": suggestion["cost"],
                    "duration": suggestion["duration"],
                    "priority": suggestion["priority"],
                    "description": suggestion["description"],
                    "tips": suggestion["tips"]
                })
            return formatted_suggestions
        except (json.JSONDecodeError, KeyError, AttributeError) as e:
            print(f"Error formatting response: {e}")
            return []
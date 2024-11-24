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
    
    def generate_transportation_suggestions(self, trip_data):
        system_prompt = f"""Based on the following travel data:
            - country: {trip_data['country']},
            - city: {trip_data['city']},
            - travel date: {trip_data['date']},

            suggest four of the best means of transportation in this city (excluding airplanes). Adhere strictly to the following JSON format:

            [
                {{
                    "name": "<transport method name>",
                    "affordability": "<affordability level, e.g., High, Medium, Low>",
                    "approximate_cost": "<cost estimate, e.g., '2-3 EUR/hour', '1.90 EUR', or 'Free'>",
                    "advantages": "<short phrases listing advantages, e.g., 'Flexible, private'>",
                    "disadvantages": "<short phrases listing disadvantages, e.g., 'Traffic, expensive'>",
                    "recommendation": "<short recommendation, e.g., 'For privacy and comfort'>"
                }},
                ...
            ];

            The response must be 100% compliant with the above JSON format. Provide **only** the JSON object, without any introductory text, explanations, or additional comments. Use concise phrases or keywords instead of full sentences.

            Example response format:
            [
                {{
                    "name": "Private Car",
                    "affordability": "Low in cities",
                    "approximate_cost": "2-3 EUR/hour",
                    "advantages": "Flexible, private",
                    "disadvantages": "Traffic, expensive",
                    "recommendation": "For privacy and comfort"
                }},
                {{
                    "name": "Train (RER)",
                    "affordability": "High",
                    "approximate_cost": "1.90 EUR",
                    "advantages": "Fast, frequent",
                    "disadvantages": "Crowded, rush hours",
                    "recommendation": "For medium distances"
                }},
                {{
                    "name": "City Bus",
                    "affordability": "High",
                    "approximate_cost": "1.90 EUR",
                    "advantages": "Wide coverage",
                    "disadvantages": "Slow, crowded",
                    "recommendation": "For short distances"
                }},
                {{
                    "name": "Bikes (Vélib')",
                    "affordability": "Medium",
                    "approximate_cost": "1.70 EUR/30 min",
                    "advantages": "Eco-friendly, fast",
                    "disadvantages": "Weather, theft risk",
                    "recommendation": "For active users"
                }}
            ];

            - Consider the travel date when recommending transportation: if the travel date is in the summer, include tips for avoiding heat and crowded options. If it is in the winter, prioritize comfortable and weather-suitable options.
            - Customize the recommendations based on the city and country to reflect local transportation options and cultural norms.
            """
        
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a tourist assistant."},
                {"role": "user", "content": system_prompt}
            ]
        )
        return response
    
    def generate_packing_suggestions(self, trip_data):
        system_prompt = f"""Based on the following travel data:
            - country: {trip_data['country']},
            - city: {trip_data['city']},
            - travel date: {trip_data['date']},
            - trip duration: {trip_data['tripDuration']},
            - trip preferences: {trip_data['tripPreferences']},
            - Accommodation type: {trip_data['accommodation']}

            Generate a comprehensive packing list tailored to these details, including up to 20 items. Each item must include its name, and indicate whether it is a document or vaccination-related item. The response must strictly adhere to this JSON format:

            [
                {{
                    "name": "<item name>",
                    "is_document": <true/false>,
                    "is_vaccination": <true/false>
                }},
                ...
            ]

            **Rules and Guidelines**:
            1. Suggest items based on the type of trip:
            - If "preferences" is **nature**, prioritize outdoor essentials such as waterproof clothing, hiking gear, and insect repellent.
            - If "preferences" is **city**, focus on casual or formal clothing and electronics for urban activities.
            2. Use general clothing categories (e.g., "long pants," "short-sleeved shirts") instead of specific styles like "jeans."
            3. Adjust the quantity of clothing and essential items based on the **trip duration**:
            - For example, suggest one shirt per day plus one extra, and appropriate amounts of underwear and socks.
            4. Tailor the list to the **accommodation type**:
            - For **tent**, include camping-specific items such as a sleeping bag, portable stove, and flashlight.
            - For **hotel** or **apartment**, emphasize toiletries, electronics, and personal care items.
            5. Include weather-appropriate clothing based on the **travel date**:
            - For summer, recommend lightweight, breathable clothing and sun protection items.
            - For winter, include warm layers, gloves, and thermal wear.
            6. Always include essential travel documents (e.g., passport, ID).
            7. For vaccination-related items, **only include those explicitly required to enter the specified country**. Use the exact name of the vaccination (e.g., "Yellow Fever Vaccination Certificate") based on official entry requirements for that country. If no vaccinations are mandatory for entry, exclude any vaccination-related items.
            8. Limit the response to the JSON object only, with no additional text or explanations.

            Example response:
            [
                {{
                    "name": "Passport",
                    "is_document": true,
                    "is_vaccination": false
                }},
                {{
                    "name": "Travel insurance",
                    "is_document": true,
                    "is_vaccination": false
                }},
                {{
                    "name": "Yellow Fever Vaccination Certificate",
                    "is_document": false,
                    "is_vaccination": true
                }},
                {{
                    "name": "Short-sleeved shirts (6)",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Long pants (2)",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Underwear (7)",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Socks (7)",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Comfortable walking shoes",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Jacket (lightweight)",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Toiletries (toothbrush, toothpaste, shampoo)",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Sunscreen",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Reusable water bottle",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Flashlight",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Sleeping bag",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "First-aid kit",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Power bank",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Guidebook or map",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Swimsuit",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Warm hat and gloves",
                    "is_document": false,
                    "is_vaccination": false
                }},
                {{
                    "name": "Insect repellent",
                    "is_document": false,
                    "is_vaccination": false
                }}
            ]
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
    def format_packing_suggestions(response):
        try:
            content = response.choices[0].message.content
            suggestions = json.loads(content)
            formatted_suggestions = []
            for suggestion in suggestions:
                formatted_suggestions.append({
                    "name": suggestion["name"],
                    "is_document": suggestion["is_document"],
                    "is_vaccination": suggestion["is_vaccination"]
                })
            return formatted_suggestions
        except (json.JSONDecodeError, KeyError, AttributeError) as e:
            print(f"Error formatting response: {e}")
            return []

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
        
    @staticmethod
    def format_transportation_suggestions(response):
        try:
            content = response.choices[0].message.content
            suggestions = json.loads(content)

            formatted_suggestions = []
            for suggestion in suggestions:
                try:
                    formatted_suggestions.append({
                        "name": suggestion["name"],
                        "affordability": suggestion["affordability"],
                        "approximate_cost": suggestion["approximate_cost"],
                        "advantages": suggestion["advantages"],
                        "disadvantages": suggestion["disadvantages"],
                        "recommendation": suggestion["recommendation"],
                    })
                except KeyError as e:
                    print(f"Missing key in suggestion: {e}")
                    continue  
            
            return formatted_suggestions

        except (json.JSONDecodeError, KeyError, AttributeError) as e:
            print(f"Error formatting response: {e}")
            print(f"Response content: {response}")
            return []

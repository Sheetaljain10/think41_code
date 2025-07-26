from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .llm import call_llm
import json
from .db import db  # Your pymongo connection

@csrf_exempt
def chat_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_message = data.get('message')
            conversation_id = data.get('conversation_id')

            # Save user message
            conversation = db.conversations.find_one({"_id": conversation_id}) if conversation_id else None
            if not conversation:
                conversation = {
                    "messages": [],
                }
                conversation_id = db.conversations.insert_one(conversation).inserted_id

            response_text = call_llm(user_message)

            # Append both user and AI message
            db.conversations.update_one(
                {"_id": conversation_id},
                {"$push": {
                    "messages": {
                        "$each": [
                            {"sender": "user", "text": user_message},
                            {"sender": "ai", "text": response_text}
                        ]
                    }
                }}
            )

            return JsonResponse({
                "conversation_id": str(conversation_id),
                "response": response_text
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

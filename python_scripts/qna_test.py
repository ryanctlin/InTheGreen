from __future__ import print_function
import http.client, json, sys

def api_call(question_text):
    host = "https://sustainableqna.azurewebsites.net"
    endpoint_key = "e7f302a7-4d1e-4ec7-af98-8021a9551532"
    route = "/qnamaker/knowledgebases/6dce2bff-95d6-436a-a6e5-6b9fecbdc1a3/generateAnswer"

    # question_text = "terms and conditions"

    question_to_kb = "{'question': '" + question_text + "','top': 1}"

    try:
        headers = {'Authorization': 'EndpointKey ' + endpoint_key,
                   'Content-Type': 'application/json'}
        conn = http.client.HTTPSConnection(host, port=443)
        conn.request("POST", route, question_to_kb, headers)
        response = conn.getresponse()
        kb_reply = response.read()
        kb_reply = json.loads(kb_reply)
        kb_reply = kb_reply['answers'][0]['answer']
        # print(json.dumps(kb_reply, indent=4))
        if kb_reply != 'No good match found in KB.':
            return (kb_reply)
        else:
            return ('No matching section found in agreement. Please try again.')

    except:
        print("Unexpected error:", sys.exc_info()[0])
        print("Unexpected error:", sys.exc_info()[1])

print(api_call("stock"))
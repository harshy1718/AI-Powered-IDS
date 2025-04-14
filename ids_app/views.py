from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .ml_model_utils import predict_intrusion  # your ML logic

def dashboard(request):
    protocol_data = {
        'labels': ['TCP', 'UDP', 'ICMP', 'Others'],
        'values': [45, 30, 15, 10]
    }

    attack_data = {
        'labels': ['DoS', 'Probe', 'R2L', 'U2R', 'Normal'],
        'values': [35, 25, 15, 5, 20]
    }

    attack_count = 100
    model_training_score = 99
    model_testing_score = 98.1

    context = {
        'protocol_data': json.dumps(protocol_data),
        'attack_data': json.dumps(attack_data),
        'attack_count': attack_count,
        'model_training_score': model_training_score,
        'model_testing_score': model_testing_score
    }

    return render(request, 'dashboard.html', context)

def detection(request):
    fields = [
        "Destination Port",
        "Total Fwd Packets",
        "Total Backward Packets",
        "Total Length of Bwd Packets",
        "Fwd Packet Length Mean",
        "Fwd Packet Length Std",
        "Bwd Packet Length Max",
        "Bwd Packet Length Mean",
        "Bwd Packet Length Std",
        "Flow Packets/s",
        "Flow IAT Mean",
        "Flow IAT Std",
        "Flow IAT Max",
        "Flow IAT Min",
        "Fwd IAT Total",
        "Fwd IAT Mean",
        "Fwd IAT Max",
        "Fwd IAT Min",
        "Fwd Header Length",
        "Bwd Header Length",
        "Fwd Packets/s",
        "Min Packet Length",
        "Max Packet Length",
        "Packet Length Mean",
        "Packet Length Std",
        "Packet Length Variance",
        "Average Packet Size",
        "Avg Bwd Segment Size",
        "Fwd Header Length.1",
        "Subflow Bwd Bytes",
        "Init_Win_bytes_forward",
        "Init_Win_bytes_backward",
        "min_seg_size_forward"
    ]
    return render(request, 'detection.html', {'fields': fields})


@csrf_exempt
def detect_attack(request):
    if request.method == 'POST':
        data = request.POST.dict()

        try:
            print("🔍 Received input data:", data)

            prediction = predict_intrusion(data)

            if prediction is None or not isinstance(prediction, str):
                prediction = 'unknown'
            else:
                prediction = prediction.strip().lower()

            print("🧠 Model prediction:", prediction)

            if prediction == 'normal':
                threat_level = 'Low'
            elif prediction in ['attack']:  
                threat_level = 'High'
            else:
                threat_level = 'Unknown'

            return JsonResponse({
                'status': 'success',
                'prediction': prediction,
                'threat': threat_level
            })

        except Exception as e:
            print("❌ Error during detection:", e)
            return JsonResponse({'status': 'error', 'message': str(e)})

    return JsonResponse({'status': 'error', 'message': 'Invalid request'})

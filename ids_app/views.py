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
        'labels': ['DoS', 'DDos', 'Heartbleed', 'Web Attack', 'Bot', 'Normal', 'Brute Force', 'Infiltration', 'Port Scan'],
        'values': [38750, 25603, 2, 429, 391, 424747, 1830, 7, 18164]
    }

    attack_count = 85176
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
        "Destination Port", "Total Fwd Packets", "Total Backward Packets", "Total Length of Bwd Packets",
        "Fwd Packet Length Mean", "Fwd Packet Length Std", "Bwd Packet Length Max", "Bwd Packet Length Mean",
        "Bwd Packet Length Std", "Flow Packets/s", "Flow IAT Mean", "Flow IAT Std", "Flow IAT Max",
        "Flow IAT Min", "Fwd IAT Total", "Fwd IAT Mean", "Fwd IAT Max", "Fwd IAT Min", "Fwd Header Length",
        "Bwd Header Length", "Fwd Packets/s", "Min Packet Length", "Max Packet Length", "Packet Length Mean",
        "Packet Length Std", "Packet Length Variance", "Average Packet Size", "Avg Bwd Segment Size",
        "Fwd Header Length.1", "Subflow Bwd Bytes", "Init_Win_bytes_forward", "Init_Win_bytes_backward",
        "min_seg_size_forward"
    ]
    return render(request, 'detection.html', {'fields': fields})

@csrf_exempt
def detect_attack(request):
    if request.method == 'POST':
        try:
            fields = [
                "destination_port", "total_fwd_packets", "total_backward_packets", "total_length_of_bwd_packets",
                "fwd_packet_length_mean", "fwd_packet_length_std", "bwd_packet_length_max", "bwd_packet_length_mean",
                "bwd_packet_length_std", "flow_packets_s", "flow_iat_mean", "flow_iat_std", "flow_iat_max",
                "flow_iat_min", "fwd_iat_total", "fwd_iat_mean", "fwd_iat_max", "fwd_iat_min", "fwd_header_length",
                "bwd_header_length", "fwd_packets_s", "min_packet_length", "max_packet_length", "packet_length_mean",
                "packet_length_std", "packet_length_variance", "average_packet_size", "avg_bwd_segment_size",
                "fwd_header_length_1", "subflow_bwd_bytes", "init_win_bytes_forward", "init_win_bytes_backward",
                "min_seg_size_forward"
            ]

            values = []
            for field in fields:
                value = request.POST.get(field, '0')
                try:
                    values.append(float(value))
                except ValueError:
                    values.append(0) 

            print("🔍 Received input vector:", values)

            prediction = predict_intrusion(values)

            if prediction is None or not isinstance(prediction, str):
                prediction = 'unknown'
            else:
                prediction = prediction.strip().lower()

            print("🧠 Model prediction:", prediction)

            if prediction == 'normal traffic':
                threat_level = 'Low'
            elif prediction == 'bot attack' or prediction == 'brute force attack' or prediction == 'ddos attack' or prediction == 'dos attack' or prediction == 'heartbleed attack' or prediction == 'infiltration attack' or prediction == 'port scan attack' or prediction == 'web attack':
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

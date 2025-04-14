import joblib
import os
from django.conf import settings

model_path = os.path.join(settings.BASE_DIR, 'ids_app', 'xgboost_model.pkl')
model = joblib.load(model_path)

INPUT_FEATURES = [
    "destination_port",
    "total_fwd_packets",
    "total_backward_packets",
    "total_length_of_bwd_packets",
    "fwd_packet_length_mean",
    "fwd_packet_length_std",
    "bwd_packet_length_max",
    "bwd_packet_length_mean",
    "bwd_packet_length_std",
    "flow_packets_s",
    "flow_iat_mean",
    "flow_iat_std",
    "flow_iat_max",
    "flow_iat_min",
    "fwd_iat_total",
    "fwd_iat_mean",
    "fwd_iat_max",
    "fwd_iat_min",
    "fwd_header_length",
    "bwd_header_length",
    "fwd_packets_s",
    "min_packet_length",
    "max_packet_length",
    "packet_length_mean",
    "packet_length_std",
    "packet_length_variance",
    "average_packet_size"
]

def predict_intrusion(feature_dict):
    features = [float(feature_dict[key]) for key in INPUT_FEATURES]
    result = model.predict([features])
    if result[0] == 1: return "Attack"
    return "Normal"

# AI-Powered Intrusion Detection System (IDS)

## Project Overview
The AI-Powered Intrusion Detection System (IDS) is a security solution designed to monitor network traffic and identify potential threats in real-time. Using advanced machine learning techniques, this system classifies network traffic as either normal or malicious, helping to protect systems against evolving cyber threats.

## Features
- Real-time network traffic analysis
- Classification of traffic as normal or malicious
- High accuracy with minimal false positives
- Scalable and efficient security solution

## Technology Stack
- **Programming Language:** Python
- **Machine Learning Model:** Random Forest Classifier
- **Web Framework:** Flask
- **Database:** PostgreSQL
- **Libraries:** Pandas, NumPy, Scikit-learn
- **Tools:** Jupyter Notebooks, GitHub, Wireshark, Snort

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshy1718/AI-Powered-IDS.git
   cd AI-Powered-IDS
   ```

2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database:**
   ```sql
   CREATE DATABASE ai_ids;
   CREATE USER ids_user WITH PASSWORD 'securepassword';
   GRANT ALL PRIVILEGES ON DATABASE ai_ids TO ids_user;
   ```

5. **Run the Flask app:**
   ```bash
   python app.py
   ```

6. **Access the app:**
   Open your browser and go to `http://127.0.0.1:5000/`

## Usage
- Monitor network traffic for anomalies
- View and analyze classified traffic
- Take proactive security measures based on threat detection

## Future Scope
- Integration of deep learning models for improved accuracy
- Advanced visualization of network traffic data
- Automated incident response mechanisms

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

## License
This project is licensed under the MIT License.


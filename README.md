# Network Intrusion Detection System

A sophisticated web application for detecting network intrusions using machine learning techniques. The system features a modern, dark-themed UI with interactive visualizations and real-time intrusion detection capabilities.

## Features

- Dark-themed UI with animations and high-tech visual effects
- Dashboard showing data insights from the training dataset
- Visualization of protocol types and attack distributions
- Detection form for real-time network traffic analysis
- Interactive charts and counters with animations

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
  - Bootstrap 5 for responsive layout
  - Chart.js for data visualization
  - Anime.js for advanced animations
  - Font Awesome for icons
- **Backend**: Django 4.2.8
- **Machine Learning**: XGBoost Model for Predictions

## Installation

1. Clone the repository
2. Install the required dependencies:
   ```
   pip install django==4.2.8
   ```
3. Run the application:
   ```
   python manage.py runserver
   ```
4. Access the application in your browser at `http://127.0.0.1:8000/`

## Usage

### Dashboard

The dashboard provides insights into the dataset used for training the intrusion detection model, including:
- Protocol type distribution
- Attack type distribution
- Total attacks count
- Model training and testing scores

### Detection

The detection page allows you to input network traffic parameters for analysis. The system will process these inputs and detect potential intrusions.

## Project Structure

```
intrusion_detection_system/
├── ids_app/                  # Main Django app
├── intrusion_detection_system/  # Django project settings
├── static/                   # Static files (CSS, JS)
│   ├── css/
│   ├── js/
│   └── images/
├── templates/                # HTML templates
│   ├── base.html
│   ├── dashboard.html
│   └── detection.html
└── manage.py                 # Django management script
``` 
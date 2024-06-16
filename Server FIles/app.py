from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from measure_distance import average_trilateration, create_distance_coordinates_list
from k_means import prepare_single_measure_data, k_means_algorithm

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow only localhost:3000

raw_measurements = []  # the measurements received with the mac addresses
id_measurements = [] # return the measurements with ids instead of mca adress
measurements_xy_array = []  # the location of each measurement which matches the index in the list
processed_measurement = []  # measurements with the locations of the agent ready for k-means algorithm
data_for_k_means = []
beacon_locations = {}
beacon_colors = {}
map_size = (0, 0)
measurements = []
measurement_counter = 0
beacon_locations = {}
beacons_mac_id_dict = {
    '80:65:99:c8:5c:51': 1,
}

# HTTP route to handle beacons locations and colors
@app.route('/beacons_locations_and_colors', methods=['POST'])
def get_beacons_locations_and_colors():
    try:
        data = request.get_json()
    except Exception as e:
        return jsonify({'error': 'Invalid JSON'}), 400

    if not data:
        return jsonify({'error': 'No data provided'}), 400

    print(data)

    if data != 'test':
        # Extract beacons data
        beacons_data = data.get('beacons_data', [])

        for index, beacon in enumerate(beacons_data, start=1):
            # Ensure the beacon data is correctly formatted
            if isinstance(beacon, dict) and 'x' in beacon and 'y' in beacon and 'color' in beacon:
                beacon_id = f'beacon{index}'
                beacon_colors[beacon_id] = beacon['color']
                beacon_locations[beacon_id] = (beacon['x'], beacon['y'])
        print(beacon_locations)

    # Convert all keys to strings for JSON response
    beacon_locations_str_keys = {str(k): v for k, v in beacon_locations.items()}
    beacon_colors_str_keys = {str(k): v for k, v in beacon_colors.items()}

    # Return the dictionaries as JSON
    return jsonify({
        'locations': beacon_locations_str_keys,
        'colors': beacon_colors_str_keys
    })


# HTTP route to handle map size
@app.route('/map_size', methods=['GET'])
def get_map_size():
    global map_size

    # Get JSON data from the request body
    data = request.get_json()

    # Extract width and length from the JSON data
    width = data.get('width')
    length = data.get('length')

    # Validate that width and length are provided and are integers
    if width is None or length is None:
        return jsonify({'error': 'Width and length are required'}), 400
    if not isinstance(width, int) or not isinstance(length, int):
        return jsonify({'error': 'Width and length must be integers'}), 400

    # Store the map size in a global variable
    map_size = (width, length)

    # Respond with the saved map size
    return jsonify({'map_size': map_size})


# New route to handle the Done function
@app.route('/done', methods=['GET'])
def done():
    # Example optimal_locations array (replace with actual logic to determine optimal locations)
    optimal_locations = [
        {"x": 100, "y": 200},
        {"x": 150, "y": 250},
        {"x": 300, "y": 400}
    ]

    for measurement in raw_measurements:
        id_measurements.append(create_distance_coordinates_list(measurement, beacon_locations))

    for distances_and_points in id_measurements:
        measurements_xy_array.append(average_trilateration(distances_and_points))

    for measurements_xy in measurements_xy_array:
        data_for_k_means.append(
            prepare_single_measure_data(measurements_xy, raw_measurements[measurements_xy_array.index(measurements_xy)],
                                        beacon_locations))

    # Sample data (replace with your own data)
    k_means_algorithm(data_for_k_means)
    # Respond with a success message and the optimal_locations array
    return jsonify({
        'status': 'success',
        'message': 'Received done message',
        'optimal_locations': optimal_locations
    }), 200


@app.route("/store-data", methods=["POST"])
def store_data():
    # Get JSON data from request
    data = request.get_json()

    # Data validation: check if 'data' key is present and is a list
    if 'data' not in data or not isinstance(data['data'], list):
        return jsonify({'error': 'Invalid data format'}), 400

    # Process each entry in the 'data' list
    new_measurements = []
    for item in data['data']:
        # Retrieve the beacon ID using the MAC address from the dictionary
        beacon_id = beacons_mac_id_dict.get(item.get('mac'))
        if beacon_id is not None:  # Only process if the MAC address is known
            new_measurements.append([beacon_id, item.get('dist_est', 0), item.get('rssi', -100)])

    # Sort the new measurements by beacon ID
    new_measurements.sort(key=lambda x: x[0])

    # Store the processed measurement
    raw_measurements.append(new_measurements)
    print(raw_measurements)
    return jsonify({'message': 'Measurement received'})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)  # Change port as needed

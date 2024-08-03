from flask import Flask, request, jsonify
from flask_cors import CORS

from k_means import k_means_algorithm
from measure_distance import average_trilateration, create_distance_coordinates_list

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow only localhost:3000

raw_measurements = \
    [[[1, 43.8, -75], [2, 27.15, -67], [4, 35.25, -63]], [[1, 51.45, -71], [2, 26.85, -55], [3, 5.7, -61], [4, 30.75, -69]], [[1, 47.1, -69], [2, 25.65, -57], [3, 9.3, -59], [4, 23.1, -64]], [[1, 35.85, -72], [2, 22.95, -56], [3, 11.55, -64], [4, 21.15, -61]], [[1, 35.25, -69], [2, 24.15, -51], [3, 17.1, -73], [4, 32.4, -77]], [[1, 36.75, -63], [2, 11.1, -54], [3, 21.3, -68], [4, 24.0, -66]], [[1, 30.6, -72], [2, 10.8, -51], [3, 25.2, -68], [4, 13.5, -63]], [[1, 42.0, -64], [2, 22.95, -60], [3, 22.5, -66], [4, 12.6, -57]], [[1, 47.25, -71], [2, 16.95, -64], [3, 12.15, -66], [4, 12.75, -54]], [[1, 40.95, -73], [3, 19.5, -76], [4, 15.0, -50]], [[1, 31.95, -79], [2, 27.3, -62], [3, 24.6, -71], [4, 9.9, -49]], [[2, 26.1, -59], [3, 20.55, -73], [4, 15.0, -56]], [[2, 27.6, -73], [3, 13.65, -82], [4, 12.75, -57]], [[1, 41.55, -73], [3, 11.85, -68], [4, 15.6, -57]], [[2, 22.5, -60], [3, 9.75, -59], [4, 14.85, -58]], [[2, 22.65, -61], [3, 13.8, -65], [4, 17.85, -58]], [[1, 45.75, -75], [2, 11.4, -54], [3, 25.8, -70], [4, 12.75, -53]], [[1, 42.6, -75], [2, 15.3, -61], [3, 19.5, -72], [4, 11.25, -57]], [[1, 35.85, -76], [2, 25.8, -66], [3, 15.45, -74], [4, 16.5, -59]], [[1, 28.5, -71], [2, 20.1, -64], [3, 19.95, -69], [4, 10.2, -53]], [[1, 33.3, -73], [2, 24.3, -63], [4, 8.85, -52]], [[4, 12.3, -47]], [[1, 43.8, -86], [2, 29.7, -70], [3, 24.9, -77], [4, 8.7, -43]], [[2, 21.6, -64], [3, 24.75, -73], [4, 7.2, -46]], [[1, 29.4, -69], [2, 7.5, -46], [3, 31.5, -75], [4, 23.4, -61]], [[1, 42.45, -70], [2, 11.4, -49], [4, 23.85, -63]], [[1, 27.0, -65], [2, 12.0, -48], [3, 29.25, -73], [4, 15.6, -58]], [[1, 30.75, -68], [2, 21.3, -52], [3, 45.9, -78], [4, 19.65, -71]], [[1, 36.3, -64], [2, 25.8, -64], [3, 47.85, -80], [4, 18.45, -64]], [[1, 27.0, -64], [2, 22.5, -61], [3, 47.25, -83], [4, 16.5, -65]], [[1, 28.5, -64], [2, 35.85, -74], [3, 46.8, -82], [4, 28.2, -71]], [[1, 22.2, -55], [2, 25.8, -58], [3, 47.25, -78], [4, 26.55, -72]], [[1, 19.5, -65], [2, 35.25, -66], [3, 49.5, -76], [4, 35.55, -72]], [[1, 13.8, -71], [2, 33.45, -68], [3, 44.25, -80], [4, 34.65, -71]], [[1, 18.15, -56], [2, 25.65, -61], [3, 44.55, -84], [4, 44.25, -75]], [[1, 24.15, -61], [2, 25.5, -63], [3, 37.5, -82], [4, 26.7, -76]], [[1, 20.7, -71], [2, 32.1, -77], [3, 29.7, -87], [4, 24.15, -80]], [[1, 32.85, -77], [2, 23.1, -73], [3, 25.5, -78], [4, 20.25, -69]], [[1, 28.5, -73], [2, 11.85, -62], [3, 25.8, -76], [4, 17.7, -65]], [[1, 36.15, -80], [2, 15.15, -60], [3, 30.75, -85], [4, 19.5, -70]], [[1, 34.95, -80], [2, 4.65, -60], [3, 25.95, -81], [4, 19.65, -80]], [[1, 36.9, -77], [2, 2.55, -51], [3, 28.5, -79], [4, 16.8, -71]], [[1, 35.55, -75], [2, 7.5, -58], [3, 17.4, -87], [4, 20.85, -69]], [[2, 14.7, -64], [3, 22.95, -71], [4, 26.7, -77]], [[1, 34.2, -80], [2, 17.85, -64], [3, 11.7, -71], [4, 22.95, -80]], [[1, 43.35, -85], [2, 16.5, -62], [3, 17.25, -77], [4, 27.3, -75]], [[1, 40.2, -81], [2, 25.5, -65], [3, 12.0, -67], [4, 31.35, -82]], [[1, 46.5, -85], [2, 26.55, -71], [3, 17.1, -68], [4, 34.5, -83]], [[1, 35.25, -81], [2, 29.7, -78], [3, 22.35, -82], [4, 24.15, -82]], [[1, 33.6, -75], [2, 25.65, -67], [4, 39.15, -76]], [[1, 33.15, -79], [2, 15.3, -67], [3, 33.3, -80], [4, 29.55, -75]], [[1, 33.3, -76], [2, 19.2, -60], [3, 22.95, -78], [4, 25.5, -75]], [[1, 41.4, -77], [2, 8.85, -59], [4, 25.5, -69]], [[1, 34.5, -79], [2, 7.95, -60], [3, 35.7, -90], [4, 29.85, -76]], [[1, 31.5, -75], [2, 2.85, -55], [3, 36.45, -85], [4, 28.8, -75]], [[1, 19.35, -79], [2, 6.15, -59], [3, 37.35, -90], [4, 28.2, -85]], [[1, 19.2, -68], [2, 15.75, -65], [4, 30.6, -78]], [[1, 18.75, -74], [2, 13.2, -62], [3, 35.7, -94]], [[1, 26.55, -68], [2, 17.55, -62], [3, 33.9, -86], [4, 36.9, -69]], [[1, 18.3, -62], [2, 17.1, -68], [3, 38.85, -86], [4, 33.6, -74]], [[1, 22.8, -72], [2, 25.5, -62], [3, 35.85, -89], [4, 31.8, -73]], [[1, 15.3, -64]], [[1, 10.65, -54], [2, 26.7, -77], [3, 36.6, -88], [4, 36.9, -76]], [[1, 28.5, -73], [2, 34.5, -70], [3, 40.65, -81], [4, 40.2, -87]], [[1, 34.35, -77], [2, 30.3, -69], [3, 22.5, -70], [4, 1.5, -26]]]
# the measurements received with the mac addresses
measurements_xy_array = []  # the location of each measurement which matches the index in the list
processed_measurement = []  # measurements with the locations of the agent ready for k-means algorithm
measurements_distance_array = []
data_for_k_means = []
beacon_colors = {}
map_size = (0, 0)
measurements = []
id_measurements = []
measurement_counter = 0
beacon_locations = {
    1: (7, 1),
    2: (11, 13),
    3: (19, 23),
    4: (11, 21)
}
beacons_mac_id_dict = {
    '80:65:99:c7:9d:e5': 1,
    '80:65:99:c8:5c:51': 2,
    '80:65:99:c8:5c:a9': 3,
    '80:65:99:c7:a9:99': 4,

}
optimal_locations = []
optimal_locations_to_send = [{'x': 11, 'y': 13}]

@app.route('/home')
def home():
    return 'Hello, World!'

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
    def prepare_single_measure_data(coordinates, measure_data, coordinates_dic):
        x, y = coordinates

        # Extract beacon IDs from the measurement data
        current_beacons = {data[0] for data in measure_data}

        # Ensure all beacons are included, add missing ones with RSSI -100
        for beacon_id in coordinates_dic:
            if beacon_id not in current_beacons:
                # Insert missing beacon data with a default RSSI of -100
                measure_data.append([beacon_id, 0, -100])  # Distance set to 0 as placeholder

        # Sort measure_data by beacon ID
        measure_data_sorted = sorted(measure_data, key=lambda b: b[0])

        # Return the prepared data including coordinates and sorted RSSI values
        return [x, y] + [item[2] for item in measure_data_sorted]

    global id_measurements, measurements_xy_array, data_for_k_means, raw_measurements, processed_measurement, measurements_distance_array

    try:
        for measurement in raw_measurements:
            id_measurements.append(create_distance_coordinates_list(measurement, beacon_locations))

        for distances_and_points in id_measurements:
            if len(distances_and_points) >= 3:
                measurements_xy_array.append(average_trilateration(distances_and_points))
            else:
                measurements_xy_array.append(distances_and_points[0][1])

        print("The point you're standing at:", measurements_xy_array)

        # preparing data for K-means
        for measurements_xy in measurements_xy_array:
            data_for_k_means.append(prepare_single_measure_data(measurements_xy,
                                                                raw_measurements[
                                                                    measurements_xy_array.index(measurements_xy)],
                                                                beacon_locations))

        # Sample data (replace with your own data)
        from k_means import prepare_single_measure_data
        optimal_locations = k_means_algorithm(data_for_k_means)

        # Resetting the lists to empty
        id_measurements = []
        measurements_xy_array = []
        data_for_k_means = []
        # raw_measurements = [] remember to uncomment this before uploading to cloud!!
        processed_measurement = []
        measurements_distance_array = []

        # Respond with a success message and the optimal_locations array
        return jsonify({
            'status': 'success',
            'message': 'Received done message',
            'optimal_locations': optimal_locations
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500


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
    app.run(host="0.0.0.0", port=8000)  # Change port as needed

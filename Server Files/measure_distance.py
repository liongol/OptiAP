import math
import itertools

# points must not be collinear!

# this function prepares the data needed for the average_"trilateration" function


def create_distance_coordinates_list(measure_data, coordinates_dict):
    distance_coordinates_list = []
    for key, coordinates in coordinates_dict.items():
        for measure in measure_data:
            if measure[0] == key:
                distance_coordinates_list.append([measure[1], coordinates])
                break
    return distance_coordinates_list


# this function calculates a single
# (x,y) coordinates given 3 points and distances


def calculate_distance(distances_and_points):
    if len(distances_and_points) < 3:
        raise ValueError("At least three distances and points are required for trilateration.")

    # Extract distances and points
    distances = [distance for distance, _ in distances_and_points]
    points = [point for _, point in distances_and_points]

    # Calculate differences between the coordinates
    diff_x1 = points[1][0] - points[0][0]
    diff_y1 = points[1][1] - points[0][1]
    diff_x2 = points[2][0] - points[0][0]
    diff_y2 = points[2][1] - points[0][1]

    # Calculate squared distances between the points
    dist_sq1 = math.pow(distances[0], 2) - math.pow(distances[1], 2) + math.pow(points[1][0], 2) + math.pow(
        points[1][1], 2) - math.pow(points[0][0], 2) - math.pow(points[0][1], 2)
    dist_sq2 = math.pow(distances[0], 2) - math.pow(distances[2], 2) + math.pow(points[2][0], 2) + math.pow(
        points[2][1], 2) - math.pow(points[0][0], 2) - math.pow(points[0][1], 2)

    # Calculate the coordinates if denominator is not zero
    denominator = 2 * (diff_x1 * diff_y2 - diff_x2 * diff_y1)
    if denominator != 0 and diff_y2 != 0:
        x = (dist_sq1 * diff_y2 - dist_sq2 * diff_y1) / denominator
        y = (dist_sq2 - 2 * x * diff_x2) / (2 * diff_y2)
        return x, y
    else:
        return None  # Trilateration cannot be performed with collinear points


# this function gets a list of distance and corresponds coordinates
# and returns the location of the beacon during the test
def average_trilateration(distances_and_points_list):
    if len(distances_and_points_list) < 3:
        raise ValueError("At least three sets of distances and points are required.")

    # Initialize lists to store calculated coordinates
    coordinates = []

    # Iterate over all combinations of three points
    for points_combination in itertools.combinations(distances_and_points_list, 3):
        # Calculate coordinates using trilateration for the current combination
        result = calculate_distance(points_combination)
        if result is not None:
            coordinates.append(result)

    # Calculate the average coordinates
    if coordinates:
        average_x = sum(x for x, _ in coordinates) / len(coordinates)
        average_y = sum(y for _, y in coordinates) / len(coordinates)
        return average_x, average_y
    else:
        return None  # Return None if no valid coordinates were calculated
